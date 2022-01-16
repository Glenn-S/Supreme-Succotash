import { UserService } from '../UserService';
import Validator, { IValidator } from '../../validators/Validator';

describe('Get users tests', () => {
  // TODO abstract this setup out
  const mockValidate = jest.fn();
  const mockValidator: IValidator = {
    validate: mockValidate
  }
  const mockUserService = new UserService(mockValidator);

  beforeEach(() => {
    mockValidate.mockClear();
  });

  test('Valid get users should return list of users', () => {
    // Assign
    // TODO add in repository layer to handle getting users and to be mocked out here

    // Act
    const result = mockUserService.getUsers();

    // Assert
    expect(result.data).not.toBeNull();
    expect(result.data.length).toBe(1);
  });

  test('Error in retrieving data should return error', () => {
    // Assign

    // Act

    // Assert
  });
});