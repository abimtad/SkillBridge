import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { postLogin, getTokenStructure, postLogout } from '../controllers/auth.controller.js';

export const router = Router();

// Token generation and verification
router.post('/login', postLogin);

// Clear cookie on logout
router.post('/logout', postLogout);

// JWT token structure demo
router.get('/token-structure', getTokenStructure);

// Authentication vs Authorization demo endpoints
router.get('/me', authenticate, (req, res) => {
  res.json({ message: 'Authenticated user', user: req.user, topic: 'Authentication' });
});

router.get('/admin', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Authorized: admin only', user: req.user, topic: 'Authorization' });
});

// Token storage strategies guidance (no refresh tokens implemented)
router.get('/token-storage-strategies', (req, res) => {
  res.json({
    topic: 'Token storage strategies',
    strategies: [
      'HTTP-only cookies for access tokens to reduce XSS exposure',
      'In-memory storage for short-lived tokens in SPAs',
      'Avoid localStorage/sessionStorage for sensitive tokens due to XSS risk'
    ]
  });
});
