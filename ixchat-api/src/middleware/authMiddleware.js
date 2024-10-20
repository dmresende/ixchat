// Middleware para garantir que o usuário está autenticado
const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401);
};

export default authMiddleware;