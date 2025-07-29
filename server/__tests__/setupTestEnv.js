// // __tests__/setupTestEnv.js

// vi.mock('../../middleware/authMiddleware', () => ({
//   verifyAdmin: (req, res, next) => {
//     req.user = { role: 'admin' };
//     next();
//   },
// }));

// vi.mock('../../utils/sendConfirmationEmail', () => ({
//   default: vi.fn().mockResolvedValue(true),
// }));