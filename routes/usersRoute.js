const express = require('express'),
    UserModel = require('../models/usersModel'),
    bcrypt = require('bcryptjs'),
    router = express.Router();

router.get('/signup', (req, res) => {
    res.render('template', {
        locals: {
            title: 'Grubanalysis | Signup',
            session: req.session
        },
        partials: {
            partial: 'partial-signup'
        }
    });
});

router.get('/login', (req, res) => {
    res.render('template', {
        locals: {
            title: 'Grubanalysis | Login',
            session: req.session
        },
        partials: {
            partial: 'partial-login'
        }
    });
});

// handle login info sent from partial-login
router.post('/login', async (req,res) => {
    const { email, password } = req.body;

    const user = new UserModel(null, null, null, email, password);

    //SUCCESSFUL LOGIN DATA
    const loginResponse = await user.login();

    if (!!loginResponse.isValid) {
        req.session.is_logged_in = loginResponse.isValid;
        req.session.user_id = loginResponse.user_id;
        req.session.first_name = loginResponse.first_name;
        req.session.last_name = loginResponse.last_name;
        res.redirect('/');
    } else {
        res.sendStatus(403);
    }
})

// handle login info sent from partial-signup
router.post('/signup', (req,res) => {
    const { first_name, last_name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    
    //params (password to be hashed, and salting)
    const hash = bcrypt.hashSync(password, salt);
    
    const user = new UserModel(null, first_name, last_name, email, hash);
    
    user.addUser();
    res.status(200).redirect('/');
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;