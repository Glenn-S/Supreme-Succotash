import { Router } from 'express';
import { Guid } from 'guid-typescript';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Types } from '../configuration/types';
import { IUserService } from '../services/UserService';

@injectable()
export class UserController {
  private _service: IUserService;
  private _baseRoute = 'users';

  constructor(
    @inject(Types.IUserService) service: IUserService 
  ) {
    this._service = service;
  }

  routes(): Router {
    const router = Router();

    /**
     * Get users
     */
    router.get(`/${this._baseRoute}`, (req, res) => {
      const users = this._service.getUsers();

      res
        .send({ users: users.data })
        .status(users.status);
    });

    /**
     * Get user by id.
     */
    router.get(`/${this._baseRoute}/:userId`, (req, res) => {
      const { userId } = req.params;

      if (!Guid.isGuid(userId)) {
        res
          .send('The user id provided was not a valid guid')
          .status(400);
      }

      const user = this._service.getUserById(Guid.parse(userId));

      res
        .send({ user: user.data })
        .status(user.status);
    });

    return router;
  }
};
