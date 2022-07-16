/* eslint-disable @typescript-eslint/no-explicit-any, no-console */
import Mailjet from './mailjet';

class Logger {
  sender = new Mailjet();

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
      .then((result) => {
        console.log('Logger - request response: ', JSON.stringify(result.body));
      })
      .catch((err: { statusCode: any }) => {
        console.log('Logger - request error: ', err.statusCode);
      });

    return request;
  }
}

export default new Logger();
