import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../../controllers/users';
import verifiedToken from '../../middleware/auth';

const router = Router();

router.post(
  '/signup',
  verifiedToken,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().min(2).max(15).required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).max(20).required(),
      role: Joi.string().required(),
    }),
  }),
  UsersController.registerAUser
);
router.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  UsersController.loginUser
);

export default router;
