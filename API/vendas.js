export default async function handler(req, res) {
  // URL do seu Google Apps Script (já com o header CORS adicionado)
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxvpN55hlUjJWf6Xe3vyu6RqLWIn0LDhmu3YBVoNXsjl1M3ACHKOpxwRxAzxMPMoWyt/exec';

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL + '?cb=' + Date.now(), {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    });
    const data = await response.json();
    // Adiciona headers CORS para o front-end
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados da planilha' });
  }
}