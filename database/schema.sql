-- Devopstrio AVD Monitoring Pack
-- Core Observability & Telemetry Database Schema
-- Target: PostgreSQL 15+ (With TimeScaleDB compatibility)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Identity & Tenancy
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    azure_tenant_id VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'Operator', -- Admin, Operator, Executive
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Infrastructure Inventory
CREATE TABLE IF NOT EXISTS host_pools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    region VARCHAR(100) NOT NULL,
    type VARCHAR(50), -- Pooled, Personal
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS session_hosts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pool_id UUID REFERENCES host_pools(id),
    vm_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Unknown', -- Available, Draining, Offline
    ip_address VARCHAR(50),
    cpu_cores INT,
    memory_gb INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Telemetry & Metrics (Time-series)
CREATE TABLE IF NOT EXISTS metrics (
    id BIGSERIAL PRIMARY KEY,
    host_id UUID REFERENCES session_hosts(id),
    metric_name VARCHAR(100) NOT NULL, -- CPU_Util, Mem_Used, Login_Latency
    value FLOAT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID REFERENCES session_hosts(id),
    user_principal_name VARCHAR(255) NOT NULL,
    login_time TIMESTAMP WITH TIME ZONE NOT NULL,
    logout_time TIMESTAMP WITH TIME ZONE,
    login_duration_seconds INT,
    ux_score FLOAT, -- 0.0 - 1.0 (Calculated)
    client_version VARCHAR(50)
);

-- 4. Alerting & Incidents
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    resource_id UUID NOT NULL, -- Refers to host_id or pool_id
    alert_type VARCHAR(100) NOT NULL, -- HighLatency, HostOffline, DiskFull
    severity VARCHAR(20) DEFAULT 'Medium', -- Critical, High, Medium, Low
    status VARCHAR(20) DEFAULT 'Active', -- Active, Acknowledged, Resolved
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 5. Financial Telemetry
CREATE TABLE IF NOT EXISTS cost_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pool_id UUID REFERENCES host_pools(id),
    billing_period VARCHAR(20), -- e.g. 2026-04
    estimated_cost FLOAT NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Analytics & Forecasts
CREATE TABLE IF NOT EXISTS forecasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pool_id UUID REFERENCES host_pools(id),
    forecast_type VARCHAR(100), -- Concurrency, Spend
    data JSONB NOT NULL, -- Time-series array of predicted values
    prediction_window_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optimization & Time-Series Indexes
CREATE INDEX idx_metrics_timestamp ON metrics(timestamp);
CREATE INDEX idx_metrics_name ON metrics(metric_name);
CREATE INDEX idx_sessions_upn ON sessions(user_principal_name);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_severity ON alerts(severity);
