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
      aisle: Joi.string().required().min(3).max(30),
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
      aisle: Joi.string().optional(),
    }),
  }),
  ProductController.updateAproduct
);

export default router;
