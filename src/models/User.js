const mongoose = require('mongoose');
const sequelize = require('../config/database');

const User = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    isAdmin: {type: Boolean, require: true}
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Método para comparar senhas
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

module.exports = mongoose.model('User', User);