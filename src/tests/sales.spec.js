import chai from 'chai';
const { expect } = chai;
import { BaseTest } from './index.spec';
import usersModel from '../models/users';
import sales from '../models/sales';
import { adminUser } from './fixtures/users';
import products from '../models/products';
import categories from '../models/category';

describe('Test the sales feature', function () {
  let token;
  let purchased;
  let salesId;
  let productId;
  let categoryId;

  beforeEach(async function () {
    const AUser = usersModel(adminUser);
    await usersModel.create(AUser);

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
        quantity: 200000,
        categoryId: categoryId,
      });
    productId = createdProduct.body.product.productId;

    const postedSale = await BaseTest.post('sales')
      .set('access-token', `${token}`)
      .send({
        productId: productId,
        quantity: 55,
      });
    purchased = postedSale.body;
    salesId = postedSale.body.sale.salesId;
  });

  afterEach(async function () {
    await usersModel.deleteMany({});
    await categories.deleteMany({});
    await products.deleteMany({});
    await sales.deleteMany({});
  });

  it('should get all sales', async () => {
    const response = await BaseTest.get('sales');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
  it('should get a sale with an id', async () => {
    const response = await BaseTest.get(`sales/${salesId}`);
    expect(response.body.sale.productId.name).to.equal('coke');
    expect(response.body.sale.salesId).to.equal(salesId);
  });

  it('should create a sale', async () => {
    const response = await BaseTest.post('sales')
      .set('access-token', `${token}`)
      .send({
        quantity: 15,
        productId: productId,
      });
    expect(response.status).to.equal(201);
    expect(response.body).to.include({
      message: 'sold',
    });
  });
});
