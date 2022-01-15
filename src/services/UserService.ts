import { injectable } from 'inversify';
import 'reflect-metadata';
import { User } from '../models/User';

export interface IUserService {
  getUser(): User;
}

@injectable()
export class UserService implements IUserService {
  constructor() {

  }

  getUser(): User {
    throw new Error('Method not implemented.');
  }
}