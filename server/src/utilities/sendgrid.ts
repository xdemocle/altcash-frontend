/* eslint-disable @typescript-eslint/no-explicit-any */
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

require('isomorphic-fetch');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Sendgrid {
  sender = sgMail;

  // constructor() {
  //   this.mailjet = new NodeMailjet({
  //     apiKey: env.key,
  //     apiSecret: env.secret
  //   });
  // }

  post(message: any, subject: string) {
    const msg = {
      to: 'hello@rocco.me', // Change to your recipient
      from: 'hello@altcash.co.za', // Change to your verified sender
      subject: subject,
      text: message,
      html: `<h3>New Message!</h3><br /><div>${message}</div>`
    };

    return this.sender.send(msg);
  }
}

export default Sendgrid;
