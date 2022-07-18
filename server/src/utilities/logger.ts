/* eslint-disable @typescript-eslint/no-explicit-any, no-console */
import Sendgrid from './sendgrid';

class Logger {
  sender = new Sendgrid();

  error(error: any) {
    const subject = 'Logger - error';

    this.request(error, subject);

    console.debug(`${subject}:`, error);
  }

  info(info: any) {
    console.info('Logger - info: ', info);
  }

  request(message: any, subject: string) {
    const request = this.sender.post(message, subject);

    request
      .then((response) => {
        console.log('Logger - request response: ', JSON.stringify(response));
      })
      .catch((err: any) => {
        console.log('Logger - request error: ', err);
      });

    return request;
  }
}

export default new Logger();
