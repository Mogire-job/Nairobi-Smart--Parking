import axios from "axios";

export async function POST(req) {
  try {
    const { phoneNumber, amount } = await req.json();
    const formattedPhone = phoneNumber.substring(1)
    console.log(formattedPhone);
    // M-Pesa API Credentials
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;

    console.log(shortcode);

    // Generate timestamp
    const now = new Date();
    const timeStamp = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    // Encode password
    const password = Buffer.from(shortcode + passkey + timeStamp).toString("base64");
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

    // Get OAuth token
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
       headers:{
        authorization:`Basic ${auth}`
       }
      }
    );

    const accessToken = response.data.access_token;

    // STK Push request
    const { data: stkResponse } = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timeStamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${formattedPhone}`,
        PartyB: shortcode,
        PhoneNumber: `254${formattedPhone}`,
        CallBackURL: `https://mydomain.com/path`,
        AccountReference: "Ubanilux",
        TransactionDesc: "Payment for services",
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    console.log(stkResponse);

    return Response.json(stkResponse);
  } catch (error) {
    console.log(error.message);
    return Response.json({ error: error.response?.data || "Something went wrong" }, { status: 500 });
  }
}