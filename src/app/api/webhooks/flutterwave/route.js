const FLW_WEBHOOK_SECRET = process.env.FLW_WEBHOOK_SECRET;

export async function POST(request) {
  const signature = request.headers.get("verif-hash");

  // Validate webhook
  if (!signature || signature !== FLW_WEBHOOK_SECRET) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const payload = await request.json();
    console.log("Received webhook payload:", payload);

    // Handle different event types
    if (payload.event === "charge.completed") {
      const { tx_ref, amount, currency } = payload.data;

      // In a real application, you would:
      // 1. Find the virtual account in your database using tx_ref
      // 2. Update the account balance
      // 3. Record the transaction

      console.log(`Payment received for tx_ref: ${tx_ref}`);
      console.log(`Amount: ${amount} ${currency}`);
    }

    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process webhook" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
