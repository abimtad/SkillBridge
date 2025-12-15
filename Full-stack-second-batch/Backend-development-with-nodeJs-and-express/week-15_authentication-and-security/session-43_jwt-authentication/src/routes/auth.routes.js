import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { postLogin, getTokenStructure, postLogout } from '../controllers/auth.controller.js';

export const router = Router();

router.post('/login', postLogin)
// router.post('/logout', )
// router.get('/token-structure', )
// router.get('/me', )
// router.get('/admin', )
// router.get('token-storage-strategies', )