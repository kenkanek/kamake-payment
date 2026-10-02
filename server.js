const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const ZIBAL_MERCHANT = "6a7e0893252887bfd5c024db";
const ZIBAL_API = "https://gateway.zibal.ir/v1";

app.post('/api/payment/request', async (req, res) => {
    try {
        const { amount, orderId, callbackUrl } = req.body;
        const response = await axios.post(`${ZIBAL_API}/request`, {
            merchant: ZIBAL_MERCHANT,
            amount: amount,
            callbackUrl: callbackUrl,
            orderId: orderId
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/payment/verify', async (req, res) => {
    try {
        const { trackId } = req.query;
        const response = await axios.post(`${ZIBAL_API}/verify`, {
            merchant: ZIBAL_MERCHANT,
            trackId: trackId
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Payment server running on port ${PORT}`);
});
