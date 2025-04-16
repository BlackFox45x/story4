import React, { useState } from 'react';
import './Dashboard.css';

// Mock data based on the integrated plans
const productionData = {
  preProduction: {
    strategicPlanning: {
      tasks: [
        { name: "Theme Development", hours: 4, cost: 104, status: "completed" },
        { name: "Audience Persona Creation", hours: 3, cost: 78, status: "in progress" },
        { name: "Format Testing", hours: 4, cost: 104, status: "pending" },
        { name: "KPI Definition", hours: 2, cost: 52, status: "completed" }
      ],
      progress: 75
    },
    contentCalendar: {
      tasks: [
        { name: "Episode Theme Mapping", hours: 3, cost: 78, status: "completed" },
        { name: "Guest Matrix Creation", hours: 2, cost: 52, status: "in progress" },
        { name: "Content Flow Planning", hours: 3, cost: 78, status: "in progress" },
        { name: "Resource Allocation", hours: 2, cost: 52, status: "pending" }
      ],
      progress: 60
    },
    guestManagement: {
      tasks: [
        { name: "Prospect List Development", hours: 2, cost: 52, status: "completed" },
        { name: "Outreach Campaign", hours: 3, cost: 78, status: "in progress" },
        { name: "Booking System Setup", hours: 2, cost: 52, status: "completed" },
        { name: "Guest Packet Preparation", hours: 4, cost: 104, status: "in progress" }
      ],
      progress: 70
    }
  },
  productionWorkflow: {
    setup: {
      timeline: [
        { phase: "Initial Setup", duration: "1 hour", tasks: [
          "Site survey and planning (15min)",
          "Power system deployment (15min)",
          "Tent assembly (30min)",
          "Basic infrastructure (15min)"
        ]},
        { phase: "Technical Setup", duration: "1 hour", tasks: [
          "Audio system installation (20min)",
          "Video system setup (20min)",
          "Lighting configuration (20min)"
        ]},
        { phase: "Environment & Testing", duration: "1 hour", tasks: [
          "Climate control setup (20min)",
          "Acoustic treatment (20min)",
          "System testing (20min)"
        ]},
        { phase: "Final Preparation", duration: "1 hour", tasks: [
          "Guest area preparation (20min)",
          "Final technical checks (20min)",
          "Backup systems verification (20min)"
        ]}
      ],
      progress: 85
    },
    technicalSettings: {
      audio: {
        sampleRate: "48kHz",
        bitDepth: "24-bit",
        format: "WAV",
        backup: "MP3 320kbps"
      },
      video: {
        resolution: "4K (3840×2160)",
        frameRate: "30fps",
        codec: "H.264",
        bitrate: "100Mbps"
      },
      lighting: {
        keyLight: "5600K",
        fillLight: "5600K at 50%",
        backLight: "3200K at 30%"
      }
    }
  },
  qualityControl: {
    audioMetrics: {
      voiceClarity: { target: "-12dB to -6dB", current: "-8dB", status: "optimal" },
      backgroundNoise: { target: "< -60dB", current: "-62dB", status: "optimal" },
      dynamicRange: { target: "12-18dB", current: "15dB", status: "optimal" }
    },
    videoMetrics: {
      resolution: { target: "4K", current: "4K", status: "optimal" },
      frameRate: { target: "30fps ±0.1%", current: "30fps", status: "optimal" },
      colorAccuracy: { target: "ΔE ≤ 2.0", current: "ΔE 1.8", status: "optimal" }
    },
    contentMetrics: {
      segmentPacing: { target: "8-12 min", current: "10 min", status: "optimal" },
      infoDensity: { target: "3-4 points/min", current: "3.5", status: "optimal" },
      engagementDrops: { target: "< 5%", current: "4.2%", status: "optimal" }
    }
  },
  equipment: {
    mainGear: [
      { name: "Rodecaster Pro", status: "operational", lastMaintenance: "2024-03-01" },
      { name: "Owl Camera", status: "operational", lastMaintenance: "2024-03-01" },
      { name: "LED Lighting Kit", status: "operational", lastMaintenance: "2024-02-15" },
      { name: "EcoFlow Power System", status: "operational", lastMaintenance: "2024-02-28" }
    ],
    backupSystems: [
      { name: "Backup Audio Recorder", status: "standby", lastTest: "2024-03-10" },
      { name: "Emergency Power Supply", status: "standby", lastTest: "2024-03-10" },
      { name: "Backup Camera", status: "standby", lastTest: "2024-03-05" }
    ]
  }
};

function StatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-500';
      case 'in progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'optimal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <span className={`status-badge ${getStatusColor(status)}`}>
      {status.toUpperCase()}
    </span>
  );
}

function PreProductionSection({ data }) {
  return (
    <div className="dashboard-card">
      <h2>🎯 Pre-Production Tasks</h2>
      <div className="pre-production-grid">
        {Object.entries(data).map(([category, info]) => (
          <div key={category} className="category-card">
            <h3>{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${info.progress}%` }}></div>
            </div>
            <div className="tasks-list">
              {info.tasks.map((task, index) => (
                <div key={index} className="task-item">
                  <div className="task-header">
                    <span>{task.name}</span>
                    <StatusBadge status={task.status} />
                  </div>
                  <div className="task-details">
                    <span>{task.hours} hours</span>
                    <span>${task.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductionWorkflowSection({ data }) {
  return (
    <div className="dashboard-card">
      <h2>⚡ Production Workflow</h2>
      <div className="workflow-grid">
        <div className="setup-timeline">
          <h3>Setup Timeline</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${data.setup.progress}%` }}></div>
          </div>
          {data.setup.timeline.map((phase, index) => (
            <div key={index} className="phase-card">
              <h4>{phase.phase} ({phase.duration})</h4>
              <ul>
                {phase.tasks.map((task, taskIndex) => (
                  <li key={taskIndex}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="technical-settings">
          <h3>Technical Settings</h3>
          <div className="settings-grid">
            {Object.entries(data.technicalSettings).map(([category, settings]) => (
              <div key={category} className="settings-card">
                <h4>{category.toUpperCase()}</h4>
                <ul>
                  {Object.entries(settings).map(([key, value]) => (
                    <li key={key}>
                      <span>{key}:</span> {value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QualityControlSection({ data }) {
  return (
    <div className="dashboard-card">
      <h2>🎯 Quality Control Metrics</h2>
      <div className="metrics-grid">
        {Object.entries(data).map(([category, metrics]) => (
          <div key={category} className="metrics-card">
            <h3>{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
            <div className="metrics-list">
              {Object.entries(metrics).map(([metric, values]) => (
                <div key={metric} className="metric-item">
                  <div className="metric-header">
                    <span>{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <StatusBadge status={values.status} />
                  </div>
                  <div className="metric-values">
                    <span>Target: {values.target}</span>
                    <span>Current: {values.current}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EquipmentSection({ data }) {
  return (
    <div className="dashboard-card">
      <h2>🔧 Equipment Status</h2>
      <div className="equipment-grid">
        <div className="main-gear">
          <h3>Main Equipment</h3>
          <div className="gear-list">
            {data.mainGear.map((item, index) => (
              <div key={index} className="gear-item">
                <div className="gear-header">
                  <span>{item.name}</span>
                  <StatusBadge status={item.status} />
                </div>
                <div className="gear-details">
                  Last Maintenance: {item.lastMaintenance}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="backup-systems">
          <h3>Backup Systems</h3>
          <div className="gear-list">
            {data.backupSystems.map((item, index) => (
              <div key={index} className="gear-item">
                <div className="gear-header">
                  <span>{item.name}</span>
                  <StatusBadge status={item.status} />
                </div>
                <div className="gear-details">
                  Last Test: {item.lastTest}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductionDashboard() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="production-dashboard">
      <div className="dashboard-header">
        <h1>🎬 Production Control Center</h1>
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`tab-button ${activeTab === 'pre' ? 'active' : ''}`}
            onClick={() => setActiveTab('pre')}
          >
            Pre-Production
          </button>
          <button 
            className={`tab-button ${activeTab === 'production' ? 'active' : ''}`}
            onClick={() => setActiveTab('production')}
          >
            Production
          </button>
          <button 
            className={`tab-button ${activeTab === 'quality' ? 'active' : ''}`}
            onClick={() => setActiveTab('quality')}
          >
            Quality Control
          </button>
          <button 
            className={`tab-button ${activeTab === 'equipment' ? 'active' : ''}`}
            onClick={() => setActiveTab('equipment')}
          >
            Equipment
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {(activeTab === 'all' || activeTab === 'pre') && (
          <PreProductionSection data={productionData.preProduction} />
        )}
        {(activeTab === 'all' || activeTab === 'production') && (
          <ProductionWorkflowSection data={productionData.productionWorkflow} />
        )}
        {(activeTab === 'all' || activeTab === 'quality') && (
          <QualityControlSection data={productionData.qualityControl} />
        )}
        {(activeTab === 'all' || activeTab === 'equipment') && (
          <EquipmentSection data={productionData.equipment} />
        )}
      </div>
    </div>
  );
}

export default ProductionDashboard; 