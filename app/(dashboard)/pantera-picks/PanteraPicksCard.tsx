"use client";

import { useEffect, useState } from "react";
import { PanteraPicksTable, type PanteraPick } from "../components/PanteraPicksTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PanteraPicksCard() {
  const [picks, setPicks] = useState<PanteraPick[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPicks = async () => {
      try {
        const response = await fetch('/api/pantera-picks');
        if (!response.ok) throw new Error('Failed to fetch picks');
        const data = await response.json();
        setPicks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPicks();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center p-8 text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Pantera Picks</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <List> */}
          Three Potential Strategies
  
          {/* </List> */}
          <PanteraPicksTable data={picks} />
        </CardContent>
      </Card>
    </div>
  );
} 