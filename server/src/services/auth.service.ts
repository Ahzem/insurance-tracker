import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { Types } from 'mongoose';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export class AuthService {
  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<IUser> {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login a user
   */
  async login(loginData: LoginData): Promise<AuthResponse> {
    try {
      const user = await User.findOne({ email: loginData.email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Type assertion to access the methods
      const userDocument = user as unknown as IUser;
      const isPasswordValid = await userDocument.comparePassword(loginData.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      const secret = process.env.JWT_SECRET || 'default_secret_key';
      const token = jwt.sign(
        { id: userDocument._id.toString(), email: userDocument.email },
        secret,
        { expiresIn: '1d' }
      );

      return {
        user: {
          id: userDocument._id.toString(),
          name: userDocument.name,
          email: userDocument.email
        },
        token
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService(); 