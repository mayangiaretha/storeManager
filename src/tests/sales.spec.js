// import chai from 'chai';
// const { expect } = chai;
// import { BaseTest } from './index.spec';
// import usersModel from '../models/users';
// import sales from '../models/sales';
// import { adminUser } from './fixtures/users';
//
// describe('Test the sales feature', function () {
//   let token;
//   let purchased;
//   let salesId;
//
//   beforeEach(async function () {
//     const newUser = usersModel(adminUser);
//     await usersModel.create(newUser);
//
//     const response = await BaseTest.post('/auth/login').send({
//       email: 'myaretha41@gmail.com',
//       password: 'password',
//     });
//     token = response.body.token;
//
//     const postedSale = await BaseTest.post('sales')
//       .set('access-token', `${token}`)
//       .send({
//         name: 'coke',
//       });
//     purchased = postedSale.body;
//     salesId = postedSale.body.sale.salesId;
//   });
//   afterEach(async function () {
//     await usersModel.deleteMany({});
//     await sales.deleteMany({});
//   });
//
//   it('should get all sales', async () => {
//     const response = await BaseTest.get('sales');
//     expect(response.status).to.equal(200);
//     expect(response.body).to.be.an('array');
//   });
//   // it('should get a sale with an id', async () => {
//   //   const response = await BaseTest.get(`sales/${salesId}`);
//   //   expect(response.body.sale.name).to.equal('coke');
//   //   expect(response.body.sale.salesId).to.equal(salesId);
//   // });
//   //
//   // it('should create a sale', async () => {
//   //   const response = await BaseTest.post('sales')
//   //     .set('access-token', `${token}`)
//   //     .send({
//   //       name: 'coke',
//   //     });
//   //   expect(response.status).to.equal(201);
//   //   expect(response.body).to.include({
//   //     message: 'sold',
//   //   });
//   // });
// });
