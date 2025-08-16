// netlify/functions/cekid.js
const fetch = require("node-fetch");
const md5 = require("md5");

exports.handler = async (event) => {
  try {
    const { gameId, serverId } = JSON.parse(event.body);

    const USERNAME = "secacaWX7vrD";
    const API_KEY = "dev-e17b56e0-3bbd-11ec-8453-bf33d0e";

    const signature = md5(USERNAME + API_KEY + gameId);

    const response = await fetch("https://api.digiflazz.com/v1/cek-pelanggan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: USERNAME,
        buyer_sku_code: "MOBILELEGENDS",
        customer_no: gameId + serverId,
        sign: signature
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
