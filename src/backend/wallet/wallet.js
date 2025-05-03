import axios from "axios";

export const createUserWallet = async (userData) => {
  const response = await axios.post(
    "https://api.flutterwave.com/v3/virtual-account-numbers",
    {
      email: userData.get("email"),
      is_permanent: true,
      bvn: userData.get("idNumber"), // if required in your region
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
