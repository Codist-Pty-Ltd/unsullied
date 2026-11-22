const express = require('express');
const quoteController = require('../controllers/quoteController');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// Register routes - order matters! Specific routes before parameterized ones
router.get('/', requireAdmin, quoteController.getAllQuotes.bind(quoteController));
router.get('/report', requireAdmin, quoteController.getDailyReport.bind(quoteController));
router.get('/bookings', requireAdmin, quoteController.getBookings.bind(quoteController));
router.post('/', quoteController.createQuote.bind(quoteController));
router.get('/:id', requireAdmin, quoteController.getQuoteById.bind(quoteController));
router.patch('/:id/status', requireAdmin, quoteController.updateQuoteStatus.bind(quoteController));
router.post('/:id/job-card', requireAdmin, quoteController.submitJobCard.bind(quoteController));
router.post('/:id/payment', quoteController.recordPayment.bind(quoteController));

module.exports = router;
