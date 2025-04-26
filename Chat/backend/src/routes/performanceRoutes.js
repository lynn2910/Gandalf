// Dans Chat/backend/src/routes/performanceRoutes.js

const express = require('express');
const router = express.Router();
const {createClient} = require('redis');
const User = require('../models/User');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.connect().catch(console.error);

// Route AVEC Redis
router.get('/users-with-redis', async (req, res) => {
    try {
        const cachedUsers = await redisClient.get('all_users');

        if (cachedUsers) {
            const id = Date.now();
            console.time('redis-response' + id);
            const users = JSON.parse(cachedUsers);
            console.timeEnd('redis-response' + id);
            return res.json({
                source: 'redis',
                data: users
            });
        }

        console.time('db-cache' + id);
        const users = await User.find({}).select('-password');

        await redisClient.setEx('all_users', 3600, JSON.stringify(users));
        console.timeEnd('db-cache' + id);

        res.json({
            source: 'database',
            data: users
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Route SANS Redis
router.get('/users-without-redis', async (req, res) => {
    try {
        const id = Date.now();
        console.time('db-direct' + id);
        const users = await User.find({}).select('-password');
        console.timeEnd('db-direct' + id);

        res.json({
            source: 'database',
            data: users
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;