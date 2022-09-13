import { Router } from 'express';
import SalesController from '../../controllers/sales';
import { celebrate, Joi, Segments } from 'celebrate';
import verifiedToken from '../../middleware/auth';

const router = Router();

router.get('/', SalesController.getAllSales);

router.post(
  '/',
  // verifiedToken,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      productId: Joi.string().required(),
      quantity: Joi.number().required(),
    }),
  }),
  SalesController.postASale
);
router.get('/:id', SalesController.getASale);

export default router;
