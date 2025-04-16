// Mock data for development
const mockData = {
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

class ApiService {
  async getBusinessMetrics() {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.businessMetrics);
      }, 500);
    });
  }

  async getTeamPerformance() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.teamPerformance);
      }, 500);
    });
  }

  async getOperationalMetrics() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.operationalMetrics);
      }, 500);
    });
  }
}

export default new ApiService(); 