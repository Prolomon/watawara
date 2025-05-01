// Example using Flutterwave's API (Node.js backend)

const createUserWallet = async (userData) => {
  const response = await axios.post(
    "https://api.flutterwave.com/v3/virtual-account-numbers",
    {
      email: userData.email,
      is_permanent: true,
      bvn: userData.bvn, // if required in your region
      tx_ref: `wallet-acc-${Date.now()}`,
      narration: `${userData.firstName}'s Wallet Account`,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    }
  );

  return response.data;
};
