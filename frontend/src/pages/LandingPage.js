import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const roleCards = [
    {
      id: 'research',
      title: 'Research Analyst',
      icon: '🔬',
      description: 'Deep-dive statistical analysis with advanced filtering, correlations, and anomaly detection',
      features: [
        'Univariate, Bivariate & Trivariate Analysis',
        'Interactive Data Visualization',
        'Custom Filters & Metrics',
        'Export Analysis Reports'
      ],
      color: '#1e40af',
      path: '/research'
    },
    {
      id: 'policymaker',
      title: 'Policymaker',
      icon: '🏛️',
      description: 'Executive insights and sector-specific trends for informed decision-making',
      features: [
        'KPI Dashboard with Metrics',
        'Health, Finance & Education Insights',
        'District Comparison Tools',
        'Geographic Intelligence'
      ],
      color: '#059669',
      path: '/policymaker'
    },
    {
      id: 'tech',
      title: 'UIDAI Tech Team',
      icon: '⚙️',
      description: 'System monitoring, performance analytics, and capacity planning tools',
      features: [
        'Real-time System Health',
        'State-wise Load Distribution',
        'Demand Forecasting',
        'Anomaly Alerts'
      ],
      color: '#dc2626',
      path: '/tech'
    }
  ];

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo">🇮🇳 UIDAI Insights Hub</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              Transforming <span className="gradient-text">5 Million+ Aadhaar Transactions</span>
              <br />into Actionable Intelligence
            </h1>
            <p className="hero-subtitle">
              Unlocking Societal Trends in Aadhaar Enrolment and Authentication Data
            </p>
            
            {/* Problem Statement */}
            <div className="problem-statement">
              <p>
                <strong>Challenge:</strong> UIDAI generates millions of authentication and enrolment 
                transactions daily across India, but raw data lacks accessible insights for stakeholders 
                to identify patterns, trends, anomalies, or make informed decisions.
              </p>
              <p>
                <strong>Solution:</strong> An interactive analytics platform with role-specific dashboards 
                that translate complex datasets into clear, actionable insights through advanced visualizations, 
                statistical analysis, and geographic intelligence.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-item">
                <div className="stat-number">5M+</div>
                <div className="stat-label">Records Analyzed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">700+</div>
                <div className="stat-label">Districts Covered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3</div>
                <div className="stat-label">Data Types</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">36</div>
                <div className="stat-label">States & UTs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards Section */}
      <section className="roles-section">
        <div className="container">
          <h2 className="section-title">Choose Your Role</h2>
          <p className="section-subtitle">
            Select a dashboard tailored to your analytical needs
          </p>

          <div className="role-cards-grid">
            {roleCards.map((role, index) => (
              <div
                key={role.id}
                className="role-card fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(role.path)}
              >
                <div className="role-card-header" style={{ borderColor: role.color }}>
                  <div className="role-icon" style={{ background: role.color }}>
                    {role.icon}
                  </div>
                  <h3 className="role-title">{role.title}</h3>
                </div>
                
                <p className="role-description">{role.description}</p>
                
                <ul className="role-features">
                  {role.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="feature-check" style={{ color: role.color }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  className="role-button" 
                  style={{ background: role.color }}
                  onClick={() => navigate(role.path)}
                >
                  Open Dashboard →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Insights Section */}
      <section className="insights-section">
        <div className="container">
          <h2 className="section-title">What's Inside?</h2>
          
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">📊</div>
              <h3>Biometric Authentication</h3>
              <p>1.86M records tracking fingerprint, iris, and facial recognition authentication patterns across India</p>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">📝</div>
              <h3>Demographic Authentication</h3>
              <p>2.07M records of name, DOB, address-based authentication used in remote and rural areas</p>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">👤</div>
              <h3>New Enrolments</h3>
              <p>1.01M new Aadhaar registrations including newborns, migrants, and late registrants</p>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">🗺️</div>
              <h3>Geographic Intelligence</h3>
              <p>Interactive India maps with state/district drill-downs and pincode-level granularity</p>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">🔍</div>
              <h3>Anomaly Detection</h3>
              <p>Automated detection of unusual patterns, spikes, and system issues for proactive action</p>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">📈</div>
              <h3>Predictive Analytics</h3>
              <p>Trend forecasting for capacity planning and resource allocation optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prototype Notice */}
      <section className="prototype-notice">
        <div className="container">
          <div className="notice-card">
            <div className="notice-icon">ℹ️</div>
            <div className="notice-content">
              <h3>Prototype Notice</h3>
              <p>
                This is a working prototype developed for the UIDAI Hackathon. Authentication features 
                and live data integration are planned for production. The current version uses historical 
                datasets (March-November 2025) to demonstrate analytical capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About the Project</h4>
              <p>
                UIDAI Insights Hub is a comprehensive analytics platform designed to unlock 
                societal trends from Aadhaar enrolment and authentication data.
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Team Members</h4>
              <div className="team-member">
                <p className="member-name">Arsan SK</p>
                <div className="member-links">
                  <a href="https://github.com/Arsan-sk" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://www.linkedin.com/in/arsan-sk" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="http://arsansk.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>
                </div>
              </div>
              
              <div className="team-member">
                <p className="member-name">Arkal Sekar</p>
                <div className="member-links">
                  <a href="https://github.com/arkalsekar" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://www.linkedin.com/in/arkalsekar/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://arkalsekar.in/" target="_blank" rel="noopener noreferrer">Portfolio</a>
                </div>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Technology Stack</h4>
              <ul className="tech-list">
                <li>React.js</li>
                <li>Python (pandas, numpy)</li>
                <li>Recharts</li>
                <li>Interactive Maps</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2026 UIDAI Insights Hub | Built for UIDAI Hackathon</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
