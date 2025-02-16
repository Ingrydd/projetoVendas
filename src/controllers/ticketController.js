const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({message: 'Acesso negado! Somente admin pode criar ingressos!!'});
        }        

        const ticket = await Ticket.create(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({message: 'Erro ao criar ingresso', error});
    }
};

exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({message: 'Erro ao buscar ingressos', error});
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({message: 'Ingresso não encontrado!'});
        res.json(ticket);
    } catch (error) {
        res.status(500).json({message: 'Erro ao buscar ingresso', error});
    }
};

exports.updateTicket = async (req, res) => {
    try {
        if (!req.isAdmin) return res.status(403).json({message: 'Acesso negado!'});

        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ticket) return res.status(404).json({message: 'Ingresso não encontrado!'});
        res.json(ticket);
    } catch (error) {
        res.status(500).json({message: 'Erro ao atualizar ingresso', error});
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({message: 'Apenas administradores podem deletar ingressos!'});
        }

        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({message: 'Ingresso não encontrado!'});
        }

        res.status(200).json({message: 'Ingresso deletado com sucesso!'});
    } catch (error) {
        res.status(500).json({message: 'Erro ao deletar ingresso', error});
    }
};

