const express = require('express');
const { createTicket, getTickets, getTicketById, updateTicket, deleteTicket } = require('../controllers/ticketController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

const router = express.Router();

router.post('/', verifyToken, isAdmin, createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.put('/:id', verifyToken, isAdmin, updateTicket);
router.delete('/:id', verifyToken, isAdmin, deleteTicket);

module.exports = router;
