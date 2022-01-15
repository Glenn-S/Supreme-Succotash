import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

export interface IExpressRunner {
  startExpress({ port }: { port: number}): void;
}

@injectable()
export class ExpressRunner implements  IExpressRunner {
  private _express: Express;

  constructor() {
    this._express = express();
    this.configureRoutes();
  }

  // TODO Figure out best way of abstracting out these routes.
  private configureRoutes(): void {
    this._express.get('/', (req, res) => {
      res
        .send({
          'data': 'Hello World'
        })
        .status(200);
    });
  }

  startExpress({ port }: { port: number }): void {
    this._express.listen(port, () => {
      console.log(`Starting express on port ${port}`);
    });
  }
}