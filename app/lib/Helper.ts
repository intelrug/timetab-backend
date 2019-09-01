import { Response } from 'express';
import APICode from './APICode';

export default class Helper {
  public static sendError(res: Response, err: object = {}, additional: object = {}): Response {
    /**
     * Common: 0 - 99
     * Messages: 100 - 199
     * Photos: 200 - 299
     * Users: 300 - 399
     */
    const errors: { [key: number]: string } = {
      0: 'Unknown error',
      1: 'Access denied',
      3: 'Not all parameters given',
    };

    const code: number = err instanceof APICode ? err.code : 0;
    const returnCode: number = errors[code] ? code : 0;
    const returnMessage: string = errors[errors[code] ? code : 0];

    return res.status(code === 0 ? 500 : 400)
      .send({ code: returnCode, message: returnMessage, ...additional });
  }
}
