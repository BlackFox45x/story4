-- Teams and Departments
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    efficiency_score DECIMAL(5,2), -- E(x)
    impact_score DECIMAL(5,2),     -- I(x)
    alignment_score DECIMAL(5,2),   -- A(x)
    reward_score DECIMAL(5,2),      -- R(x)
    delta_value DECIMAL(5,2)        -- ΔValue(C)
);

-- Team Members
CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams(id),
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100),
    effort_score DECIMAL(5,2),      -- E(x)
    impact_score DECIMAL(5,2),      -- I(x)
    alignment_score DECIMAL(5,2),    -- A(x)
    reward_score DECIMAL(5,2)        -- R(x)
);

-- Shows/Projects
CREATE TABLE shows (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    team_id INTEGER REFERENCES teams(id),
    episodes INTEGER DEFAULT 0,
    avg_downloads INTEGER DEFAULT 0,
    trend VARCHAR(20),
    health_score DECIMAL(5,2),
    opportunity TEXT
);

-- Metrics
CREATE TABLE metrics (
    id SERIAL PRIMARY KEY,
    show_id INTEGER REFERENCES shows(id),
    metric_type VARCHAR(50),
    current_value DECIMAL(10,2),
    target_value DECIMAL(10,2),
    change_rate DECIMAL(5,2),
    status VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quests/Objectives
CREATE TABLE quests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    quest_type VARCHAR(20), -- 'primary' or 'side'
    progress DECIMAL(5,2),
    deadline TIMESTAMP,
    urgency VARCHAR(20),
    team_id INTEGER REFERENCES teams(id)
);

-- Quest Rewards
CREATE TABLE quest_rewards (
    id SERIAL PRIMARY KEY,
    quest_id INTEGER REFERENCES quests(id),
    reward_type VARCHAR(50),
    reward_value TEXT,
    xp_value INTEGER
);

-- Business Value Metrics
CREATE TABLE business_metrics (
    id SERIAL PRIMARY KEY,
    metric_date DATE,
    total_effort DECIMAL(10,2),     -- Σ E(x)
    total_impact DECIMAL(10,2),     -- Σ I(x)
    total_alignment DECIMAL(10,2),   -- Σ A(x)
    total_reward DECIMAL(10,2),      -- Σ R(x)
    delta_value DECIMAL(10,2),       -- ΔValue(C)
    operational_efficiency DECIMAL(5,2),
    culture_score DECIMAL(5,2)
); 