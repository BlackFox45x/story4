import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';
import './Dashboard.css';

// Mock data - in a real app, this would come from an API or database
const dashboardData = {
  producer: {
    name: "PLAYER NAME",
    level: 15,
    studio: "Midtown Media Hub",
    reputation: 635,
    networkSize: 3,
    totalAudience: 12500
  },
  metrics: {
    monthlyDownloads: { current: 12500, change: "+15%", target: 15000, status: "IN PROGRESS" },
    newSubscribers: { current: 750, change: "+25%", target: 1000, status: "IN PROGRESS" },
    listenerRetention: { current: 68, change: "+3%", target: 75, status: "IN PROGRESS" },
    engagementRate: { current: 4.2, change: "+0.5%", target: 5.0, status: "IN PROGRESS" },
    revenue: { current: 2450, change: "+20%", target: 3000, status: "IN PROGRESS" }
  },
  shows: [
    { name: "Main Show", episodes: 45, avgDownloads: 1250, trend: "up", opportunity: "Guest Co-Hosts", health: 92 },
    { name: "Industry Interview Series", episodes: 12, avgDownloads: 875, trend: "up", opportunity: "More Top-Tier Guests", health: 88 },
    { name: "Weekly News Recap", episodes: 26, avgDownloads: 650, trend: "neutral", opportunity: "Add Commentary Segment", health: 75 }
  ],
  activeQuests: {
    primary: {
      name: "Network Expansion",
      objective: "Launch 2 new podcast shows within 60 days",
      progress: 50,
      rewards: ["5,000 XP", "Unlock Network Synergy skill", "+15% Cross-Promotion Effectiveness"],
      deadline: "30 days remaining"
    },
    side: [
      { name: "Sponsor Relationships", description: "Secure 2 new sponsors", deadline: "25 days", progress: "1/2", urgency: "medium" },
      { name: "Content Backlog", description: "Pre-record 5 episodes", deadline: "14 days", progress: "2/5", urgency: "high" },
      { name: "Audience Engagement", description: "Respond to 100 listener messages", deadline: "30 days", progress: "65/100", urgency: "low" },
      { name: "Technical Upgrade", description: "Implement new audio processing", deadline: "7 days", progress: "0/1", urgency: "critical" }
    ]
  }
};

function StatusIndicator({ status }) {
  const getStatusEmoji = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return '✅';
      case 'in progress': return '🟡';
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };
  
  return <span className="status-indicator">{getStatusEmoji(status)} {status}</span>;
}

function HeroHeader({ producer }) {
  return (
    <div className="hero-header">
      <h1>🎮 PODCAST EMPIRE DASHBOARD</h1>
      <div className="producer-info">
        <div>👤 PRODUCER: {producer.name}</div>
        <div>📊 LEVEL: {producer.level}</div>
        <div>🏢 STUDIO: {producer.studio}</div>
        <div>⭐ REPUTATION: {"★".repeat(Math.floor(producer.reputation/200)) + "☆".repeat(5-Math.floor(producer.reputation/200))} ({producer.reputation}/1000)</div>
        <div>🎙️ NETWORK: {producer.networkSize} SHOWS</div>
        <div>👥 AUDIENCE: {producer.totalAudience.toLocaleString()}</div>
      </div>
    </div>
  );
}

function MetricsSection({ metrics }) {
  return (
    <div className="dashboard-card metrics-section">
      <h2>📊 PERFORMANCE METRICS</h2>
      <div className="metrics-grid">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="metric-item">
            <h3>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
            <div className="metric-values">
              <div>Current: {typeof value.current === 'number' ? value.current.toLocaleString() : value.current}</div>
              <div className="change">{value.change}</div>
              <div>Target: {value.target.toLocaleString()}</div>
              <StatusIndicator status={value.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShowsSection({ shows }) {
  return (
    <div className="dashboard-card shows-section">
      <h2>🎭 CONTENT PERFORMANCE</h2>
      <div className="shows-grid">
        {shows.map((show, index) => (
          <div key={index} className="show-item">
            <h3>{show.name}</h3>
            <div>Episodes: {show.episodes}</div>
            <div>Avg. Downloads: {show.avgDownloads.toLocaleString()}</div>
            <div>Trend: {show.trend === "up" ? "↗️" : "➡️"}</div>
            <div>Health: <span className={`health-indicator health-${show.health >= 90 ? 'excellent' : show.health >= 75 ? 'good' : 'warning'}`}>
              {show.health}%
            </span></div>
            <div>Growth: {show.opportunity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestsSection({ activeQuests }) {
  return (
    <div className="dashboard-card quests-section">
      <h2>🎯 ACTIVE MISSIONS</h2>
      <div className="primary-quest">
        <h3>PRIMARY QUEST: {activeQuests.primary.name}</h3>
        <p>{activeQuests.primary.objective}</p>
        <div className="quest-deadline">{activeQuests.primary.deadline}</div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${activeQuests.primary.progress}%` }}></div>
        </div>
        <div className="rewards">
          <h4>🏆 Rewards:</h4>
          <ul>
            {activeQuests.primary.rewards.map((reward, index) => (
              <li key={index}>{reward}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="side-quests">
        <h3>📋 SIDE QUESTS</h3>
        <div className="side-quests-grid">
          {activeQuests.side.map((quest, index) => (
            <div key={index} className="side-quest-item">
              <StatusIndicator status={quest.urgency} />
              <h4>{quest.name}</h4>
              <p>{quest.description}</p>
              <div>⏳ Deadline: {quest.deadline}</div>
              <div>📈 Progress: {quest.progress}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BusinessValueCard({ metrics }) {
  const totalValue = (metrics.total_effort * metrics.total_impact * metrics.total_alignment) + 
                    metrics.total_reward + metrics.delta_value;
  
  return (
    <div className="dashboard-card business-value-card">
      <h2>🏢 Business Value Matrix</h2>
      <div className="business-metrics">
        <div className="metric-item">
          <h3>Total Business Value</h3>
          <div className="value">{totalValue.toFixed(2)}</div>
          <div className="formula">E(x) × I(x) × A(x) + R(x) + ΔValue(C)</div>
        </div>
        <div className="metric-components">
          <div>Effort (E): {metrics.total_effort.toFixed(2)}</div>
          <div>Impact (I): {metrics.total_impact.toFixed(2)}</div>
          <div>Alignment (A): {metrics.total_alignment.toFixed(2)}</div>
          <div>Reward (R): {metrics.total_reward.toFixed(2)}</div>
          <div>Synergy (ΔC): {metrics.delta_value.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

function TeamPerformanceCard({ teamMetrics }) {
  return (
    <div className="dashboard-card team-performance-card">
      <h2>👥 Team Performance</h2>
      <div className="team-metrics-grid">
        {teamMetrics.map((team, index) => (
          <div key={index} className="team-metric-item">
            <h3>{team.team_name}</h3>
            <div className="team-scores">
              <div className="score">
                <label>Effort:</label>
                <span>{team.avg_effort.toFixed(2)}</span>
              </div>
              <div className="score">
                <label>Impact:</label>
                <span>{team.avg_impact.toFixed(2)}</span>
              </div>
              <div className="score">
                <label>Alignment:</label>
                <span>{team.avg_alignment.toFixed(2)}</span>
              </div>
              <div className="score">
                <label>Reward:</label>
                <span>{team.avg_reward.toFixed(2)}</span>
              </div>
              <div className="score synergy">
                <label>Team Synergy:</label>
                <span>{team.team_synergy.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperationalEfficiencyCard({ metrics }) {
  return (
    <div className="dashboard-card operational-card">
      <h2>⚙️ Operational Efficiency</h2>
      <div className="operational-metrics">
        <div className="metric-item">
          <h3>System Efficiency</h3>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{width: `${metrics.avg_efficiency}%`}}
            ></div>
          </div>
          <div className="value">{metrics.avg_efficiency.toFixed(2)}%</div>
        </div>
        <div className="metric-item">
          <h3>Culture Score</h3>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{width: `${metrics.avg_culture_score}%`}}
            ></div>
          </div>
          <div className="value">{metrics.avg_culture_score.toFixed(2)}%</div>
        </div>
        <div className="metric-item">
          <h3>Team Synergy</h3>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{width: `${metrics.avg_synergy}%`}}
            ></div>
          </div>
          <div className="value">{metrics.avg_synergy.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading dashboard data...</p>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <h2>⚠️ Error</h2>
      <p>{message}</p>
    </div>
  );
}

function Dashboard() {
  const [businessMetrics, setBusinessMetrics] = useState(null);
  const [teamPerformance, setTeamPerformance] = useState([]);
  const [operationalMetrics, setOperationalMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [business, teams, operational] = await Promise.all([
          ApiService.getBusinessMetrics(),
          ApiService.getTeamPerformance(),
          ApiService.getOperationalMetrics()
        ]);

        setBusinessMetrics(business);
        setTeamPerformance(teams);
        setOperationalMetrics(operational);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🎮 Podcast Empire Business Dashboard</h1>
      </div>
      <div className="dashboard-grid">
        <BusinessValueCard metrics={businessMetrics} />
        <TeamPerformanceCard teamMetrics={teamPerformance} />
        <OperationalEfficiencyCard metrics={operationalMetrics} />
      </div>
    </div>
  );
}

export default Dashboard; 