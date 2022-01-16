
export const Types = {
  IExpressService: Symbol.for('IExpressService'),

  // Controllers
  UserController: Symbol.for('UserController'), // concrete type

  // Services
  IUserService: Symbol.for('IUserService'),

  // Validators
  IValidator: Symbol.for('IValidator'),
}