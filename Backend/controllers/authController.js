const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = '6d8139287df4dfabd588cc32c20b0e339e0bc7e4c5519915ee0612be3c696891';
const JWT_REFRESH_SECRET = 'f17cc9f603da6da16c365421ce11bd47718e3c1b3c4aa1335d4701b959ae507b';

exports.register = async (req, res) => {
    console.log("exports.register");

    const { username, email, password } = req.body;

    try {
        const userEmailExists = await User.findOne({ email });
        if (userEmailExists) {
          return res.status(400).json({ message: 'Email already exists' });
        }

        const userPseudoExists = await User.findOne({ username });
        if (userPseudoExists) {
          return res.status(400).json({ message: 'Pseudo already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
  
        const newUser = new User({
          username,
          email,
          password: hashedPassword
        });
    
      
        const savedUser = await newUser.save();
    

        res.status(201).json({
         // token,
          user: {
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email
          }
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};


exports.login = async (req, res) => {
    console.log("exports.login");


    const {email, password } = req.body;

    const stayLoggedIn = true;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ type:"email",message: 'Email n\'existe pas' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ type:"password",message: 'Mot de passe incorrect' });
      }

      const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET, 
        { expiresIn: '1h' }
      );

      const refreshToken = jwt.sign(
        { id: user._id, email: user.email },
        JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );


      const accessTokenOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
        //expires : new Date(Date.now() + (2 * 60) * 60 * 1000) //2h de base
      };
  

      const refreshTokenOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
      };

      if (stayLoggedIn) {
        accessTokenOptions.expires = new Date(Date.now() + 3 * 60 * 1000); // 3 heures
        refreshTokenOptions.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 jours ou plus

        res.cookie('stayLoggedIn', true, { httpOnly: true, secure: true, sameSite: 'Strict' });
      }


      res.cookie('authToken', accessToken, accessTokenOptions);
      res.cookie('refreshToken', refreshToken, refreshTokenOptions);



      res.status(200).json({success: true, message: 'Connexion réussie.'});

    } catch (err) {
      res.status(500).json({success: false, message: err.message });
    }
    
};


exports.logout = (req, res) => {
  res.clearCookie('authToken', { 
    path: '/', 
    httpOnly: true, 
    secure: true, 
    sameSite: 'Strict' 
  });
  res.clearCookie('refreshToken', { 
    path: '/', 
    httpOnly: true, 
    secure: true, 
    sameSite: 'Strict' 
  });
  // res.clearCookie('stayLoggedIn', { 
  //   path: '/', 
  //   httpOnly: true, 
  //   secure: true, 
  //   sameSite: 'Strict' 
  // });

  res.status(200).send({ message: 'Logged out successfully' });
};



exports.refreshToken = (req, res) => {
  console.log("exports.refreshToken");

  const refreshToken = req.cookies.refreshToken;
  const stayLoggedIn = req.cookies.stayLoggedIn;

  if (!refreshToken) {
    return res.status(403).json({ message: 'Refresh token manquant. Accès refusé.' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const newRefreshToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      JWT_REFRESH_SECRET,
      { expiresIn: '365d' }
    );

    const accessTokenOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
     // expires : new Date(Date.now() + (2 * 60) * 60 * 1000)
    };

    const refreshTokenOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    };

    if (stayLoggedIn) {
      accessTokenOptions.expires = new Date(Date.now() + (3 * 60) * 60 * 1000); // 1 heure
      refreshTokenOptions.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 jours ou plus
    }

    res.cookie('authToken', newAccessToken, accessTokenOptions);
    res.cookie('refreshToken', newRefreshToken, refreshTokenOptions);


    res.status(200).json({ message: 'Token rafraîchi avec succès.' });

  } catch (err) {
    console.error('Erreur lors du rafraîchissement du token:', err.message);
    res.status(403).json({ message: 'Refresh token invalide.' });
  }
};



exports.checkAuth = (req, res) => {
  console.log("exports.checkAuth");
  const accessToken = req.cookies.authToken;

  if (!accessToken) {
    return res.status(401).json({ message: 'Non authentifié.' });
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    res.status(200).json({ message: 'Authentifié.' });
  } catch (err) {
    console.error('Erreur d\'authentification:', err.message);
    res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};


