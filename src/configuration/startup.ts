import { Container, injectable } from 'inversify';
import "reflect-metadata"; // must go before any DI imports
import { ExpressRunner, IExpressRunner } from './ExpressRunner';
import { IValidator, Validator } from '../validators/Validator';
import { Types } from './types';

@injectable()
export class Startup {
  private _container: Container;

  constructor() {
    this._container = new Container();
  }

  serviceConfiguration() {
    // Configure all dependencies in this method
    // Services
    this._container.bind<IExpressRunner>(Types.IExpressService).to(ExpressRunner);

    // Validators
    this._container.bind<IValidator>(Types.IValidator).to(Validator);
  }

  startup(): void {
    console.log("Registering services");
    this.serviceConfiguration();

    console.log("Starting up express service");
    const service: IExpressRunner = this._container.get<IExpressRunner>(Types.IExpressService);
    service.startExpress({ port: 5000 });
  }
}
