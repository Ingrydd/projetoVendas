const express = require('express');
const router = express.Router();
const { createPurchase, getUserPurchases, getPurchaseById } = require('../controllers/purchaseController');
const { verifyToken } = require('../middlewares/auth');

router.post('/', verifyToken, createPurchase);
router.get('/', verifyToken, getUserPurchases);
router.get('/:id', verifyToken, getPurchaseById);

module.exports = router;
