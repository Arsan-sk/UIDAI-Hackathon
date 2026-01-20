// Mock data service - Replace with real JSON loading later
export const mockDashboardData = {
  biometric: {
    summary_stats: {
      total_records: 1861108,
      total_transactions: 45234567,
      unique_states: 36,
      unique_districts: 712,
      date_range: { start: '2025-03-01', end: '2025-09-30' }
    },
    state_aggregation: [
      { state: 'Bihar', bio_age_5_17: 245621, bio_age_17_: 512450, total: 758071 },
      { state: 'Uttar Pradesh', bio_age_5_17: 198432, bio_age_17_: 387654, total: 586086 },
      { state: 'Maharashtra', bio_age_5_17: 223567, bio_age_17_: 454389, total: 677956 },
      { state: 'West Bengal', bio_age_5_17: 145234, bio_age_17_: 289543, total: 434777 },
      { state: 'Telangana', bio_age_5_17: 98765, bio_age_17_: 212345, total: 311110 },
      { state: 'Karnataka', bio_age_5_17: 87543, bio_age_17_: 198432, total: 285975 },
      { state: 'Tamil Nadu', bio_age_5_17: 76234, bio_age_17_: 187654, total: 263888 },
      { state: 'Gujarat', bio_age_5_17: 65432, bio_age_17_: 154321, total: 219753 },
      { state: 'Rajasthan', bio_age_5_17: 54321, bio_age_17_: 143210, total: 197531 },
      { state: 'Madhya Pradesh', bio_age_5_17: 48765, bio_age_17_: 132456, total: 181221 }
    ],
    time_series: {
      monthly: [
        { month: '2025-03', bio_age_5_17: 145000, bio_age_17_: 298000, total: 443000 },
        { month: '2025-04', bio_age_5_17: 152000, bio_age_17_: 312000, total: 464000 },
        { month: '2025-05', bio_age_5_17: 159000, bio_age_17_: 325000, total: 484000 },
        { month: '2025-06', bio_age_5_17: 164000, bio_age_17_: 338000, total: 502000 },
        { month: '2025-07', bio_age_5_17: 171000, bio_age_17_: 351000, total: 522000 },
        { month: '2025-08', bio_age_5_17: 178000, bio_age_17_: 365000, total: 543000 },
        { month: '2025-09', bio_age_5_17: 185000, bio_age_17_: 379000, total: 564000 }
      ]
    },
    anomalies: [
      { state: 'Bihar', district: 'Patna', date: '2025-09-15', metric: 'bio_age_17_', value: 12453, expected_max: 4500, severity: 'high' },
      { state: 'Maharashtra', district: 'Mumbai', date: '2025-08-22', metric: 'bio_age_5_17', value: 8902, expected_max: 3200, severity: 'medium' },
      { state: 'Uttar Pradesh', district: 'Lucknow', date: '2025-07-18', metric: 'bio_age_17_', value: 7654, expected_max: 2800, severity: 'medium' }
    ]
  },
  demographic: {
    summary_stats: {
      total_records: 2071700,
      total_transactions: 52345678,
      unique_states: 36,
      unique_districts: 718,
      date_range: { start: '2025-03-01', end: '2025-11-30' }
    },
    state_aggregation: [
      { state: 'Bihar', demo_age_5_17: 312450, demo_age_17_: 645621, total: 958071 },
      { state: 'Uttar Pradesh', demo_age_5_17: 287654, demo_age_17_: 498432, total: 786086 },
      { state: 'Maharashtra', demo_age_5_17: 254389, demo_age_17_: 523567, total: 777956 },
      { state: 'West Bengal', demo_age_5_17: 189543, demo_age_17_: 345234, total: 534777 },
      { state: 'Telangana', demo_age_5_17: 112345, demo_age_17_: 198765, total: 311110 }
    ],
    time_series: {
      monthly: [
        { month: '2025-03', demo_age_5_17: 165000, demo_age_17_: 328000, total: 493000 },
        { month: '2025-04', demo_age_5_17: 172000, demo_age_17_: 342000, total: 514000 },
        { month: '2025-05', demo_age_5_17: 179000, demo_age_17_: 355000, total: 534000 },
        { month: '2025-06', demo_age_5_17: 184000, demo_age_17_: 368000, total: 552000 },
        { month: '2025-07', demo_age_5_17: 191000, demo_age_17_: 381000, total: 572000 },
        { month: '2025-08', demo_age_5_17: 198000, demo_age_17_: 395000, total: 593000 },
        { month: '2025-09', demo_age_5_17: 205000, demo_age_17_: 409000, total: 614000 }
      ]
    }
  },
  enrolment: {
    summary_stats: {
      total_records: 1006029,
      total_transactions: 2456789,
      unique_states: 36,
      unique_districts: 695,
      date_range: { start: '2025-03-01', end: '2025-09-30' }
    },
    state_aggregation: [
      { state: 'Bihar', age_0_5: 45231, age_5_17: 98654, age_18_greater: 65432, total: 209317 },
      { state: 'Uttar Pradesh', age_0_5: 38765, age_5_17: 87543, age_18_greater: 54321, total: 180629 },
      { state: 'Maharashtra', age_0_5: 32456, age_5_17: 76234, age_18_greater: 48765, total: 157455 },
      { state: 'West Bengal', age_0_5: 28432, age_5_17: 65432, age_18_greater: 42156, total: 136020 },
      { state: 'Telangana', age_0_5: 21345, age_5_17: 54321, age_18_greater: 38745, total: 114411 }
    ],
    time_series: {
      monthly: [
        { month: '2025-03', age_0_5: 12000, age_5_17: 28000, age_18_greater: 18000, total: 58000 },
        { month: '2025-04', age_0_5: 13500, age_5_17: 31000, age_18_greater: 20000, total: 64500 },
        { month: '2025-05', age_0_5: 14200, age_5_17: 33000, age_18_greater: 21500, total: 68700 },
        { month: '2025-06', age_0_5: 15000, age_5_17: 35000, age_18_greater: 22800, total: 72800 },
        { month: '2025-07', age_0_5: 15800, age_5_17: 37500, age_18_greater: 24200, total: 77500 },
        { month: '2025-08', age_0_5: 16500, age_5_17: 39800, age_18_greater: 25600, total: 81900 },
        { month: '2025-09', age_0_5: 17200, age_5_17: 42100, age_18_greater: 27000, total: 86300 }
      ]
    }
  },
  correlations: {
    bio_age_5_17: { demo_age_5_17: 0.78, age_5_17: 0.73 },
    bio_age_17_: { demo_age_17_: 0.82, age_18_greater: 0.69 },
    demo_age_5_17: { age_5_17: 0.75 },
    demo_age_17_: { age_18_greater: 0.71 }
  }
};

export const getStates = () => {
  return ['All States', 'Bihar', 'Uttar Pradesh', 'Maharashtra', 'West Bengal', 'Telangana', 'Karnataka', 
          'Tamil Nadu', 'Gujarat', 'Rajasthan', 'Madhya Pradesh', 'Delhi', 'Punjab', 'Haryana', 'Assam'];
};

export const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const calculatePercentageChange = (current, previous) => {
  if (!previous) return 0;
  return (((current - previous) / previous) * 100).toFixed(1);
};
