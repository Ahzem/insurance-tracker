import { Request, Response } from 'express';
import authService from '../services/auth.service';

export class AuthController {
  /**
   * Register a new user
   */
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      
      // Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Please provide all required fields'
        });
      }

      const user = await authService.register({ name, email, password });
      
      // Return user info without password
      return res.status(201).json({
        success: true,
        data: {
          id: user._id.toString(),
          name: user.name,
          email: user.email
        }
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        error: error.message || 'Failed to register user'
      });
    }
  }

  /**
   * Login a user
   */
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      
      // Basic validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Please provide email and password'
        });
      }

      const authData = await authService.login({ email, password });
      
      return res.status(200).json({
        success: true,
        data: authData
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        error: error.message || 'Failed to authenticate'
      });
    }
  }
}

export default new AuthController(); 