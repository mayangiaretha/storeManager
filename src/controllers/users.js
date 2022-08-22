import users from '../models/users';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

class UsersController {
  static async registerAUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const oldUser = await users.findOne({ email });
      if (oldUser) {
        return res.status(400).json({ error: 'user already exists' });
      }
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      const newUser = new users({
        userId: uuidv4(),
        username,
        email: email,
        password: encryptedPassword,
        createdAt: dayjs().format('YYYY-MM-DD h:mm:ss A'),
      });
      const createdUser = await users.create(newUser);
      const { userId, createdAt } = createdUser;
      return res.status(201).json({
        userID: userId,
        username,
        email,
        password: '******',
        createdAt,
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async loginUser(req, res) {
    try {
      const{ password, email } = req.body;
      const loggedIn = await users.findOne({ email })
      if (!loggedIn) return res.status(400).json({message: 'Wrong Email'})
      const checkPassword = await bcrypt.compare(password, user.password)
      if(!checkPassword)
        return res.status(400).json({ message: 'Invalid Password'})
      const token = jwt.sign( {Id:uuidv4(), email}, process.env.TOKEN_KEY);
      return res.header('auth_token',token).json({ token});

    }catch(error) {
      console.log(error.message);
    }
  }

}
export default UsersController;
