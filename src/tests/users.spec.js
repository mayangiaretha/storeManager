import chai from 'chai';
const { expect } = chai;
import { BaseTest } from './index.spec';
import usersModel from '../models/users';
import { adminUser } from './fixtures/users';
import { ROLES, STORE_ATTENDANT } from '../constants/roles';

describe('Test the users feature', function () {
  let token;

  beforeEach(async function () {
    const newUser = usersModel(adminUser);
    await usersModel.create(newUser);

    const response = await BaseTest.post('/auth/login').send({
      email: 'myaretha41@gmail.com',
      password: 'password',
    });
    token = response.body.token;
  });
  afterEach(async function () {
    await usersModel.deleteMany({});
  });

  it('should fail to register a user if email already exists', async () => {
    const response = await BaseTest.post('/auth/signup').send({
      username: 'aretha',
      email: 'myaretha41@gmail.com',
      password: 'password',
    });
    expect(response.status).to.equal(401);
    expect(response.body).to.include({
      message: 'A token is required for authentication',
    });
  });
  it('should register a user', async () => {
    const response = await BaseTest.post('/auth/signup')
      .set('access-token', `${token}`)
      .send({
        username: 'paul',
        email: 'paul@gmail.com',
        password: 'message',
        role: 'store_attendant',
      });
    expect(response.status).to.equal(201);
    expect(response.body.username).to.equal('paul');
  });
});
