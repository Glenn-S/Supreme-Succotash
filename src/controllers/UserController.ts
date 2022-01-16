import { Router } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Types } from '../configuration/types';
import { IUserService } from '../services/UserService';

@injectable()
export class UserController {
  _service: IUserService;
  
  baseRoute = "/users";

  constructor(
    @inject(Types.IUserService) service: IUserService 
  ) {
    this._service = service;
  }

  routes(): Router {
    const router = Router();

    router.get('/', (req, res) => {
      const user = this._service.getUser();

      res
        .send({ user: user.data })
        .status(user.status);
    });

    router.get('/{userId}', (req, res) => {
    });

    return router;
  }
};
