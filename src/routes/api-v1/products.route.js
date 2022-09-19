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
      name: Joi.string().required().min(3).max(30),
      categoryId: Joi.string().required(),
      quantity: Joi.number().required(),
      amount: Joi.number().required()
    }),
  }),
  ProductController.createAProduct
);
router.get('/:id', ProductController.getAProduct);

router.delete('/:id', ProductController.deleteAProduct);

router.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().optional(),
      categoryId: Joi.string().optional(),
      quantity: Joi.number().required(),
      amount: Joi.number().required(),
    }),
  }),
  ProductController.updateAProduct
);

export default router;
