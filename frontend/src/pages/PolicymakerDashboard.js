import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockDashboardData, formatNumber } from '../services/dataService';
import './Dashboard.css';

const PolicymakerDashboard = () => {
  const [activeTab, setActiveTab] = useState('health');
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(mockDashboardData);
  }, []);

  if (!data) {
    return <div style={{ padding: '40px', textAlign: 'center', fontSize: '18px' }}>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <Link to="/">🇮🇳 UIDAI Hub</Link>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li><a href="#kpi" className="active">📊 KPI Overview</a></li>
            <li><a href="#sectors">🏥 Sector Insights</a></li>
            <li><a href="#comparison">📈 Trend Comparison</a></li>
            <li><a href="#map">🗺️ Geographic View</a></li>
            <li><a href="#recommendations">💡 Recommendations</a></li>
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
          <h1>🏛️ Policymaker Dashboard</h1>
          <p>Executive insights and sector-specific trends for decision-making</p>
        </div>

        {/* KPI Cards */}
        <div id="kpi" className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Authentications (All Time)</div>
            <div className="stat-value">{formatNumber(data.biometric.summary_stats.total_records + data.demographic.summary_stats.total_records)}</div>
            <div className="stat-change positive">↑ 12.5% from last month</div>
          </div>

          <div className="stat-card success">
            <div className="stat-label">New Enrolments (All Time)</div>
            <div className="stat-value">{formatNumber(data.enrolment.summary_stats.total_records)}</div>
            <div className="stat-change positive">↑ 8.3% from last month</div>
          </div>

          <div className="stat-card warning">
            <div className="stat-label">Top Performing State</div>
            <div className="stat-value">{data.biometric.state_aggregation[0].state}</div>
            <div className="stat-change">{formatNumber(data.biometric.state_aggregation[0].total)} authentications</div>
          </div>

          <div className="stat-card danger">
            <div className="stat-label">Anomaly Alerts</div>
            <div className="stat-value">{data.biometric.anomalies.length}</div>
            <div className="stat-change negative">Requires attention</div>
          </div>
        </div>

        {/* Sector Insights */}
        <div id="sectors" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">🏥 Sector-Specific Insights</h2>
          </div>

          <div className="tabs">
            <button className={`tab ${activeTab === 'health' ? 'active' : ''}`} onClick={() => setActiveTab('health')}>
              🏥 Health Sector
            </button>
            <button className={`tab ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveTab('finance')}>
              💰 Financial Inclusion
            </button>
            <button className={`tab ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>
              🎓 Education
            </button>
          </div>

          <div style={{ padding: '32px' }}>
            {activeTab === 'health' && (
              <div className="fade-in">
                <h3 style={{ marginBottom: '16px', color: '#1a202c' }}>Healthcare Access Indicators</h3>
                <div className="grid grid-2">
                  <div className="card" style={{ padding: '20px' }}>
                    <h4 style={{ marginBottom: '12px', color: '#64748b' }}>Biometric Auth Near Healthcare Facilities</h4>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#10b981' }}>
                      {formatNumber(data.biometric.summary_stats.total_records)}
                    </p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Total biometric transactions</p>
                  </div>
                  <div className="card" style={{ padding: '20px' }}>
                    <h4 style={{ marginBottom: '12px', color: '#64748b' }}>Youth Authentication Trends</h4>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#3b82f6' }}>
                      {formatNumber(data.biometric.state_aggregation.reduce((sum, s) => sum + s.bio_age_5_17, 0))}
                    </p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Age 5-17 authentications</p>
                  </div>
                </div>
                
                {/* Time Series Chart */}
                <div style={{ marginTop: '24px' }}>
                  <h4 style={{ marginBottom: '16px', color: '#64748b' }}>Monthly Authentication Trend</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.biometric.time_series}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatNumber(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} name="Biometric Auth" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'finance' && (
              <div className="fade-in">
                <h3 style={{ marginBottom: '16px', color: '#1a202c' }}>Digital Payment & Banking Adoption</h3>
                <div className="grid grid-2">
                  <div className="card" style={{ padding: '20px' }}>
                    <h4 style={{ marginBottom: '12px', color: '#64748b' }}>Demographic Auth (Banking Proxy)</h4>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#8b5cf6' }}>
                      {formatNumber(data.demographic.summary_stats.total_records)}
                    </p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Total demographic authentications</p>
                  </div>
                  <div className="card" style={{ padding: '20px' }}>
                    <h4 style={{ marginBottom: '12px', color: '#64748b' }}>Coverage States</h4>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#ef4444' }}>
                      {data.demographic.summary_stats.unique_states}
                    </p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>States covered</p>
                  </div>
                </div>
                
                {/* Top States by Demographic Auth */}
                <div style={{ marginTop: '24px' }}>
                  <h4 style={{ marginBottom: '16px', color: '#64748b' }}>Top 10 States - Demographic Authentication</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.demographic.state_aggregation.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="state" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip formatter={(value) => formatNumber(value)} />
                      <Legend />
                      <Bar dataKey="total" fill="#8b5cf6" name="Total Transactions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="fade-in">
                <h3 style={{ marginBottom: '16px', color: '#1a202c' }}>Education & Scholarship Indicators</h3>
                <div className="grid grid-2">
                  <div className="card" style={{ padding: '20px' }}>
                    <h4 style={{ marginBottom: '12px', color: '#64748b' }}>Youth (5-17) Enrolment</h4>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#f59e0b' }}>
                      {formatNumber(data.enrolment.state_aggregation.reduce((sum, s) => sum + s.age_5_17, 0))}
                    </p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Total youth enrolments</p>
                  </div>
                  <div className="card" style={{ padding: '20px' }}>
                    <h4 style={{ marginBottom: '12px', color: '#64748b' }}>Child (0-5) Enrolment</h4>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#06b6d4' }}>
                      {formatNumber(data.enrolment.state_aggregation.reduce((sum, s) => sum + s.age_0_5, 0))}
                    </p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Total child enrolments</p>
                  </div>
                </div>
                
                {/* Enrolment by Age Group Chart */}
                <div style={{ marginTop: '24px' }}>
                  <h4 style={{ marginBottom: '16px', color: '#64748b' }}>Age-wise Enrolment Distribution (Top 10 States)</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.enrolment.state_aggregation.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="state" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip formatter={(value) => formatNumber(value)} />
                      <Legend />
                      <Bar dataKey="age_0_5" fill="#ef4444" name="0-5 years" stackId="a" />
                      <Bar dataKey="age_5_17" fill="#f59e0b" name="5-17 years" stackId="a" />
                      <Bar dataKey="age_18_greater" fill="#10b981" name="18+ years" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trend Comparison */}
        <div id="comparison" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">📈 Trend Comparisons</h2>
            <div className="chart-controls">
              <button className="btn-secondary">Select Districts</button>
            </div>
          </div>
          <div style={{ padding: '40px', textAlign: 'center', background: '#f8fafc', borderRadius: '8px' }}>
            <p style={{ fontSize: '16px', color: '#64748b' }}>
              📊 Month-over-month trends and district comparisons will appear here
            </p>
          </div>
        </div>

        {/* Map View */}
        <div id="map" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">🗺️ Geographic Intelligence</h2>
          </div>
          <div style={{ padding: '60px', textAlign: 'center', background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', borderRadius: '8px' }}>
            <p style={{ fontSize: '20px', color: '#059669', fontWeight: '600' }}>
              🗺️ Interactive India Map (Choropleth)
            </p>
            <p style={{ fontSize: '14px', color: '#10b981', marginTop: '12px' }}>
              View state-wise performance • Identify low-performing regions • Export district reports
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div id="recommendations" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">💡 Action Recommendations</h2>
          </div>
          <div style={{ padding: '24px' }}>
            <div className="card" style={{ marginBottom: '16px', padding: '20px', borderLeft: '4px solid #ef4444' }}>
              <h4 style={{ color: '#ef4444', marginBottom: '8px' }}>⚠️ High Priority</h4>
              <p><strong>Bihar - Patna District:</strong> 40% drop in youth (5-17) authentications detected. Investigate potential service disruption or enrollment center issues.</p>
            </div>

            <div className="card" style={{ marginBottom: '16px', padding: '20px', borderLeft: '4px solid #f59e0b' }}>
              <h4 style={{ color: '#f59e0b', marginBottom: '8px' }}>⚡ Medium Priority</h4>
              <p><strong>Uttar Pradesh - Multiple Districts:</strong> Low digital payment adoption (demographic auth below state average). Target for banking infrastructure improvements.</p>
            </div>

            <div className="card" style={{ padding: '20px', borderLeft: '4px solid #10b981' }}>
              <h4 style={{ color: '#10b981', marginBottom: '8px' }}>✓ Best Practices</h4>
              <p><strong>Telangana - Hyderabad:</strong> Highest enrolment growth rate (18.2% MoM). Study and replicate successful enrollment strategies.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PolicymakerDashboard;
