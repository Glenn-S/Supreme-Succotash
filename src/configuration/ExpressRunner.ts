import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { UserController } from '../controllers/UserController';
import { Types } from './types';

export interface IExpressRunner {
  startExpress({ port }: { port: number}): void;
}

@injectable()
export class ExpressRunner implements  IExpressRunner {
  private _express: Express;
  private _userController: UserController;

  constructor(
    @inject(Types.UserController) userController: UserController
  ) {
    this._express = express();
    this._userController = userController;
    this.configureRoutes();
  }

  // TODO Figure out best way of abstracting out these routes.
  private configureRoutes(): void {
    this._express.use(this._userController.routes());

  }

  startExpress({ port }: { port: number }): void {
    this._express.listen(port, () => {
      console.log(`Starting express on port ${port}`);
    });
  }
}