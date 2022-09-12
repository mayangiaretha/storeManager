import usersModel from '../models/users';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { ROLES, ADMIN } from '../constants/roles';

class UsersController {
  static async registerAUser(req, res) {
    try {
      const { roles } = req.user;
      if (roles !== ADMIN) {
        return res
          .status(400)
          .json({ error: 'you are not authorised to register a user' });
      }
      const { username, email, password, role } = req.body;
      const oldUser = await usersModel.findOne({ email });
      if (oldUser) {
        return res.status(400).json({ error: 'user already exists' });
      }
      if (!ROLES.includes(role)) {
        return res.status(400).json({ error: 'role does not exist' });
      }
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      const newUser = new usersModel({
        userId: uuidv4(),
        username,
        email,
        password: encryptedPassword,
        roles: role,
        createdAt: dayjs().format('YYYY-MM-DD h:mm:ss A'),
      });
      const createdUser = await usersModel.create(newUser);
      const { userId, createdAt } = createdUser;
      return res.status(201).json({
        userID: userId,
        username,
        email,
        password: '******',
        roles: role,
        createdAt,
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async loginUser(req, res) {
    try {
      const { password, email } = req.body;
      const loggedIn = await usersModel.findOne({ email });
      if (!loggedIn) return res.status(400).json({ message: 'Wrong Email' });
      const { roles } = loggedIn;
      const checkPassword = await bcrypt.compare(password, loggedIn.password);
      if (!checkPassword)
        return res.status(400).json({ message: 'Invalid Password' });
      const token = jwt.sign(
        { Id: uuidv4(), email, roles },
        process.env.TOKEN_KEY
      );
      return res.header('access-token', token).json({ token });
    } catch (error) {
      console.log(error.message);
    }
  }
}
export default UsersController;
