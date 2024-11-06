import { stripe } from '../payments/stripe';
import { db } from './drizzle';
import { users, teams, teamMembers, stocks_analysis, topPerforming, panteraPicks } from './schema';
import { hashPassword } from '@/lib/auth/session';
import fs from 'fs';
import csv from 'csv-parser';
import { object } from 'zod';

async function seedStocksAnalysis() {
  console.log('Seeding stocks analysis data...');
  
  const results: any[] = [];
  
  // Read the CSV file
  await new Promise((resolve, reject) => {
    fs.createReadStream('processed_stocks_analysis.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', resolve)
      .on('error', reject);
  });
  
  // Insert data into the database
  for (const row of results) {
    await db.insert(stocks_analysis).values({
      sector: row.sector,
      analyst: row.analyst,
      coverage_date: row.coverage_date,
      rating: row.rating,
      analysis: row.analysis
    });
  }
  
  console.log('Stocks analysis data seeded successfully.');
}

async function seedTopPerformingAnalysts() {
  console.log('Seeding top-performing analysts data...');

  const results: any[] = [];

  // Read the CSV file
  await new Promise((resolve, reject) => {
    fs.createReadStream('datatable.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', resolve)
      .on('error', reject);
  });

  // Insert data into the database
  for (const row of results) {
    await db.insert(topPerforming).values({
      rank: row.Rank,
      analyst: row.Analyst,
      analystImg: row.AnalystImg,
      successRate: row.Success_Rate,
      averageReturn: row.Average_Return,
      numberOfRatings: row.number_of_Ratings,
      latestCoverageStock: row.Latest_Coverage_stock,
      latestCoverageArticle: row.Latest_Coverage_article,
      coverageDate: row.Coverage_Date,
      latestRating: row.Latest_Rating,
    });
  }

  console.log('Top-performing analysts data seeded successfully.');
}

async function seedPanteraPicks() {
  console.log('Seeding Pantera Picks data...');
  
  const results: any[] = [];
  
  // Read the CSV file
  await new Promise((resolve, reject) => {
    fs.createReadStream('Pantera Picks performance.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', resolve)
      .on('error', reject);
  });

  // Insert data into the database
  for (const [index, row] of results.entries()) {
    try {
      const pickData: any = {
        company: row[Object.keys(row)[0]],
        companyLogoUrl: row['company_logo_url'],
        symbol: row['symbol'],
        symbolHref: row['symbol_href'],
        pickedDate: row.picked_date, // Convert string to Date
        purchasePrice: parseFloat(row.purchase_price),
        closedDate: row.closed_date ? row.closed_date : '-',
        sellPrice: row.sell_price ? parseFloat(row.sell_price) : '-',
        returnPercentage: parseFloat(row.return_percentage),
        spyPercentage: parseFloat(row.spy_percentage),
        differencePercentage: parseFloat(row.difference_percentage),
      };

      await db.insert(panteraPicks).values(pickData);
      console.log(index, {[pickData.company]: pickData});
    } catch (error) {
      console.log(index);
      console.error(`Error inserting ${row.Symbol}:`, error);
    }
  }
  
  console.log('Pantera Picks data seeded successfully.');
}

async function seed() {  
  // await seedStocksAnalysis();
  // await seedTopPerformingAnalysts();
  await seedPanteraPicks();
}

seed()
  .catch((error) => {
    // console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
