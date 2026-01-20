import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockDashboardData, formatNumber } from '../services/dataService';
import './Dashboard.css';

const ResearchDashboard = () => {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    state: 'all',
    district: 'all',
    datasetType: 'biometric',
    dateRange: 'all',
    ageGroup: 'all'
  });

  useEffect(() => {
    // Load data on component mount
    setData(mockDashboardData);
  }, []);

  if (!data) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
          <p style={{ fontSize: '18px', color: '#64748b' }}>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const getCurrentDataset = () => {
    return filters.datasetType === 'biometric' ? data.biometric :
           filters.datasetType === 'demographic' ? data.demographic :
           filters.datasetType === 'enrolment' ? data.enrolment :
           data.biometric;
  };

  const currentData = getCurrentDataset();
  const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#eff6ff', '#f59e0b', '#10b981', '#ef4444'];

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <Link to="/">🇮🇳 UIDAI Hub</Link>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li><a href="#overview" className="active">📊 Overview</a></li>
            <li><a href="#univariate">📈 Univariate Analysis</a></li>
            <li><a href="#bivariate">📉 Bivariate Analysis</a></li>
            <li><a href="#trivariate">🔷 Trivariate Analysis</a></li>
            <li><a href="#map">🗺️ Geographic View</a></li>
            <li><a href="#anomalies">🚨 Anomalies</a></li>
            <li><a href="#export">💾 Export Data</a></li>
          </ul>
        </nav>
        
        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Home
          </Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>🔬 Research Analyst Dashboard</h1>
          <p>Deep-dive statistical analysis and advanced data exploration</p>
        </div>

        {/* Filter Panel */}
        <div className="filter-panel">
          <h3>🔍 Advanced Filters</h3>
          <div className="filter-grid">
            <div className="filter-group">
              <label>Dataset Type</label>
              <select value={filters.datasetType} onChange={(e) => setFilters({...filters, datasetType: e.target.value})}>
                <option value="biometric">Biometric Authentication</option>
                <option value="demographic">Demographic Authentication</option>
                <option value="enrolment">Enrolment Data</option>
                <option value="all">All Datasets</option>
              </select>
            </div>

            <div className="filter-group">
              <label>State</label>
              <select value={filters.state} onChange={(e) => setFilters({...filters, state: e.target.value})}>
                <option value="all">All States</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="uttar_pradesh">Uttar Pradesh</option>
                <option value="bihar">Bihar</option>
                <option value="west_bengal">West Bengal</option>
                <option value="telangana">Telangana</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Date Range</label>
              <select value={filters.dateRange} onChange={(e) => setFilters({...filters, dateRange: e.target.value})}>
                <option value="all">All Time (Mar-Nov 2025)</option>
                <option value="last_month">Last Month</option>
                <option value="last_3_months">Last 3 Months</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Age Group</label>
              <select value={filters.ageGroup} onChange={(e) => setFilters({...filters, ageGroup: e.target.value})}>
                <option value="all">All Age Groups</option>
                <option value="0-5">0-5 years</option>
                <option value="5-17">5-17 years</option>
                <option value="17+">17+ years</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button className="btn-primary">Apply Filters</button>
            <button className="btn-secondary">Reset</button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Records ({filters.datasetType})</div>
            <div className="stat-value">{formatNumber(currentData.summary_stats.total_records)}</div>
            <div className="stat-change positive">100% Coverage</div>
          </div>

          <div className="stat-card success">
            <div className="stat-label">Total Transactions</div>
            <div className="stat-value">{formatNumber(currentData.summary_stats.total_transactions)}</div>
            <div className="stat-change positive">All age groups</div>
          </div>

          <div className="stat-card warning">
            <div className="stat-label">Unique States</div>
            <div className="stat-value">{currentData.summary_stats.unique_states}</div>
            <div className="stat-change">Pan-India coverage</div>
          </div>

          <div className="stat-card danger">
            <div className="stat-label">Unique Districts</div>
            <div className="stat-value">{currentData.summary_stats.unique_districts}</div>
            <div className="stat-change">Geographic spread</div>
          </div>
        </div>

        {/* Analysis Section */}
        <div id="univariate" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">📈 Univariate Analysis - State Distribution</h2>
            <div className="chart-controls">
              <button className="btn-secondary">Export Chart</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={currentData.state_aggregation.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Bar dataKey="total" fill="#1e40af" name="Total Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">📈 Time Series Trend - Monthly Data</h2>
            <div className="chart-controls">
              <button className="btn-secondary">Export Chart</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={currentData.time_series.monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#1e40af" strokeWidth={3} name="Total" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div id="bivariate" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">📉 Bivariate Analysis - Age Group Distribution</h2>
            <div className="chart-controls">
              <button className="btn-secondary">Export Chart</button>
            </div>
          </div>
          <div className="grid grid-2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: filters.datasetType === 'enrolment' ? '0-5 years' : '5-17 years', 
                      value: currentData.state_aggregation.reduce((sum, s) => sum + (filters.datasetType === 'enrolment' ? (s.age_0_5 || 0) : (s.bio_age_5_17 || s.demo_age_5_17 || s.age_5_17 || 0)), 0) },
                    { name: filters.datasetType === 'enrolment' ? '5-17 years' : '17+ years', 
                      value: currentData.state_aggregation.reduce((sum, s) => sum + (filters.datasetType === 'enrolment' ? (s.age_5_17 || 0) : (s.bio_age_17_ || s.demo_age_17_ || 0)), 0) },
                    { name: '18+ years', 
                      value: filters.datasetType === 'enrolment' ? currentData.state_aggregation.reduce((sum, s) => sum + (s.age_18_greater || 0), 0) : 0 }
                  ].filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${formatNumber(entry.value)}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatNumber(value)} />
              </PieChart>
            </ResponsiveContainer>
            
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#1a202c' }}>Age Group Summary Statistics</h3>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Dataset: <strong>{filters.datasetType}</strong></p>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>States Analyzed: <strong>{currentData.state_aggregation.length}</strong></p>
                <p style={{ fontSize: '14px', color: '#64748b' }}>Time Period: <strong>{currentData.summary_stats.date_range.start} to {currentData.summary_stats.date_range.end}</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div id="trivariate" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">🔷 Trivariate Analysis - Top 5 States by Age Groups</h2>
            <div className="chart-controls">
              <button className="btn-secondary">Export Chart</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={currentData.state_aggregation.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              {filters.datasetType === 'enrolment' ? (
                <>
                  <Bar dataKey="age_0_5" fill="#ef4444" name="0-5 years" />
                  <Bar dataKey="age_5_17" fill="#f59e0b" name="5-17 years" />
                  <Bar dataKey="age_18_greater" fill="#10b981" name="18+ years" />
                </>
              ) : (
                <>
                  <Bar dataKey={filters.datasetType === 'biometric' ? 'bio_age_5_17' : 'demo_age_5_17'} fill="#3b82f6" name="5-17 years" />
                  <Bar dataKey={filters.datasetType === 'biometric' ? 'bio_age_17_' : 'demo_age_17_'} fill="#10b981" name="17+ years" />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Map Section */}
        <div id="map" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">🗺️ Interactive Geographic View</h2>
            <div className="chart-controls">
              <button className="btn-secondary">Toggle Layers</button>
            </div>
          </div>
          <div style={{ padding: '60px', textAlign: 'center', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', borderRadius: '8px' }}>
            <p style={{ fontSize: '20px', color: '#1e40af', fontWeight: '600' }}>
              🗺️ Interactive India Map
            </p>
            <p style={{ fontSize: '14px', color: '#3b82f6', marginTop: '12px' }}>
              Click states for drill-down • Hover for tooltips • Toggle data layers
            </p>
          </div>
        </div>

        {/* Anomalies Section */}
        <div id="anomalies" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">🚨 Anomaly Detection</h2>
            <div className="chart-controls">
              <button className="btn-secondary">View All ({data.biometric.anomalies.length})</button>
            </div>
          </div>
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>State</th>
                  <th>District</th>
                  <th>Date</th>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Expected Max</th>
                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {data.biometric.anomalies.map((anomaly, idx) => (
                  <tr key={idx}>
                    <td><strong>{anomaly.state}</strong></td>
                    <td>{anomaly.district}</td>
                    <td>{anomaly.date}</td>
                    <td><code>{anomaly.metric}</code></td>
                    <td><strong>{formatNumber(anomaly.value)}</strong></td>
                    <td>{formatNumber(Math.round(anomaly.expected_max))}</td>
                    <td>
                      <span style={{ 
                        background: anomaly.severity === 'high' ? '#fef2f2' : '#fffbeb', 
                        color: anomaly.severity === 'high' ? '#dc2626' : '#f59e0b', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {anomaly.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Section */}
        <div id="export" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">💾 Export & Documentation</h2>
          </div>
          <div style={{ padding: '32px' }}>
            <div className="grid grid-2">
              <button className="btn-primary" style={{ padding: '16px' }}>
                📊 Export Charts as PNG
              </button>
              <button className="btn-primary" style={{ padding: '16px' }}>
                📄 Generate PDF Report
              </button>
              <button className="btn-primary" style={{ padding: '16px' }}>
                💾 Download Filtered Data (CSV)
              </button>
              <button className="btn-primary" style={{ padding: '16px' }}>
                📝 View Analysis Code
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearchDashboard;
