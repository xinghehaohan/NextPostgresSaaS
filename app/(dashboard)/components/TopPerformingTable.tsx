'use client';

import { useEffect, useState } from 'react';
import { TopPerforming } from '@/lib/db/schema';
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopPerformingTable() {
  const [analysts, setAnalysts] = useState<TopPerforming[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopPerforming() {
      try {
        const response = await fetch('/api/top-performing');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAnalysts(data);
      } catch (err) {
        setError('An error occurred while fetching data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTopPerforming();
  }, []);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  const getRatingBadge = (rating: string | null) => {
    switch (rating) {
      case 'STRONG SELL':
        return <Badge variant="destructive">Strong Sell</Badge>;
      case 'SELL':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Sell</Badge>;
      case 'HOLD':
        return <Badge variant="secondary">Hold</Badge>;
      case 'BUY':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Buy</Badge>;
      case 'STRONG BUY':
        return <Badge variant="default" className="bg-green-500">Strong Buy</Badge>;
      default:
        return <Badge variant="outline">{rating}</Badge>;
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Analysts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Analyst</TableHead>
              <TableHead>Success Rate</TableHead>
              <TableHead>Average Return</TableHead>
              <TableHead>Number of Ratings</TableHead>
              <TableHead>Latest Coverage</TableHead>
              <TableHead>Latest Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analysts.map((analyst) => (
              <TableRow key={analyst.id}>
                <TableCell>{analyst.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {analyst.analystImg && (
                      <img className="h-10 w-10 rounded-full mr-3" src={analyst.analystImg} alt={analyst.analyst} />
                    )}
                    <span>{analyst.analyst}</span>
                  </div>
                </TableCell>
                <TableCell>{analyst.successRate}</TableCell>
                <TableCell>{analyst.averageReturn}</TableCell>
                <TableCell>{analyst.numberOfRatings}</TableCell>
                <TableCell>
                  <div>{analyst.latestCoverageStock}</div>
                  <div className="text-sm text-muted-foreground">{analyst.coverageDate}</div>
                </TableCell>
                <TableCell>{getRatingBadge(analyst.latestRating)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
