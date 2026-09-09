import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please add GEMINI_API_KEY in your Vercel Project Settings > Environment Variables.'
      });
    }

    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // use as is
      }
    }

    const { role, location, rainfallMm, riverLevelM, cropType, userQuery } = body || {};

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
You are the C-FEWA (Climate-Food Early Warning & Action) AI Advisory Engine developed by Fellas Indonesia in partnership with UNICEF Venture Fund, PT. Sepuh Trismatek Nusa (SEPUH), Kemaih (LaPaQ/PAGi), and CISDI.

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

    return res.status(200).json({ result: response.text });
  } catch (error: any) {
    console.error('Error in /api/ai-advisory (Vercel Serverless):', error);
    return res.status(500).json({ error: error.message || 'Failed to generate AI advisory' });
  }
}
