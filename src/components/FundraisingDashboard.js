import React, { useState } from 'react';
import './Dashboard.css';

// Mock data for the 6-month fundraising campaign
const fundraisingData = {
  campaignOverview: {
    name: "Green Horizon Initiative 2024",
    totalGoal: 500000,
    currentRaised: 285000,
    timeRemaining: "94 days",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    donorCount: 1250,
    avgDonation: 228,
    campaignPhase: "Growth Phase (Month 4)"
  },
  monthlyTargets: [
    { month: "January", target: 50000, raised: 52500, donors: 210, activities: 12, roi: 3.2 },
    { month: "February", target: 75000, raised: 82000, donors: 315, activities: 15, roi: 3.8 },
    { month: "March", target: 100000, raised: 95000, donors: 425, activities: 18, roi: 3.5 },
    { month: "April", target: 125000, raised: 55500, donors: 300, activities: 8, roi: 2.9 },
    { month: "May", target: 75000, raised: 0, donors: 0, activities: 0, roi: 0 },
    { month: "June", target: 75000, raised: 0, donors: 0, activities: 0, roi: 0 }
  ],
  donorSegments: {
    individual: {
      count: 850,
      totalAmount: 127500,
      avgGift: 150,
      retentionRate: 68,
      activities: [
        { name: "Email Campaign", status: "active", engagement: 42 },
        { name: "Social Media", status: "active", engagement: 38 },
        { name: "Direct Mail", status: "completed", engagement: 25 }
      ]
    },
    corporate: {
      count: 25,
      totalAmount: 87500,
      avgGift: 3500,
      retentionRate: 82,
      activities: [
        { name: "Executive Outreach", status: "active", engagement: 65 },
        { name: "Partnership Proposals", status: "in progress", engagement: 48 },
        { name: "Corporate Events", status: "planned", engagement: 0 }
      ]
    },
    foundation: {
      count: 12,
      totalAmount: 70000,
      avgGift: 5833,
      retentionRate: 75,
      activities: [
        { name: "Grant Applications", status: "active", engagement: 72 },
        { name: "Impact Reports", status: "in progress", engagement: 55 },
        { name: "Site Visits", status: "planned", engagement: 0 }
      ]
    }
  },
  campaignActivities: {
    upcoming: [
      { name: "Earth Day Gala", date: "2024-04-22", type: "event", goal: 50000, registrations: 180 },
      { name: "Corporate Pitch Day", date: "2024-05-15", type: "presentation", goal: 75000, registrations: 12 },
      { name: "Community Clean-up", date: "2024-05-28", type: "engagement", goal: 15000, registrations: 95 }
    ],
    ongoing: [
      { name: "Monthly Giving Program", type: "program", participants: 325, monthlyValue: 12500 },
      { name: "Corporate Matching", type: "program", participants: 8, matchedAmount: 45000 },
      { name: "Grant Writing", type: "activity", submissions: 15, pendingAmount: 125000 }
    ],
    completed: [
      { name: "Launch Event", date: "2024-01-15", type: "event", raised: 35000, attendance: 250 },
      { name: "Q1 Email Campaign", date: "2024-03-31", type: "digital", raised: 28500, engagement: 42 },
      { name: "Partner Summit", date: "2024-02-28", type: "event", raised: 65000, attendance: 75 }
    ]
  },
  metrics: {
    keyMetrics: {
      donorRetention: { current: 72, target: 75, trend: "up" },
      avgGiftSize: { current: 228, target: 250, trend: "up" },
      donorGrowth: { current: 15, target: 20, trend: "stable" },
      campaignROI: { current: 3.4, target: 4.0, trend: "up" }
    },
    channelPerformance: {
      email: { reach: 15000, engagement: 22, conversion: 3.8, revenue: 45000 },
      social: { reach: 50000, engagement: 18, conversion: 2.2, revenue: 35000 },
      events: { reach: 1200, engagement: 65, conversion: 12.5, revenue: 125000 },
      direct: { reach: 5000, engagement: 12, conversion: 4.2, revenue: 80000 }
    }
  },
  riskManagement: {
    activeRisks: [
      { name: "Economic Downturn", impact: "high", probability: "medium", mitigation: "Diversify donor base" },
      { name: "Competitor Campaign", impact: "medium", probability: "high", mitigation: "Unique value proposition" },
      { name: "Event Cancellation", impact: "high", probability: "low", mitigation: "Virtual backup plans" }
    ],
    contingencyFunds: {
      allocated: 25000,
      used: 5000,
      remaining: 20000
    }
  }
};

function CampaignOverview({ data }) {
  const progressPercentage = (data.currentRaised / data.totalGoal) * 100;
  
  return (
    <div className="dashboard-card campaign-overview">
      <h2>📊 Campaign Overview</h2>
      <div className="overview-grid">
        <div className="overview-main">
          <h3>{data.name}</h3>
          <div className="progress-container">
            <div className="progress-stats">
              <span>${data.currentRaised.toLocaleString()}</span>
              <span>of ${data.totalGoal.toLocaleString()}</span>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="progress-details">
              <span>{progressPercentage.toFixed(1)}% Complete</span>
              <span>{data.timeRemaining} remaining</span>
            </div>
          </div>
        </div>
        <div className="overview-stats">
          <div className="stat-item">
            <label>Total Donors</label>
            <value>{data.donorCount.toLocaleString()}</value>
          </div>
          <div className="stat-item">
            <label>Avg. Donation</label>
            <value>${data.avgDonation.toLocaleString()}</value>
          </div>
          <div className="stat-item">
            <label>Campaign Phase</label>
            <value>{data.campaignPhase}</value>
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthlyProgress({ data }) {
  return (
    <div className="dashboard-card monthly-progress">
      <h2>📅 Monthly Progress</h2>
      <div className="monthly-grid">
        {data.map((month, index) => (
          <div key={index} className="month-card">
            <h3>{month.month}</h3>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${(month.raised / month.target) * 100}%` }}
              ></div>
            </div>
            <div className="month-stats">
              <div>Target: ${month.target.toLocaleString()}</div>
              <div>Raised: ${month.raised.toLocaleString()}</div>
              <div>Donors: {month.donors}</div>
              <div>ROI: {month.roi}x</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonorSegments({ data }) {
  return (
    <div className="dashboard-card donor-segments">
      <h2>👥 Donor Segments</h2>
      <div className="segments-grid">
        {Object.entries(data).map(([segment, info]) => (
          <div key={segment} className="segment-card">
            <h3>{segment.charAt(0).toUpperCase() + segment.slice(1)}</h3>
            <div className="segment-stats">
              <div className="stat-row">
                <span>Count:</span>
                <span>{info.count}</span>
              </div>
              <div className="stat-row">
                <span>Total:</span>
                <span>${info.totalAmount.toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span>Avg Gift:</span>
                <span>${info.avgGift.toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span>Retention:</span>
                <span>{info.retentionRate}%</span>
              </div>
            </div>
            <div className="segment-activities">
              <h4>Activities</h4>
              {info.activities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <span>{activity.name}</span>
                  <StatusBadge status={activity.status} />
                  {activity.engagement > 0 && (
                    <span className="engagement">{activity.engagement}% engaged</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CampaignActivities({ data }) {
  return (
    <div className="dashboard-card campaign-activities">
      <h2>🎯 Campaign Activities</h2>
      <div className="activities-grid">
        <div className="activities-section">
          <h3>Upcoming</h3>
          {data.upcoming.map((activity, index) => (
            <div key={index} className="activity-card">
              <div className="activity-header">
                <h4>{activity.name}</h4>
                <span className="activity-type">{activity.type}</span>
              </div>
              <div className="activity-details">
                <div>Date: {activity.date}</div>
                <div>Goal: ${activity.goal.toLocaleString()}</div>
                <div>Registrations: {activity.registrations}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="activities-section">
          <h3>Ongoing</h3>
          {data.ongoing.map((activity, index) => (
            <div key={index} className="activity-card">
              <div className="activity-header">
                <h4>{activity.name}</h4>
                <span className="activity-type">{activity.type}</span>
              </div>
              <div className="activity-details">
                {activity.participants && <div>Participants: {activity.participants}</div>}
                {activity.monthlyValue && <div>Monthly Value: ${activity.monthlyValue.toLocaleString()}</div>}
                {activity.matchedAmount && <div>Matched: ${activity.matchedAmount.toLocaleString()}</div>}
                {activity.pendingAmount && <div>Pending: ${activity.pendingAmount.toLocaleString()}</div>}
              </div>
            </div>
          ))}
        </div>
        <div className="activities-section">
          <h3>Completed</h3>
          {data.completed.map((activity, index) => (
            <div key={index} className="activity-card">
              <div className="activity-header">
                <h4>{activity.name}</h4>
                <span className="activity-type">{activity.type}</span>
              </div>
              <div className="activity-details">
                <div>Date: {activity.date}</div>
                <div>Raised: ${activity.raised.toLocaleString()}</div>
                {activity.attendance && <div>Attendance: {activity.attendance}</div>}
                {activity.engagement && <div>Engagement: {activity.engagement}%</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricsSection({ data }) {
  return (
    <div className="dashboard-card metrics-section">
      <h2>📈 Performance Metrics</h2>
      <div className="metrics-grid">
        <div className="key-metrics">
          <h3>Key Metrics</h3>
          <div className="metrics-list">
            {Object.entries(data.keyMetrics).map(([metric, values]) => (
              <div key={metric} className="metric-item">
                <div className="metric-header">
                  <span>{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className={`trend trend-${values.trend}`}>
                    {values.trend === "up" ? "↑" : values.trend === "down" ? "↓" : "→"}
                  </span>
                </div>
                <div className="metric-values">
                  <span>Current: {values.current}{metric.includes('ROI') ? 'x' : '%'}</span>
                  <span>Target: {values.target}{metric.includes('ROI') ? 'x' : '%'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="channel-performance">
          <h3>Channel Performance</h3>
          <div className="channel-grid">
            {Object.entries(data.channelPerformance).map(([channel, metrics]) => (
              <div key={channel} className="channel-card">
                <h4>{channel.charAt(0).toUpperCase() + channel.slice(1)}</h4>
                <div className="channel-metrics">
                  <div>Reach: {metrics.reach.toLocaleString()}</div>
                  <div>Engagement: {metrics.engagement}%</div>
                  <div>Conversion: {metrics.conversion}%</div>
                  <div>Revenue: ${metrics.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskManagement({ data }) {
  return (
    <div className="dashboard-card risk-management">
      <h2>⚠️ Risk Management</h2>
      <div className="risk-grid">
        <div className="active-risks">
          <h3>Active Risks</h3>
          <div className="risks-list">
            {data.activeRisks.map((risk, index) => (
              <div key={index} className="risk-item">
                <div className="risk-header">
                  <span>{risk.name}</span>
                  <div className="risk-indicators">
                    <StatusBadge status={risk.impact} />
                    <StatusBadge status={risk.probability} />
                  </div>
                </div>
                <div className="risk-mitigation">
                  Mitigation: {risk.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="contingency-funds">
          <h3>Contingency Funds</h3>
          <div className="funds-status">
            <div className="fund-item">
              <span>Allocated</span>
              <span>${data.contingencyFunds.allocated.toLocaleString()}</span>
            </div>
            <div className="fund-item">
              <span>Used</span>
              <span>${data.contingencyFunds.used.toLocaleString()}</span>
            </div>
            <div className="fund-item">
              <span>Remaining</span>
              <span>${data.contingencyFunds.remaining.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'planned': return 'bg-yellow-500';
      case 'in progress': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <span className={`status-badge ${getStatusColor(status)}`}>
      {status.toUpperCase()}
    </span>
  );
}

function FundraisingDashboard() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="fundraising-dashboard">
      <div className="dashboard-header">
        <h1>💰 Fundraising Campaign Dashboard</h1>
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'donors' ? 'active' : ''}`}
            onClick={() => setActiveTab('donors')}
          >
            Donors
          </button>
          <button 
            className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            Activities
          </button>
          <button 
            className={`tab-button ${activeTab === 'metrics' ? 'active' : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            Metrics
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {(activeTab === 'all' || activeTab === 'overview') && (
          <>
            <CampaignOverview data={fundraisingData.campaignOverview} />
            <MonthlyProgress data={fundraisingData.monthlyTargets} />
          </>
        )}
        {(activeTab === 'all' || activeTab === 'donors') && (
          <DonorSegments data={fundraisingData.donorSegments} />
        )}
        {(activeTab === 'all' || activeTab === 'activities') && (
          <>
            <CampaignActivities data={fundraisingData.campaignActivities} />
            <RiskManagement data={fundraisingData.riskManagement} />
          </>
        )}
        {(activeTab === 'all' || activeTab === 'metrics') && (
          <MetricsSection data={fundraisingData.metrics} />
        )}
      </div>
    </div>
  );
}

export default FundraisingDashboard; 