import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Types } from '../configuration/types';
import { IValidator } from '../validators/Validator';

export interface IExpressService {
  get(): string;
}

@injectable()
export class ExpressService implements  IExpressService{
  private _validator: IValidator;

  constructor(
    @inject(Types.IValidator) validator: IValidator
  ) {
    this._validator = validator;
  }

  get(): string {
    const validate = this._validator.validate();
    console.log(validate);
    
    return "testing";
  }
}