import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class DatabaseService {
  constructor() {
    this.pool = new Pool({
      user: process.env.REACT_APP_DB_USER || process.env.DB_USER,
      host: process.env.REACT_APP_DB_HOST || process.env.DB_HOST,
      database: process.env.REACT_APP_DB_NAME || process.env.DB_NAME,
      password: process.env.REACT_APP_DB_PASSWORD || process.env.DB_PASSWORD,
      port: process.env.REACT_APP_DB_PORT || process.env.DB_PORT,
    });

    // Test database connection
    this.testConnection();
  }

  async testConnection() {
    try {
      const client = await this.pool.connect();
      console.log('Successfully connected to the database');
      client.release();
    } catch (err) {
      console.error('Database connection error:', err.message);
      // In development, provide mock data if database connection fails
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock data in development mode');
        this.useMockData = true;
      }
    }
  }

  // Mock data for development
  mockData = {
    businessMetrics: {
      total_effort: 85.5,
      total_impact: 92.3,
      total_alignment: 88.7,
      total_reward: 75.0,
      delta_value: 15.5,
      operational_efficiency: 87.5,
      culture_score: 82.0
    },
    teamPerformance: [
      {
        team_name: "Content Production",
        avg_effort: 88.5,
        avg_impact: 92.0,
        avg_alignment: 85.5,
        avg_reward: 78.0,
        team_synergy: 12.5
      },
      {
        team_name: "Marketing",
        avg_effort: 90.0,
        avg_impact: 87.5,
        avg_alignment: 89.0,
        avg_reward: 82.0,
        team_synergy: 14.0
      }
    ],
    operationalMetrics: {
      avg_efficiency: 87.5,
      avg_culture_score: 82.0,
      avg_synergy: 13.5
    }
  };

  // Team Metrics
  async getTeamMetrics(teamId) {
    if (this.useMockData) {
      return this.mockData.teamPerformance[0];
    }

    const query = `
      SELECT 
        t.*,
        (t.efficiency_score * t.impact_score * t.alignment_score + t.reward_score) as job_score,
        t.delta_value as synergy_score
      FROM teams t
      WHERE t.id = $1
    `;
    const result = await this.pool.query(query, [teamId]);
    return result.rows[0];
  }

  // Individual Performance
  async getMemberMetrics(memberId) {
    const query = `
      SELECT 
        tm.*,
        (tm.effort_score * tm.impact_score * tm.alignment_score + tm.reward_score) as job_score
      FROM team_members tm
      WHERE tm.id = $1
    `;
    const result = await this.pool.query(query, [memberId]);
    return result.rows[0];
  }

  // Show Performance
  async getShowMetrics(showId) {
    const query = `
      SELECT s.*, m.*
      FROM shows s
      LEFT JOIN metrics m ON m.show_id = s.id
      WHERE s.id = $1
      ORDER BY m.recorded_at DESC
      LIMIT 1
    `;
    const result = await this.pool.query(query, [showId]);
    return result.rows[0];
  }

  // Quest Tracking
  async getActiveQuests(teamId) {
    const query = `
      SELECT 
        q.*,
        json_agg(qr.*) as rewards
      FROM quests q
      LEFT JOIN quest_rewards qr ON qr.quest_id = q.id
      WHERE q.team_id = $1
      GROUP BY q.id
    `;
    const result = await this.pool.query(query, [teamId]);
    return result.rows;
  }

  // Business Value Calculation
  async getBusinessMetrics() {
    if (this.useMockData) {
      return this.mockData.businessMetrics;
    }

    const query = `
      SELECT 
        bm.*,
        (bm.total_effort * bm.total_impact * bm.total_alignment + bm.total_reward + bm.delta_value) 
        as total_business_value
      FROM business_metrics bm
      ORDER BY bm.metric_date DESC
      LIMIT 1
    `;
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  // Operational Efficiency
  async getOperationalMetrics() {
    if (this.useMockData) {
      return this.mockData.operationalMetrics;
    }

    const query = `
      SELECT 
        AVG(operational_efficiency) as avg_efficiency,
        AVG(culture_score) as avg_culture_score,
        AVG(delta_value) as avg_synergy
      FROM business_metrics
      WHERE metric_date >= NOW() - INTERVAL '30 days'
    `;
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  // Team Performance Aggregation
  async getTeamPerformanceMatrix() {
    if (this.useMockData) {
      return this.mockData.teamPerformance;
    }

    const query = `
      SELECT 
        t.name as team_name,
        AVG(tm.effort_score) as avg_effort,
        AVG(tm.impact_score) as avg_impact,
        AVG(tm.alignment_score) as avg_alignment,
        AVG(tm.reward_score) as avg_reward,
        t.delta_value as team_synergy
      FROM teams t
      LEFT JOIN team_members tm ON tm.team_id = t.id
      GROUP BY t.id, t.name
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  // Close the pool
  async close() {
    if (!this.useMockData) {
      await this.pool.end();
    }
  }
}

export default new DatabaseService(); 