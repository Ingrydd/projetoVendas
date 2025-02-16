const express = require('express');
const { createTicket, getTickets, getTicketById, updateTicket, deleteTicket } = require('../controllers/ticketController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/', verifyToken, createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.put('/:id', verifyToken, updateTicket);
router.delete('/:id', verifyToken, deleteTicket);

module.exports = router;
