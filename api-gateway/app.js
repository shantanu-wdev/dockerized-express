const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const USER_SERVICE_URL = 'http://user-service:4000'; // Docker DNS

// Route: Forward all /users requests
app.use('/users', async (req, res) => {
    const path = req.originalUrl;
    const method = req.method.toLowerCase();

    try {
        const response = await axios({
            method,
            url: `${USER_SERVICE_URL}${path.replace('/users', '')}`,
            data: req.body,
        });
        res.status(response.status).send(response.data);
    } catch (err) {
        const status = err.response?.status || 500;
        const message = err.response?.data || 'Gateway Error';
        res.status(status).send(message);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});