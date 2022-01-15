import { injectable } from 'inversify';
import 'reflect-metadata'

export interface IValidator {
  validate(): string;
}

@injectable()
export class Validator implements IValidator {
  constructor() {
    
  }

  validate(): string {
    return "validated";
  }
}