import { Router } from 'express';
import productsRoute from './products.route';
import salesRoute from './sales.route';
import usersRoute from './users.route';

const routes = Router();

routes.use('/products', productsRoute);
routes.use('/auth', usersRoute);
routes.use('/sales', salesRoute);

export default routes;
