const express = require('express');
const { createPurchase, getUserPurchases, getPurchaseById } = require('../controllers/purchaseController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/', verifyToken, createPurchase);
router.get('/', verifyToken, getUserPurchases);
router.get('/:id', verifyToken, getPurchaseById);

module.exports = router;
