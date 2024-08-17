const express = require('express');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(session({ secret: 'Nesegredo', resave: false, saveUninitialized: true }));

// Inicializar o Passport
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT DO SPOTIFY
passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: "/auth/spotify/callback"
},
(accessToken, refreshToken, profile, done) => {
  // Aqui salva o profile do usuario
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Autentica
app.get('/auth/spotify', passport.authenticate('spotify', { scope: ['user-read-email'] }));

app.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });

  // Isso tem que integrar na rota do front-end? Não sei como faz no react
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
