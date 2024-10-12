import csv
from datetime import datetime

def examine_csv_structure(file_path):
    with open(file_path, 'r', newline='', encoding='utf-8-sig') as file:
        reader = csv.reader(file)
        headers = next(reader)
        first_row = next(reader)
        print("CSV Headers:", headers)
        print("First row data:", first_row)
        return headers

def process_csv(input_file, output_file):
    headers = examine_csv_structure(input_file)
    
    with open(input_file, 'r', newline='', encoding='utf-8-sig') as infile, \
         open(output_file, 'w', newline='', encoding='utf-8') as outfile:
        
        reader = csv.DictReader(infile)
        writer = csv.writer(outfile)
        
        # Write the header for the output file
        writer.writerow(['symbol', 'sector', 'analyst', 'coverage_date', 'rating', 'analysis'])
        
        for row in reader:
            symbol = ''  # Symbol is not provided in the CSV
            sector = row.get('Symbol', '')  # 'Symbol' column contains sector information
            analyst = row.get('Sector', '')  # 'Sector' column contains analyst information
            
            coverage_date_str = row.get('Analyst', '')  # 'Analyst' column contains coverage date
            if coverage_date_str:
                try:
                    coverage_date = datetime.strptime(coverage_date_str, '%m/%d/%Y').strftime('%Y-%m-%d')
                except ValueError:
                    coverage_date = ''
            else:
                coverage_date = ''
            
            rating = row.get('Coverage_Date', '')  # 'Coverage_Date' column contains rating
            analysis = row.get('Rating', '')  # 'Rating' column contains analysis
            
            writer.writerow([symbol, sector, analyst, coverage_date, rating, analysis])

        print(f"Processed {reader.line_num - 1} rows.")  # -1 to account for header

# Usage
input_file = 'lib/db/data_seekingalpha_com_20241012172954.csv'
output_file = 'processed_stocks_analysis.csv'
process_csv(input_file, output_file)
