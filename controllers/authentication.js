const bcrypt = require('bcrypt')
const session = require('express-session')
const {username, hashedPassword} = require('../static/credentials')

// Middleware for session
const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
})

// Middleware for authentication
const requireAuth = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    return next()
  } else {
    req.session.redirectTo = req.originalUrl;
    res.redirect('auth/login')
  }
}

// Route handler for login form
const loginForm = (req, res) => {
  const error = req.session.error
  req.session.error = null // Clear error after displaying
  res.render('login', { error })
}

// Route handler for login form submission
const login = (req, res, next) => {
  const { user, pass } = req.body
  if (user === username) {
    bcrypt.compare(pass, hashedPassword, (err, result) => {
      if (result) {
        req.session.authenticated = true;
        const redirectTo = req.session.redirectTo || '/'; // Получаем URL из сессии или устанавливаем значение по умолчанию
        delete req.session.redirectTo; // Удаляем redirectTo из сессии после использования
        return res.redirect(redirectTo);
      } else {
        req.session.error = 'Invalid password.'
        return res.redirect('/auth/login')
      }
    })
  } else {
    req.session.error = 'Invalid username.'
    return res.redirect('/auth/login')
  }
}

// Route handler for logout
const logout = (req, res) => {
  req.session.destroy()
  res.redirect('/auth/login')
}

module.exports = {
  sessionMiddleware,
  requireAuth,
  loginForm,
  login,
  logout
}
