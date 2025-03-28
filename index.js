const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/download', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No TikTok URL provided' });

  try {
    const response = await axios.get('https://tiktok-download-without-watermark.p.rapidapi.com/analysis', {
      params: { url },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '4e08bc9c2mshd8c96c070e09ddep142c1fjsn1e3dcaa57ad1',
        'X-RapidAPI-Host': 'tiktok-download-without-watermark.p.rapidapi.com'
      }
    });
    res.json({ mp4: response.data.data.play });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
