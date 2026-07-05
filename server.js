// Node.js Express Production Backend API Engine
// Run: npm install express pg dotenv cors helmet
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and Parsers Middleware
app.use(helmet());
app.use(cors({ origin: '*' })); // Custom restrict this in production config
app.use(express.json());

// Database Connection Pooling
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Mock OTP Verification Code Store (Simulated Gateway Node)
const ACTIVE_OTP_CACHE = new Map();

// API Endpoint 1: Generate & Dispatch OTP Code
app.post('/api/auth/send-otp', async (req, res) => {
    try {
        const { contact } = req.body;
        if (!contact) return res.status(400).json({ success: false, error: 'Contact identifier parameter missing' });
        
        // Static production verification bypass code assigned for validation
        const simulatedOtp = "1234";
        ACTIVE_OTP_CACHE.set(contact, simulatedOtp);
        
        return res.status(200).json({ success: true, message: 'OTP token cache update successful.' });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

// API Endpoint 2: Validate Verification Code Token
app.post('/api/auth/verify-otp', async (req, res) => {
    try {
        const { contact, token } = req.body;
        const targetToken = ACTIVE_OTP_CACHE.get(contact);
        
        if (targetToken && token === targetToken) {
            ACTIVE_OTP_CACHE.delete(contact); // Flush cache after usage
            return res.status(200).json({ success: true, token: 'JWT_MOCK_PRODUCTION_SESSION_KEY' });
        }
        return res.status(401).json({ success: false, error: 'Verification token mismatch.' });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

// API Endpoint 3: Fetch Policies by Dynamic Filter Selection
app.get('/api/policies/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const queryText = 'SELECT * FROM policies WHERE category = $1 AND is_active = TRUE ORDER BY plan_number ASC';
        const result = await pool.query(queryText, [category]);
        return res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

// API Endpoint 4: Insert Transferred Client Lead Track Object
app.post('/api/leads', async (req, res) => {
    try {
        const { contact, intent, scheme } = req.body;
        if (!contact || !intent || !scheme) return res.status(400).json({ success: false, error: 'Incomplete parameters mapped.' });
        
        const queryText = 'INSERT INTO leads (client_contact, strategic_intent, selected_plan) VALUES ($1, $2, $3) RETURNING *';
        const result = await pool.query(queryText, [contact, intent, scheme]);
        return res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

// API Endpoint 5: Fetch All Logged Records (Admin Workspace Ledger Only)
app.get('/api/admin/leads', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM leads ORDER BY timestamp DESC';
        const result = await pool.query(queryText);
        return res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

// API Endpoint 6: Modify Status Tracking Lifecycle Mode Variable
app.put('/api/admin/leads/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const queryText = 'UPDATE leads SET lifecycle_status = $1 WHERE id = $2 RETURNING *';
        const result = await pool.query(queryText, [status, id]);
        return res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => console.log(`Production API Server operational on framework port ${PORT}`));
