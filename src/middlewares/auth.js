const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'secretkey';

const generateToken = (user) => {
    return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '1h' });
};

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("Token recebido:", token); 

    if (!token) return res.status(401).json({ message: "Token não fornecido" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Token verificado com sucesso:", decoded); 
        req.user = { _id: decoded.id, isAdmin: decoded.isAdmin };
        console.log("Usuário autenticado:", req.user);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}

const isAdmin = (req, res, next) => {
    console.log("Usuário autenticado:", req.user); 

    if (!req.user || !req.user.isAdmin) {
        console.log("Acesso negado! Usuário não é admin:", req.user); 
        return res.status(403).json({ message: "Acesso negado! Apenas para administradores!!!" });
    }
    console.log("Acesso permitido para admin:", req.user);
    next();
};

module.exports = { generateToken, verifyToken, isAdmin };
