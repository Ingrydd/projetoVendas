const mongoose = require('mongoose');
const Purchase = require('../models/Purchase');
const Ticket = require('../models/Ticket');

const createPurchase = async (req, res) => { 
    let updatedTickets = [];

    try {
        console.log("Usuário autenticado na compra:", req.user);

        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: "Usuário não autenticado!" });
        }

        const userId = new mongoose.Types.ObjectId(req.user._id);
        console.log("ID do usuário convertido:", userId);

        const { tickets } = req.body;
        let totalPrice = 0;

        for (let item of tickets) {
            const ticket = await Ticket.findById(item.ticket);
            if (!ticket) {
                return res.status(404).json({ message: `Ingresso com ID ${item.ticket} não encontrado!` });
            }
            if (ticket.quantity < item.quantity) {
                return res.status(400).json({ message: `Estoque insuficiente para ${ticket.name}!` });
            }

            updatedTickets.push({ ticket, originalQuantity: ticket.quantity });

            ticket.quantity -= item.quantity;
            await ticket.save();

            totalPrice += ticket.price * item.quantity;
        }

        const purchase = new Purchase({
            user: userId, 
            tickets,
            totalPrice
        });

        await purchase.save();
        res.status(201).json(purchase);
    } catch (error) {
        console.error("Erro ao processar a compra:", error);

        for (let { ticket, originalQuantity } of updatedTickets) {
            ticket.quantity = originalQuantity;
            await ticket.save();
        }

        res.status(500).json({ message: "Erro ao processar a compra!", error });
    }
};

const getUserPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({ user: req.user._id }).populate('tickets.ticket');
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar compras', error });
    }
};

const getPurchaseById = async (req, res) => {
    try {
        const purchase = await Purchase.findById(req.params.id).populate('tickets.ticket');
        if (!purchase) return res.status(404).json({ message: 'Compra não encontrada' });

        if (purchase.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        res.json(purchase);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar compra', error });
    }
};

module.exports = {
    createPurchase,
    getUserPurchases,
    getPurchaseById
};
