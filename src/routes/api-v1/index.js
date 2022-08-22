import { Router } from 'express';
import productsRoute from './products.route';
import usersRoute from './users.route';

const routes = Router();

routes.use('/products', productsRoute);
routes.use('/users', usersRoute);

export default routes;
