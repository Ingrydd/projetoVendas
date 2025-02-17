const express = require('express');
const cors = require('cors');
const mustacheExpress = require('mustache-express');
const connectDB = require('./config/database');

const app = express();

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração do Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

const authRoutes = require('./routes/auth');
const purchaseRoutes = require('./routes/purchase');
const ticketRoutes = require('./routes/ticket');
const userRoutes = require('./routes/user');

app.use('/auth', authRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/tickets', ticketRoutes);
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});