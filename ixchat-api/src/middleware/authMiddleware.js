// Middleware para garantir que o usuário está autenticado
const authMiddleware = (req, res, next) => {
  console.log('Verificando autenticação');
  console.log('req.isAuthenticated():', req.isAuthenticated());
  console.log('req.user:', req.user);

  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Não autorizado. Faça login primeiro.' });
};

export default authMiddleware;
