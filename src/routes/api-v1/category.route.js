import { Router } from 'express';
import CategoryController from '../../controllers/category';
import { celebrate, Joi, Segments } from 'celebrate';
import verifiedToken from '../../middleware/auth';

const router = Router();

router.get('/', CategoryController.getAllCategory);

router.post(
  '/',
  // verifiedToken,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      categoryName: Joi.string().required().min(3).max(30),
    }),
  }),
  CategoryController.addCategory
);

export default router;
