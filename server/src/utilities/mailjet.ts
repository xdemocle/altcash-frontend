/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import NodeMailjet from 'node-mailjet';

require('isomorphic-fetch');

dotenv.config();

const env = {
  key: process.env.MAILJET_APIKEY_PUBLIC,
  secret: process.env.MAILJET_APIKEY_PRIVATE
};

class Mailjet {
  mailjet: NodeMailjet;

  constructor() {
    this.mailjet = new NodeMailjet({
      apiKey: env.key,
      apiSecret: env.secret
    });
  }

  post(message: any, subject: string) {
    const request = this.mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'hello@altcash.co.za',
            Name: 'Webmaster Altcash.co.za'
          },
          To: [
            {
              Email: 'hello@altcash.co.za',
              Name: 'Webmaster Altcash.co.za'
            }
          ],
          Subject: subject,
          TextPart: message,
          HTMLPart: `<h3>New Message!</h3><br /><div>${message}</div>`
        }
      ]
    });

    return request;
  }
}

export default Mailjet;
