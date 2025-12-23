import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { postLogin, getTokenStructure, postLogout, postSignup, postForgotPassword, postResetPassword } from '../controllers/auth.controller.js';
import { validateSignup, validateEmail, validateLogin, validateRequest } from '../middlewares/validation.middleware.js';

export const router = Router();

router.post('/signup',validateSignup, validateRequest,
  postSignup
);

// Token generation and verification
router.post('/login', validateLogin,validateRequest, postLogin);


router.post(
  '/forgot-password',
  validateEmail,
  validateRequest,
  postForgotPassword
);
router.post('/reset-password', postResetPassword);

// Clear cookie on logout
router.post('/logout', postLogout);

router.get('/secrete',  authenticate, (req, res) => {
  console.log("the end point is hit")
  res.json({message: 'Authenticated user', user: req.user, topic: 'Secrete resource'})
});

router.get('/protected', authenticate, (req, res)=> {
  console.log("the end point is hit")
  res.json({message: 'Authenticated user', user: req.user, topic: 'This is secrete resource allowed just for the right user'})
});

router.get('/admin', authenticate, authorize('admin'), (req, res)=> {
  console.log("the end point is hit")
  res.json({message: 'Authorize admin only ', user: req.user, topic: 'authorization'})
});


// JWT token structure demo
router.get('/token-structure', getTokenStructure);

// Authentication vs Authorization demo endpoints


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
