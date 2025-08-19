// netlify/functions/callback.js
const crypto = require("crypto");

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }

    const body = JSON.parse(event.body);

    // Data dari callback Duitku
    const {
      merchantOrderId,
      resultCode,
      paymentAmount,
      paymentMethod,
      signature,
      reference,
    } = body;

    console.log("Callback Duitku:", body);

    // ====== Hardcode Merchant ======
    const merchantCode = "DS24540"; // Merchant code lu
    const apiKey = "77e34f016f7db50b29b2510ea7c04879"; // API Key Duitku (buat test ga masalah)

    // ====== Verifikasi Signature ======
    // Rumus: md5(merchantCode + merchantOrderId + paymentAmount + apiKey)
    const expectedSignature = crypto
      .createHash("md5")
      .update(merchantCode + merchantOrderId + paymentAmount + apiKey)
      .digest("hex");

    if (expectedSignature !== signature) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid signature" }),
      };
    }

    // ====== Update Status ======
    let status = "PENDING";
    if (resultCode === "00") {
      status = "SUCCESS";
    } else {
      status = "FAILED";
    }

    // TODO: update order lu ke DB / API sendiri

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Callback received",
        orderId: merchantOrderId,
        reference,
        status,
        amount: paymentAmount,
        method: paymentMethod,
      }),
    };
  } catch (error) {
    console.error("Callback error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
