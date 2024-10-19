import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.js'; // Certifique-se de que o caminho está correto
import bcrypt from 'bcrypt';

passport.use(new LocalStrategy(
  { usernameField: 'username' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Usuário não encontrado.' });
      }

      // Verifica se a senha está correta
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Senha incorreta.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serializa e desserializa o usuário para a sessão
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
