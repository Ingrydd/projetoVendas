const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});
        if (!user) return res.status(404).json({message: 'Usuário não encontrado!'});

        const validPassword = await user.comparePassword(password);
        if (!validPassword) return res.status(401).json({message: 'Senha inválida! Tente novamente.'});

        const token = generateToken(user);
        res.json({token});
    } catch (error) {
        res.status(500).json({message: 'Erro ao realizar login!', error});
    }
});

module.exports = router;
