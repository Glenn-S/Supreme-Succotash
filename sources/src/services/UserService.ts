import { Guid } from 'guid-typescript';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Types } from '../configuration/types';
import { Result } from '../models/Result';
import { User } from '../models/User';
import { IValidator } from '../validators/Validator';

export interface IUserService {
  getUsers(): Result<User[]>;
  getUserById(id: Guid): Result<User>;
}

@injectable()
export class UserService implements IUserService {
  private _validator: IValidator;

  constructor(
    @inject(Types.IValidator) validator: IValidator
  ) {
    if (validator === null || validator === undefined) throw Error('Validator was null or undefined');
    this._validator = validator;
  }

  getUserById(id: Guid): Result<User> {
    return {
      data: {
        id: Guid.parse('356e158a-1b4e-4d10-90ec-de4b90ae8c36'),
        name: 'Glenn Skelton',
        email: 'testing@gmail.com',
        phone: '1234567'
      },
      status: 200
    };
  }

  getUsers(): Result<User[]> {
    return {
      data: [
        {
          id: Guid.parse('356e158a-1b4e-4d10-90ec-de4b90ae8c36'),
          name: 'Glenn',
          email: 'testing@gmail.com',
          phone: '1234567'
        }
      ],
      status: 200
    };
    
  }
}