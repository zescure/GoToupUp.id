// netlify/functions/createPayment.js
const fetch = require("node-fetch");
const crypto = require("crypto");

exports.handler = async (event) => {
  try {
    const { amount, email, product } = JSON.parse(event.body);

    const merchantCode = "DS24540";
    const apiKey = "77e34f016f7db50b29b2510ea7c04879"; // Sandbox API Key lu
    const merchantOrderId = "ORD" + Date.now();
    const signature = crypto
      .createHash("md5")
      .update(merchantCode + merchantOrderId + amount + apiKey)
      .digest("hex");

    const payload = {
      merchantCode,
      paymentAmount: amount,
      paymentMethod: "VC", // bisa diganti ke "QRIS" kalo udah aktif
      merchantOrderId,
      productDetails: product,
      email,
      callbackUrl: "https://zestore.netlify.app/.netlify/functions/callback",
      returnUrl: "https://zestore.netlify.app/",
      signature,
    };

    const response = await fetch(
      "https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error creating payment" }),
    };
  }
};
