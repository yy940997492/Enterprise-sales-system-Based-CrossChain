import type { Request, Response } from 'express';

export default {
  'POST  /api/sale/customerInformation/followUpRecord': (_: Request, res: Response) => {
    console.log(_.body, Object.keys(_.body).length);
    res.send({ data: { message: 'Ok' } });
  },
};
