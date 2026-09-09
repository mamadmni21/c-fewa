export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  return res.status(200).json({
    status: 'ok',
    app: 'C-FEWA',
    owner: 'Fellas Indonesia',
    platform: 'Vercel Serverless',
    timestamp: new Date().toISOString()
  });
}
