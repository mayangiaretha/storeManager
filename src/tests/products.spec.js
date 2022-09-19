import chai from 'chai';
const { expect } = chai;
import { BaseTest } from './index.spec';
import usersModel from '../models/users';
import products from '../models/products';
import { adminUser } from './fixtures/users';
import categories from '../models/category';

describe('Test the products feature', function () {
  let token;
  let newProduct;
  let productId;
  let categoryId;
  let newCategory;

  beforeEach(async function () {
    const newUser = usersModel(adminUser);
    await usersModel.create(newUser);

    const response = await BaseTest.post('/auth/login').send({
      email: 'myaretha41@gmail.com',
      password: 'password',
    });

    token = response.body.token;
    const createACategory = await BaseTest.post('categories')
      .set('access-token', `${token}`)
      .send({
        categoryName: 'electronics',
      });
    categoryId = createACategory.body.newCategory.categoryId;

    const createdProduct = await BaseTest.post('products')
      .set('access-token', `${token}`)
      .send({
        name: 'coke',
        amount: 400,
        quantity: 2,
        categoryId: categoryId,
      });

    newProduct = createdProduct.body;
    productId = createdProduct.body.product.productId;
  });

  afterEach(async function () {
    await usersModel.deleteMany({});
    await categories.deleteMany({});
    await products.deleteMany({});
  });

  it('Should get all products', async () => {
    const response = await BaseTest.get('products');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
  it('should get a product with an id', async () => {
    const response = await BaseTest.get(`products/${productId}`);
    expect(response.body.product.name).to.equal('coke');
    expect(response.body.product.productId).to.equal(productId);
  });

  it('Should create a product', async () => {
    const response = await BaseTest.post('products')
      .set('access-token', `${token}`)
      .send({
        name: 'sweets',
        amount: 500,
        quantity: 4,
        categoryId: categoryId,
      });
    expect(response.status).to.equal(201);
    expect(response.body).to.include({
      message: 'product created',
    });
  });

  it('Should update a product', async () => {
    const response = await BaseTest.put(`products/${productId}`)
      .set('access-token', `${token}`)
      .send({
        name: 'coke',
        amount: 400,
        quantity: 2,
        categoryId: categoryId,
      });
    expect(response.status).to.equal(201);
  });
  describe('test delete', function () {
    it('should respond 204', function () {
      const response = BaseTest.delete(`products/${productId}`).send({});
    });
  });
});
