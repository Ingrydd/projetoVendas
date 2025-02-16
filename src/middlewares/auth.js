const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.JWT_SECRET || 'secretkey';

const generateToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({message: 'Nenhum token fornecido!'});

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({message: 'Falha ao autenticar o token!'});
        req.userId = decoded.id;
        req.isAdmin = decoded.isAdmin;
        next();
    });
};

module.exports = {generateToken, verifyToken};
