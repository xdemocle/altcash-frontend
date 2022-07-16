/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';

require('isomorphic-fetch');

dotenv.config();

const env = {
  serviceId: process.env.EMAILJS_SERVICE_ID,
  templateId: process.env.EMAILJS_TEMPLATE_ID,
  userId: process.env.EMAILJS_PUBLIC_KEY
};

class EmailJS {
  url: 'https://api.emailjs.com/api/v1.0/email/send';

  // constructor() { }

  post(message: any) {
    const data = {
      service_id: env.serviceId,
      template_id: env.templateId,
      user_id: env.userId,
      template_params: {
        message: message
      }
    };

    return fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        console.debug('EmailJS: post response', response);
        return response.json();
      })
      .then(function (response) {
        console.debug(response);
      });
  }
}

export default EmailJS;
