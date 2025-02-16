const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/auth');

exports.createUser = async (req, res) => {
    try {
      const { username, password, isAdmin } = req.body;
  
      if (!password) {
        return res.status(400).json({ message: "A senha é obrigatória!" });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const user = await User.create({ username, password: hashedPassword, isAdmin });
  
      res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ message: "Erro ao criar usuário", error: error.message });
    }
  };
  

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({message: 'Erro ao buscar usuários', error});
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({message: 'Usuário não encontrado!'});
        res.json(user);
    } catch (error) {
        res.status(500).json({message: 'Erro ao buscar usuário', error});
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, isAdmin } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { username, isAdmin }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({message: 'Erro ao atualizar usuário!', error});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuário deletado com sucesso!!!' });
    } catch (error) {
        res.status(500).json({message: 'Erro ao deletar usuário', error});
    }
};
