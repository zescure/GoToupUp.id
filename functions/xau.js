export async function handler(event, context) {
  try {
    // Panggil API Metals-API
    const API_KEY = 'API_KEY_KAMU'; 
    const res = await fetch(`https://metals-api.com/api/latest?access_key=${API_KEY}&base=USD&symbols=XAU`);
    const data = await res.json();
    
    const xauUSD = data.rates.XAU; // harga per troy ounce dalam USD
    const USD_TO_IDR = 16000; // bisa bikin dinamis juga
    const pricePerGramIDR = (xauUSD * USD_TO_IDR) / 31.1035;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ pricePerGramIDR })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
