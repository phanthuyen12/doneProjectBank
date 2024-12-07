const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');

// In your router (crontransaction.js)
router.get('/', async (req, res, next) => {
    try {
        // Here, you need to pass req and res to the controller method
        await TransactionController.getAndSaveTransactions(req, res);
    } catch (error) {
        console.log('Get category list error', error.message);
        res.status(500).json({status: false, data: error.message});
    }
});

module.exports = router;