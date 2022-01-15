import { Container, injectable } from 'inversify';
import "reflect-metadata"; // must go before any DI imports
import { ExpressService, IExpressService } from '../services/expressService';
import { IValidator, Validator } from '../validators/Validator';
import { Types } from './types';

@injectable()
export class Startup {
  private _container: Container;

  constructor() {
    this._container = new Container();
  }

  serviceConfiguration(container: Container) {
    // Configure all dependencies in this method
    // Services
    container.bind<IExpressService>(Types.IExpressService).to(ExpressService);
  
    // Validators
    container.bind<IValidator>(Types.IValidator).to(Validator);
  }

  startup(): void {
    console.log("Registering services");

    this._container.bind<IExpressService>(Types.IExpressService).to(ExpressService);

    // Validators
    this._container.bind<IValidator>(Types.IValidator).to(Validator);
    // serviceConfiguration(this._container);

    console.log("Starting up express service");
    const service: IExpressService = this._container.get<IExpressService>(Types.IExpressService);
    console.log(service.get());
  }
}
