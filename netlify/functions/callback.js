// netlify/functions/callback.js

exports.handler = async (event, context) => {
  try {
    // Pastikan request method POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }

    // Parse body dari Duitku (JSON)
    const body = JSON.parse(event.body);

    // Contoh ambil data penting
    const merchantOrderId = body.merchantOrderId; // ID order lu
    const resultCode = body.resultCode; // Status transaksi
    const paymentAmount = body.paymentAmount;
    const paymentMethod = body.paymentMethod;

    console.log("Callback Duitku:", body);

    // Logic update order (contoh sederhana)
    let status = "PENDING";
    if (resultCode === "00") {
      status = "SUCCESS"; // Pembayaran berhasil
    } else {
      status = "FAILED"; // Pembayaran gagal / dibatalkan
    }

    // TODO: Disini lu bisa update ke database atau API lu sendiri
    // misalnya pake fetch() ke sistem order

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Callback received",
        orderId: merchantOrderId,
        status: status,
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
