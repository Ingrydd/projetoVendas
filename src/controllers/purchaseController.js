const Purchase = require('../models/Purchase');
const Ticket = require('../models/Ticket');

exports.createPurchase = async (req, res) => {
    try {
        const { tickets } = req.body;
        let totalPrice = 0;

        for (let item of tickets) {
            const ticket = await Ticket.findById(item.ticket);
            if (!ticket) {
                return res.status(404).json({ message: `Ingresso com ID ${item.ticket} não encontrado!` });
            }
            if (ticket.quantity < item.quantity){
                return res.status(400).json({ message: `Estoque insuficiente para ${ticket.name}!` });
            }

            ticket.quantity -= item.quantity;
            await ticket.save();
            
            totalPrice += ticket.price * item.quantity;
        }

        for (let item of tickets) {
            await Ticket.findByIdAndUpdate(item.ticket, {$inc: {quantity: - item.quantity }});
        }

        const purchase = await Purchase.create({
            user: req.userId,
            tickets,
            totalPrice
        });

        res.status(201).json(purchase);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar compra', error });
    }
};

exports.getUserPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({ user: req.userId }).populate('tickets.ticket');
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar compras', error });
    }
};

exports.getPurchaseById = async (req, res) => {
    try {
        const purchase = await Purchase.findById(req.params.id).populate('tickets.ticket');
        if (!purchase) return res.status(404).json({ message: 'Compra não encontrada' });

        if (purchase.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        res.json(purchase);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar compra', error });
    }
};

exports.deletePurchase = async (req, res) => {
    return res.status(403).json({ message: 'Compras não podem ser canceladas após a conclusão!' });
};

