import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const NVIDIA_API_KEY = process.env.VITE_NVIDIA_API_KEY || process.env.NVIDIA_API_KEY;
const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch(NVIDIA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${NVIDIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: req.body.model || "meta/llama-3.1-8b-instruct",
        messages: req.body.messages,
        temperature: req.body.temperature || 0.2,
        top_p: req.body.top_p || 0.7,
        max_tokens: req.body.max_tokens || 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("NVIDIA API Error:", errorData);
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Backend Chat Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Indraam AI Server running on http://localhost:${PORT}`);
});
