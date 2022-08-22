import { Router } from 'express';
import ProductController from '../../controllers/products';
import { celebrate, Joi, Segments } from 'celebrate';
import verifiedToken from '../../middleware/auth';

const router = Router();

router.get('/', ProductController.getAllProducts);

router.post(
  '/',
  verifiedToken,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(10).max(30),
      aisle: Joi.string().required().min(10).max(30),
    }),
  }),
  ProductController.createAProduct
);
router.get('/:id', ProductController.getAProduct);

export default router;
