const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/mail', require('./routes/api/mail'));


app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is up on ${PORT}`);
});
