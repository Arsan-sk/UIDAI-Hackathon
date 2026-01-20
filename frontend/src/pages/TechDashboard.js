import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockDashboardData, formatNumber } from '../services/dataService';
import './Dashboard.css';

const TechDashboard = () => {
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
            <li><a href="#health" className="active">⚡ System Health</a></li>
            <li><a href="#performance">📊 Performance</a></li>
            <li><a href="#capacity">🔧 Capacity Planning</a></li>
            <li><a href="#alerts">🚨 Alerts</a></li>
            <li><a href="#reports">📄 Reports</a></li>
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
          <h1>⚙️ UIDAI Technical Team Dashboard</h1>
          <p>System monitoring, performance analytics, and capacity planning</p>
        </div>

        {/* System Health Metrics */}
        <div id="health" className="stats-grid">
          <div className="stat-card success">
            <div className="stat-label">System Status</div>
            <div className="stat-value">✓ Operational</div>
            <div className="stat-change positive">99.8% uptime</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Total Records Processed</div>
            <div className="stat-value">{formatNumber(
              data.biometric.summary_stats.total_records + 
              data.demographic.summary_stats.total_records + 
              data.enrolment.summary_stats.total_records
            )}</div>
            <div className="stat-change positive">Across all datasets</div>
          </div>

          <div className="stat-card warning">
            <div className="stat-label">Active States</div>
            <div className="stat-value">{data.biometric.summary_stats.unique_states}</div>
            <div className="stat-change">{data.biometric.summary_stats.unique_districts} districts</div>
          </div>

          <div className="stat-card danger">
            <div className="stat-label">Anomalies Detected</div>
            <div className="stat-value">{data.biometric.anomalies.length}</div>
            <div className="stat-change negative">Requires investigation</div>
          </div>
        </div>

        {/* State-wise Load Distribution */}
        <div id="performance" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">📊 State-wise Load Distribution</h2>
            <div className="chart-controls">
              <button className="btn-secondary">Last 24 Hours</button>
              <button className="btn-secondary">Export Data</button>
            </div>
          </div>
          
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>State</th>
                  <th>Biometric Auth</th>
                  <th>Demographic Auth</th>
                  <th>Total Load</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.biometric.state_aggregation.slice(0, 10).map((state, idx) => {
                  const demoState = data.demographic.state_aggregation.find(s => s.state === state.state);
                  const enrolState = data.enrolment.state_aggregation.find(s => s.state === state.state);
                  const totalLoad = state.total + (demoState?.total || 0) + (enrolState?.total || 0);
                  
                  let status, statusColor, statusBg;
                  if (totalLoad > 600000) {
                    status = 'High Load';
                    statusColor = '#dc2626';
                    statusBg = '#fef2f2';
                  } else if (totalLoad > 400000) {
                    status = 'Moderate';
                    statusColor = '#f59e0b';
                    statusBg = '#fffbeb';
                  } else {
                    status = 'Normal';
                    statusColor = '#10b981';
                    statusBg = '#f0fdf4';
                  }
                  
                  return (
                    <tr key={idx}>
                      <td><strong>{state.state}</strong></td>
                      <td>{formatNumber(state.total)}</td>
                      <td>{formatNumber(demoState?.total || 0)}</td>
                      <td>{formatNumber(totalLoad)}</td>
                      <td>
                        <span style={{ 
                          background: statusBg, 
                          color: statusColor, 
                          padding: '4px 12px', 
                          borderRadius: '4px', 
                          fontSize: '12px', 
                          fontWeight: '600' 
                        }}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Time Series Analysis */}
        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">📈 Authentication Volume Trends</h2>
            <div className="chart-controls">
              <button className="btn-secondary">View Monthly Data</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.biometric.time_series}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} name="Biometric Auth" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Capacity Planning */}
        <div id="capacity" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">🔧 Capacity Planning & Forecasting</h2>
          </div>
          
          <div className="grid grid-3" style={{ padding: '24px' }}>
            <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#1a202c' }}>30-Day Forecast</h3>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#3b82f6', marginBottom: '8px' }}>+18.5%</p>
              <p style={{ fontSize: '14px', color: '#64748b' }}>Expected load increase</p>
            </div>

            <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🖥️</div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#1a202c' }}>Recommended Servers</h3>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>+12</p>
              <p style={{ fontSize: '14px', color: '#64748b' }}>For Bihar & UP regions</p>
            </div>

            <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏱️</div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#1a202c' }}>Avg Response Time</h3>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b', marginBottom: '8px' }}>247ms</p>
              <p style={{ fontSize: '14px', color: '#64748b' }}>Target: &lt;200ms</p>
            </div>
          </div>
        </div>

        {/* Infrastructure Heatmap */}
        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">🗺️ Infrastructure Load Heatmap</h2>
          </div>
          <div style={{ padding: '60px', textAlign: 'center', background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', borderRadius: '8px' }}>
            <p style={{ fontSize: '20px', color: '#dc2626', fontWeight: '600' }}>
              🗺️ Geographic Server Load Distribution
            </p>
            <p style={{ fontSize: '14px', color: '#ef4444', marginTop: '12px' }}>
              Red zones indicate high load • Green zones have adequate capacity
            </p>
          </div>
        </div>

        {/* Alerts Dashboard */}
        <div id="alerts" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">🚨 Active Alerts & Anomalies</h2>
            <div className="chart-controls">
              <button className="btn-secondary">View All ({data.biometric.anomalies.length})</button>
            </div>
          </div>
          
          <div style={{ padding: '24px' }}>
            {data.biometric.anomalies.slice(0, 3).map((anomaly, idx) => (
              <div 
                key={idx}
                className="card" 
                style={{ 
                  marginBottom: '16px', 
                  padding: '20px', 
                  borderLeft: `4px solid ${anomaly.severity === 'high' ? '#dc2626' : '#f59e0b'}` 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ 
                      color: anomaly.severity === 'high' ? '#dc2626' : '#f59e0b', 
                      marginBottom: '8px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      textTransform: 'uppercase'
                    }}>
                      {anomaly.severity === 'high' ? '🔴 CRITICAL' : '🟡 WARNING'}
                    </h4>
                    <p style={{ fontWeight: '600', fontSize: '16px', marginBottom: '8px' }}>
                      Anomaly detected in {anomaly.state} - {anomaly.district}
                    </p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>
                      Metric: <code>{anomaly.metric}</code> | Value: {formatNumber(anomaly.value)} 
                      (Expected Max: {formatNumber(Math.round(anomaly.expected_max))})
                    </p>
                  </div>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#94a3b8',
                    whiteSpace: 'nowrap'
                  }}>
                    {anomaly.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export & Reports */}
        <div id="reports" className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">📄 Export & Reports</h2>
          </div>
          <div style={{ padding: '32px' }}>
            <div className="grid grid-2">
              <button className="btn-primary" style={{ padding: '16px' }}>
                📊 Download Performance Logs (CSV)
              </button>
              <button className="btn-primary" style={{ padding: '16px' }}>
                📄 Generate Capacity Planning Report
              </button>
              <button className="btn-primary" style={{ padding: '16px' }}>
                🗺️ Export Infrastructure Map
              </button>
              <button className="btn-primary" style={{ padding: '16px' }}>
                📧 Schedule Email Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TechDashboard;
