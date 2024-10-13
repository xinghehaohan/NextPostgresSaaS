'use client';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function StockAnalysisManager() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    sector: '',
    analyst: '',
    rating: '',
  });
  const [sortBy, setSortBy] = useState('coverage_date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAnalyses();
  }, [filters, sortBy, sortOrder, page]);

  async function fetchAnalyses() {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        ...filters,
        sortBy,
        sortOrder,
        page: page.toString(),
        limit: '20',
      });
      const response = await fetch(`/api/stock-analysis?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch analyses');
      const data = await response.json();
      setAnalyses(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleFilterChange(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
    setPage(1);
  }

  async function handleCreate(newAnalysis) {
    try {
      const response = await fetch('/api/stock-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnalysis),
      });
      if (!response.ok) throw new Error('Failed to create analysis');
      fetchAnalyses();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate(id, updatedData) {
    try {
      const response = await fetch(`/api/stock-analysis/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update analysis');
      fetchAnalyses();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`/api/stock-analysis/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete analysis');
      fetchAnalyses();
    } catch (err) {
      setError(err.message);
    }
  }

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'Strong Sell':
        return <Badge variant="destructive">Strong Sell</Badge>;
      case 'Sell':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Sell</Badge>;
      case 'Hold':
        return <Badge variant="secondary">Hold</Badge>;
      case 'Buy':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Buy</Badge>;
      case 'Strong Buy':
        return <Badge variant="default" className="bg-green-500">Strong Buy</Badge>;
      default:
        return <Badge variant="outline">{rating}</Badge>;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-3">
      <div className="flex space-x-3">
        <Select onValueChange={(value) => handleFilterChange('sector', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Sector" />
          </SelectTrigger>
          <SelectContent>
            {/* Add sector options */}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('analyst', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Analyst" />
          </SelectTrigger>
          <SelectContent>
            {/* Add analyst options */}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('rating', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Strong Buy">Strong Buy</SelectItem>
            <SelectItem value="Buy">Buy</SelectItem>
            <SelectItem value="Hold">Hold</SelectItem>
            <SelectItem value="Sell">Sell</SelectItem>
            <SelectItem value="Strong Sell">Strong Sell</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('symbol')}>
              Stock {sortBy === 'symbol' && (sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />)}
            </TableHead>
            <TableHead onClick={() => handleSort('sector')}>
              Sector {sortBy === 'sector' && (sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />)}
            </TableHead>
            <TableHead onClick={() => handleSort('analyst')}>
              Analyst {sortBy === 'analyst' && (sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />)}
            </TableHead>
            <TableHead onClick={() => handleSort('coverage_date')}>
              Coverage Date {sortBy === 'coverage_date' && (sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />)}
            </TableHead>
            <TableHead onClick={() => handleSort('rating')}>
              Rating {sortBy === 'rating' && (sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />)}
            </TableHead>
            <TableHead>
              Analysis 
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {analyses.map(analysis => (
            <TableRow key={analysis.id}>
              <TableCell>   
                {analysis.analysis.split(':')[0]}
              </TableCell>
              <TableCell>{analysis.sector}</TableCell>
              <TableCell>{analysis.analyst}</TableCell>
              <TableCell>{analysis.coverage_date}</TableCell>
              <TableCell>{getRatingBadge(analysis.rating)}</TableCell>
              <TableCell>   
                {analysis.analysis}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between">
        <Button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span>Page {page} of {totalPages}</span>
        <Button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default StockAnalysisManager;
