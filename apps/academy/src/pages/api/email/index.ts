import sgMail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

import { env } from "@/env.mjs";

sgMail.setApiKey(env.SENDGRID_API_KEY);

interface ResponseData {
  message: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "POST") {
    const { body }: { body: { email: string; verificationNumber: string } } = req;
    // Process a POST request
    const msg = {
      to: body.email,
      from: "no-reply@developerdao.com",
      subject: "D_D Academy Verification Code",
      text: "This is your e-mail verification code for Developer DAO Academy ",
      html: `<strong>${body.verificationNumber}</strong>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent successfully");
        res.status(200).json({ message: "success" });
      })
      .catch((error: any) => {
        console.error(error);
        res.status(200).json({ message: error });
      });
  } else {
    // Handle any GET method
    res.status(200).json({ message: "Hellooooo" });
  }
}
