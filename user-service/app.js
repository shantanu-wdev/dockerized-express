const express = require('express');
const usersRoutes = require('./routes/users');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', usersRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});