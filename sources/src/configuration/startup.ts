import { Container, injectable } from 'inversify';
import "reflect-metadata"; // must go before any DI imports
import { ExpressRunner, IExpressRunner } from './ExpressRunner';
import Validator, { IValidator } from '../validators/Validator';
import { Types } from './types';
import { UserController } from '../controllers/UserController';
import { IUserService, UserService } from '../services/UserService';
import * as dotenv from 'dotenv';
import path from 'path';
import { connectToDatabase } from '../database/databaseConfiguration';

@injectable()
export class Startup {
  private _container: Container;

  constructor() {
    this._container = new Container();
  }

  serviceConfiguration() {
    // Configure all dependencies in this method
    this._container.bind<IExpressRunner>(Types.IExpressService).to(ExpressRunner);

    // Controllers
    this._container.bind<UserController>(Types.UserController).to(UserController);

    // Services
    this._container.bind<IUserService>(Types.IUserService).to(UserService);

    // Validators
    this._container.bind<IValidator>(Types.IValidator).to(Validator);
  }

  startup(): void {
    dotenv.config({
      path: path.resolve(__dirname, '../../../.env')
    });

    connectToDatabase().catch((err) => console.log(err));

    console.log("Registering services");
    this.serviceConfiguration();

    console.log("Starting up express service");
    const service: IExpressRunner = this._container.get<IExpressRunner>(Types.IExpressService);
    service.startExpress({ port: 5000 });
  }
}
