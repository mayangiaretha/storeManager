import chai from 'chai';
const { expect } = chai;
import { BaseTest } from './index.spec';
import usersModel from '../models/users';
import products from '../models/products';
import { adminUser } from './fixtures/users';
import categories from '../models/category';
import sales from '../models/sales';

describe('Test the category feature', function () {
  let token;
  let categoryId;

  beforeEach(async function () {
    const newUser = usersModel(adminUser);
    await usersModel.create(newUser);

    const response = await BaseTest.post('/auth/login').send({
      email: 'myaretha41@gmail.com',
      password: 'password',
    });
  });

  afterEach(async function () {
    await usersModel.deleteMany({});
    await categories.deleteMany({});
    await products.deleteMany({});
  });

  it('should get all categories', async () => {
    const response = await BaseTest.get('categories');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
  it('should create a category', async () => {
    const response = await BaseTest.post('categories')
      .set('access-token', `${token}`)
      .send({
        categoryName: 'electronics',
      });
    expect(response.status).to.equal(201);
    expect(response.body).to.include({
      message: 'category data',
    });
  });
});
