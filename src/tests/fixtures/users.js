import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { ADMIN } from '../../constants/roles';

export const adminUser = {
  userId: uuidv4(),
  username: 'aretha',
  email: 'myaretha41@gmail.com',
  password: '$2b$10$xPxQHQlrOEvlrB4MZ6ReSeSTN1Xz6gCWM9najh8YmQk/1M1nHwwjy',
  roles: ADMIN,
  createdAt: dayjs().format('YYYY-MM-DD h:mm:ss A'),
};

