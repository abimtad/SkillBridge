import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { postLogin, getTokenStructure, postLogout } from '../controllers/auth.controller.js';

export const router = Router();