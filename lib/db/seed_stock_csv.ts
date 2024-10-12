import { stripe } from '../payments/stripe';
import { db } from './drizzle';
import { users, teams, teamMembers, stocks_analysis } from './schema';
import { hashPassword } from '@/lib/auth/session';
import fs from 'fs';
import csv from 'csv-parser';
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


  async function seed() {  
    await seedStocksAnalysis();
  }
  
  seed()
    .catch((error) => {
      console.error('Seed process failed:', error);
      process.exit(1);
    })
    .finally(() => {
      console.log('Seed process finished. Exiting...');
      process.exit(0);
    });
