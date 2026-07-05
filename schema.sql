-- PostgreSQL Production Database Schema
-- Target Environment: Supabase, Neon.tech, AWS RDS, or local PostgreSQL v15+

CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS policies (
    id SERIAL PRIMARY KEY,
    plan_number VARCHAR(10) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'protection', 'income', 'endowment', 'specialized'
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    official_link TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    client_contact VARCHAR(150) NOT NULL,
    strategic_intent VARCHAR(100) NOT NULL,
    selected_plan VARCHAR(150) NOT NULL,
    lifecycle_status VARCHAR(50) DEFAULT 'New', -- 'New', 'Contacted', 'Policy Issued'
    notes TEXT
);

-- Optimized Indices for Admin Panel Read Speed
CREATE INDEX IF NOT EXISTS idx_leads_timestamp ON leads(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_policies_category ON policies(category) WHERE is_active = TRUE;

-- Seed Data: Complete Flagship LIC Directory Mapping
INSERT INTO policies (plan_number, category, name, description, official_link) VALUES
('954', 'protection', 'LIC''s New Tech-Term', 'Premium online-exclusive pure risk mitigation framework engineered for aggressive protection thresholds.', 'https://licindia.in/lics-tech-term-plan-no.-854-uin-512n333v01-'),
('955', 'protection', 'LIC''s New Jeevan Amar', 'Flexible offline protection shield offering specific non-smoker financial pricing structures.', 'https://licindia.in/lic-s-new-jeevan-amar-plan-no.-955-uin-512n332v01-'),
('876', 'protection', 'LIC''s Digi Term', 'Modern high-speed electronic risk management architecture built for young enterprise workers.', 'https://licindia.in/insurance-plan'),
('875', 'protection', 'LIC''s Yuva Term', 'Early-career protection layout optimized with light initial premium constraints.', 'https://licindia.in/insurance-plan'),
('859', 'protection', 'LIC''s Saral Jeevan Bima', 'Standardized regulatory pure risk policy template built on standard entry parameters.', 'https://licindia.in/lic-s-saral-jeevan-bima-plan-no-859-uin-512n340v01-'),
('771', 'income', 'LIC''s Jeevan Utsav', 'Flagship whole-life legacy framework guaranteeing a persistent 10% annual survival payout for life.', 'https://licindia.in/lic-s-jeevan-utsav'),
('745', 'income', 'LIC''s Jeevan Umang', 'Classic century-long generational asset plan tracking steady 8% lifetime survival dividends.', 'https://licindia.in/lic-s-jeevan-umang-plan-no.-945-uin-512n336v01-'),
('715', 'endowment', 'LIC''s New Jeevan Anand', 'The classic dual-risk matrix: locks a large maturity settlement, keeping risk shield active for free for life.', 'https://licindia.in/lic-s-new-jeevan-anand-plan-no-915-uin-512n279v02-'),
('736', 'endowment', 'LIC''s Jeevan Labh', 'Limited-pay accumulation policy maximizing overall capitalization yield metrics over compressed windows.', 'https://licindia.in/lic-s-jeevan-labh-plan-no.-936-uin-512n304v02-'),
('733', 'endowment', 'LIC''s Jeevan Lakshya', 'Perfect parental safeguard structure: waives upcoming funding upon demise while paying family annual income.', 'https://licindia.in/lic-s-jeevan-lakshya-plan-no.-933-uin-512n297v02-'),
('714', 'endowment', 'LIC''s New Endowment Plan', 'Traditional standard capital appreciation asset providing steady cumulative compound growth.', 'https://licindia.in/lic-s-new-endowment-plan-plan-no-914-uin-512n277v02-'),
('774', 'specialized', 'LIC''s Amritbaal', 'Elite childhood target platform built with accelerated guaranteed balance multipliers.', 'https://licindia.in/lic-s-amritbaal-plan-no.-874-uin-512n365v01-'),
('873', 'specialized', 'LIC''s Index Plus', 'Market-linked capital engine mirroring NIFTY index asset distributions with life coverage.', 'https://licindia.in/lic-s-index-plus-plan-no.-873-uin-512l364v01-'),
('748', 'specialized', 'LIC''s Bima Shree', 'High-net-worth liquidity distribution mechanism delivering structured periodic survival returns.', 'https://licindia.in/lic-s-bima-shree-plan-no.-948-uin-512n320v02-'),
('720', 'specialized', 'LIC''s New Money Back - 20 Yrs', 'Liquidity-centric asset architecture distributing exactly 20% of base protection every 5th year.', 'https://licindia.in/lic-s-new-money-back-plan-20-years-plan-no-920');
