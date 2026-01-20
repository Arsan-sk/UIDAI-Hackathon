"""
UIDAI Data Preprocessing Script
Processes biometric, demographic, and enrolment CSV data for dashboard consumption
"""

import pandas as pd
import numpy as np
import json
import os
from pathlib import Path
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

class UidaiDataProcessor:
    def __init__(self, base_path):
        self.base_path = Path(base_path)
        self.processed_data = {}
        
    def load_biometric_data(self):
        """Load and merge all biometric authentication CSV files"""
        print("Loading biometric authentication data...")
        bio_files = [
            'api_data_aadhar_biometric/api_data_aadhar_biometric/api_data_aadhar_biometric_0_500000.csv',
            'api_data_aadhar_biometric/api_data_aadhar_biometric/api_data_aadhar_biometric_500000_1000000.csv',
            'api_data_aadhar_biometric/api_data_aadhar_biometric/api_data_aadhar_biometric_1000000_1500000.csv',
            'api_data_aadhar_biometric/api_data_aadhar_biometric/api_data_aadhar_biometric_1500000_1861108.csv'
        ]
        
        dfs = []
        for file in bio_files:
            filepath = self.base_path / file
            if filepath.exists():
                df = pd.read_csv(filepath)
                dfs.append(df)
                print(f"  Loaded {file.split('/')[-1]}: {len(df)} records")
        
        biometric_df = pd.concat(dfs, ignore_index=True)
        print(f"Total biometric records: {len(biometric_df)}")
        return biometric_df
    
    def load_demographic_data(self):
        """Load and merge all demographic authentication CSV files"""
        print("\nLoading demographic authentication data...")
        demo_files = [
            'api_data_aadhar_demographic/api_data_aadhar_demographic/api_data_aadhar_demographic_0_500000.csv',
            'api_data_aadhar_demographic/api_data_aadhar_demographic/api_data_aadhar_demographic_500000_1000000.csv',
            'api_data_aadhar_demographic/api_data_aadhar_demographic/api_data_aadhar_demographic_1000000_1500000.csv',
            'api_data_aadhar_demographic/api_data_aadhar_demographic/api_data_aadhar_demographic_1500000_2000000.csv',
            'api_data_aadhar_demographic/api_data_aadhar_demographic/api_data_aadhar_demographic_2000000_2071700.csv'
        ]
        
        dfs = []
        for file in demo_files:
            filepath = self.base_path / file
            if filepath.exists():
                df = pd.read_csv(filepath)
                dfs.append(df)
                print(f"  Loaded {file.split('/')[-1]}: {len(df)} records")
        
        demographic_df = pd.concat(dfs, ignore_index=True)
        print(f"Total demographic records: {len(demographic_df)}")
        return demographic_df
    
    def load_enrolment_data(self):
        """Load and merge all enrolment CSV files"""
        print("\nLoading enrolment data...")
        enrol_files = [
            'api_data_aadhar_enrolment/api_data_aadhar_enrolment/api_data_aadhar_enrolment_0_500000.csv',
            'api_data_aadhar_enrolment/api_data_aadhar_enrolment/api_data_aadhar_enrolment_500000_1000000.csv',
            'api_data_aadhar_enrolment/api_data_aadhar_enrolment/api_data_aadhar_enrolment_1000000_1006029.csv'
        ]
        
        dfs = []
        for file in enrol_files:
            filepath = self.base_path / file
            if filepath.exists():
                df = pd.read_csv(filepath)
                dfs.append(df)
                print(f"  Loaded {file.split('/')[-1]}: {len(df)} records")
        
        enrolment_df = pd.concat(dfs, ignore_index=True)
        print(f"Total enrolment records: {len(enrolment_df)}")
        return enrolment_df
    
    def clean_data(self, df, dataset_type):
        """Clean and validate data"""
        print(f"\nCleaning {dataset_type} data...")
        
        # Convert date column to datetime
        df['date'] = pd.to_datetime(df['date'], format='%d-%m-%Y', errors='coerce')
        
        # Remove rows with invalid dates
        before_count = len(df)
        df = df.dropna(subset=['date'])
        print(f"  Removed {before_count - len(df)} rows with invalid dates")
        
        # Validate pincode (should be 6 digits)
        df['pincode'] = df['pincode'].astype(str).str.zfill(6)
        
        # Fill missing values in count columns with 0
        count_columns = [col for col in df.columns if 'age' in col.lower() or 'bio' in col.lower() or 'demo' in col.lower()]
        df[count_columns] = df[count_columns].fillna(0).astype(int)
        
        # Remove duplicates
        before_count = len(df)
        df = df.drop_duplicates()
        print(f"  Removed {before_count - len(df)} duplicate rows")
        
        # Add derived columns
        df['month'] = df['date'].dt.to_period('M').astype(str)
        df['year'] = df['date'].dt.year
        df['day_of_week'] = df['date'].dt.day_name()
        
        print(f"  Final cleaned records: {len(df)}")
        return df
    
    def generate_summary_stats(self, df, dataset_type):
        """Generate summary statistics for dashboard"""
        print(f"\nGenerating summary statistics for {dataset_type}...")
        
        stats = {
            'total_records': int(len(df)),
            'date_range': {
                'start': df['date'].min().strftime('%Y-%m-%d'),
                'end': df['date'].max().strftime('%Y-%m-%d')
            },
            'unique_states': int(df['state'].nunique()),
            'unique_districts': int(df['district'].nunique()),
            'unique_pincodes': int(df['pincode'].nunique())
        }
        
        # Count columns summary
        count_cols = [col for col in df.columns if 'age' in col.lower() or 'bio' in col.lower() or 'demo' in col.lower()]
        if count_cols:
            stats['total_transactions'] = int(df[count_cols].sum().sum())
            stats['column_stats'] = {}
            for col in count_cols:
                stats['column_stats'][col] = {
                    'sum': int(df[col].sum()),
                    'mean': float(df[col].mean()),
                    'median': float(df[col].median()),
                    'std': float(df[col].std()),
                    'min': int(df[col].min()),
                    'max': int(df[col].max())
                }
        
        return stats
    
    def aggregate_by_state(self, df, dataset_type):
        """Aggregate data by state for map visualization"""
        print(f"Aggregating {dataset_type} by state...")
        
        count_cols = [col for col in df.columns if 'age' in col.lower() or 'bio' in col.lower() or 'demo' in col.lower()]
        
        state_agg = df.groupby('state')[count_cols].sum().reset_index()
        state_agg['total'] = state_agg[count_cols].sum(axis=1)
        
        return state_agg.to_dict('records')
    
    def aggregate_by_district(self, df, dataset_type):
        """Aggregate data by district"""
        print(f"Aggregating {dataset_type} by district...")
        
        count_cols = [col for col in df.columns if 'age' in col.lower() or 'bio' in col.lower() or 'demo' in col.lower()]
        
        district_agg = df.groupby(['state', 'district'])[count_cols].sum().reset_index()
        district_agg['total'] = district_agg[count_cols].sum(axis=1)
        
        return district_agg.to_dict('records')
    
    def aggregate_by_time(self, df, dataset_type):
        """Aggregate data by time periods"""
        print(f"Aggregating {dataset_type} by time...")
        
        count_cols = [col for col in df.columns if 'age' in col.lower() or 'bio' in col.lower() or 'demo' in col.lower()]
        
        # Daily aggregation
        daily_agg = df.groupby('date')[count_cols].sum().reset_index()
        daily_agg['date'] = daily_agg['date'].dt.strftime('%Y-%m-%d')
        daily_agg['total'] = daily_agg[count_cols].sum(axis=1)
        
        # Monthly aggregation
        monthly_agg = df.groupby('month')[count_cols].sum().reset_index()
        monthly_agg['total'] = monthly_agg[count_cols].sum(axis=1)
        
        return {
            'daily': daily_agg.to_dict('records'),
            'monthly': monthly_agg.to_dict('records')
        }
    
    def detect_anomalies(self, df, dataset_type):
        """Detect anomalies in the data"""
        print(f"Detecting anomalies in {dataset_type}...")
        
        count_cols = [col for col in df.columns if 'age' in col.lower() or 'bio' in col.lower() or 'demo' in col.lower()]
        
        anomalies = []
        
        # State-level anomaly detection
        for state in df['state'].unique():
            state_data = df[df['state'] == state]
            for col in count_cols:
                mean_val = state_data[col].mean()
                std_val = state_data[col].std()
                
                # Find values beyond 3 standard deviations
                threshold = mean_val + (3 * std_val)
                anomalous_records = state_data[state_data[col] > threshold]
                
                if len(anomalous_records) > 0:
                    for _, row in anomalous_records.head(5).iterrows():  # Limit to top 5 anomalies per state/column
                        anomalies.append({
                            'state': state,
                            'district': row['district'],
                            'date': row['date'].strftime('%Y-%m-%d'),
                            'metric': col,
                            'value': int(row[col]),
                            'expected_max': float(threshold),
                            'severity': 'high' if row[col] > threshold * 1.5 else 'medium'
                        })
        
        print(f"  Found {len(anomalies)} anomalies")
        return anomalies[:100]  # Limit to top 100 anomalies
    
    def calculate_correlations(self, bio_df, demo_df, enrol_df):
        """Calculate correlations between datasets"""
        print("\nCalculating cross-dataset correlations...")
        
        # Merge datasets on common keys
        merged = bio_df.merge(
            demo_df[['date', 'state', 'district', 'demo_age_5_17', 'demo_age_17_']], 
            on=['date', 'state', 'district'], 
            how='inner',
            suffixes=('_bio', '_demo')
        )
        
        merged = merged.merge(
            enrol_df[['date', 'state', 'district', 'age_0_5', 'age_5_17', 'age_18_greater']], 
            on=['date', 'state', 'district'], 
            how='inner'
        )
        
        # Calculate correlations
        correlation_cols = ['bio_age_5_17', 'bio_age_17_', 'demo_age_5_17', 'demo_age_17_', 'age_5_17', 'age_18_greater']
        corr_matrix = merged[correlation_cols].corr()
        
        correlations = {}
        for col in corr_matrix.columns:
            correlations[col] = corr_matrix[col].to_dict()
        
        return correlations
    
    def process_all_data(self):
        """Main processing pipeline"""
        print("="*60)
        print("UIDAI DATA PROCESSING PIPELINE")
        print("="*60)
        
        # Load data
        bio_df = self.load_biometric_data()
        demo_df = self.load_demographic_data()
        enrol_df = self.load_enrolment_data()
        
        # Clean data
        bio_df = self.clean_data(bio_df, 'biometric')
        demo_df = self.clean_data(demo_df, 'demographic')
        enrol_df = self.clean_data(enrol_df, 'enrolment')
        
        # Generate outputs
        print("\n" + "="*60)
        print("GENERATING AGGREGATED DATA")
        print("="*60)
        
        processed_data = {
            'biometric': {
                'summary_stats': self.generate_summary_stats(bio_df, 'biometric'),
                'state_aggregation': self.aggregate_by_state(bio_df, 'biometric'),
                'district_aggregation': self.aggregate_by_district(bio_df, 'biometric'),
                'time_series': self.aggregate_by_time(bio_df, 'biometric'),
                'anomalies': self.detect_anomalies(bio_df, 'biometric')
            },
            'demographic': {
                'summary_stats': self.generate_summary_stats(demo_df, 'demographic'),
                'state_aggregation': self.aggregate_by_state(demo_df, 'demographic'),
                'district_aggregation': self.aggregate_by_district(demo_df, 'demographic'),
                'time_series': self.aggregate_by_time(demo_df, 'demographic'),
                'anomalies': self.detect_anomalies(demo_df, 'demographic')
            },
            'enrolment': {
                'summary_stats': self.generate_summary_stats(enrol_df, 'enrolment'),
                'state_aggregation': self.aggregate_by_state(enrol_df, 'enrolment'),
                'district_aggregation': self.aggregate_by_district(enrol_df, 'enrolment'),
                'time_series': self.aggregate_by_time(enrol_df, 'enrolment'),
                'anomalies': self.detect_anomalies(enrol_df, 'enrolment')
            },
            'correlations': self.calculate_correlations(bio_df, demo_df, enrol_df)
        }
        
        # Save to JSON
        output_path = self.base_path / 'processed_data' / 'dashboard_data.json'
        output_path.parent.mkdir(exist_ok=True)
        
        with open(output_path, 'w') as f:
            json.dump(processed_data, f, indent=2)
        
        print(f"\n✅ Processed data saved to: {output_path}")
        print(f"   Total file size: {output_path.stat().st_size / (1024*1024):.2f} MB")
        
        return processed_data


if __name__ == "__main__":
    # Get the base path (parent directory of data_processing)
    base_path = Path(__file__).parent.parent
    
    # Initialize processor
    processor = UidaiDataProcessor(base_path)
    
    # Process all data
    processor.process_all_data()
    
    print("\n" + "="*60)
    print("DATA PROCESSING COMPLETE!")
    print("="*60)
