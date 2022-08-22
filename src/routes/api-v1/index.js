import { Router } from 'express';
import productsRoute from './products.route';

const routes = Router();

routes.use('/products', productsRoute);

export default routes;
