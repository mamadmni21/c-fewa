import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Healthcheck endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'C-FEWA', owner: 'PT. Sepuh Trismatek Nusa' });
  });

  // AI Climate-Food Disaster Analysis API endpoint
  app.post('/api/ai-advisory', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: 'GEMINI_API_KEY is not configured on the server.' 
        });
      }

      const { role, location, rainfallMm, riverLevelM, cropType, userQuery } = req.body;

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
You are the C-FEWA (Climate-Food Early Warning & Action) AI Advisory Engine developed by PT. Sepuh Trismatek Nusa in partnership with UNICEF Venture Fund, e-Farmania, LaPaQ, PAGi, and Fellas Indonesia.

Analyze the following operational scenario and provide an urgent, highly actionable, role-differentiated advisory to protect food supply chain resilience and child nutrition:

Target Stakeholder Role: ${role || 'General Stakeholder'}
Target Location: ${location || 'Agritech Pilot Basin, West Java'}
Current Rainfall: ${rainfallMm || 195} mm
Current River Water Level: ${riverLevelM || 4.9} meters
Crop/Food Stock Focus: ${cropType || 'Unhusked Rice (Gabah) & MBG School Meals'}
User Query / Specific Concern: ${userQuery || 'What immediate stock repositioning and child nutrition safeguard measures should be executed in the next 12 hours?'}

Provide a structured, clear response formatted with concise bullet points under 3 sections:
1. 🌊 Immediate Flood Disaster Risk Evaluation
2. 🚚 Tactical Supply Chain / Stock Repositioning Directives
3. 👶 Child Nutrition & Community Protection Measures (PAGi / LaPaQ focus)
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error('Error in /api/ai-advisory:', error);
      res.status(500).json({ error: error.message || 'Failed to generate AI advisory' });
    }
  });

  // Vite development middleware or production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`C-FEWA PT. Sepuh Trismatek Nusa Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
