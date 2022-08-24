import chai from 'chai';
const { expect } = chai;
import { BaseTest } from 'mongoose';
import users from '../models/users';
import products from '../models/products';

deescribe('Test the users feature', function () {
  let token;

  beforeEach(async function () {
    const res = await BaseTest.post('/users/register').send({
      username: 'aretha40',
      email: 'myaretha41@gmail.com',
      password: 'pasworrd',
    });
    const rensponse = await BaseTest.post('/users/login').send({
      email: 'myaretha41@gmail.com',
      password: 'pasworrd',
    });
    token = response.body.token;

    const createAProduct = await BaseTest.post('products')
      .set(`acess-token', ${token}`)
      .send({
        name: 'coke',
        aisle: 'drinks aisle',
      });
  });
  productId = createdProduct.body.product.prouctId;
});
