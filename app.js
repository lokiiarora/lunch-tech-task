/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');
const UserModel = require("./models/User");
const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});

// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET,
//     store: new MongoStore({
//         url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
//         autoReconnect: true,
//         clear_interval: 3600
//     })
// }));

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/Home', (req,res) => {
    res.redirect("/")
})
app.get('/', (req,res)=> {
    res.sendFile("views/Home.html", {root: __dirname});
});
app.get('/ProductPricing', (req,res) => {
    res.sendFile("views/ProductPricing.html", {root: __dirname });
});
app.get('/Reports', (req,res) => {
    res.sendFile('views/Reports.html', {root:__dirname});
});
app.get('/Reversal', (req,res) => {
    res.sendFile("views/Reversal.html", {root:__dirname});
});
app.get('/SetPricing', (req,res) => {
    res.sendFile("views/SetPricing.html", {root:__dirname});
});
app.get('/TopUp', (req,res) => {
    res.sendFile("views/TopUp.html", {root:__dirname});
});
app.get('/ChangePassword', (req,res) => {
    res.sendFile("views/ChangePassword.html", {root:__dirname});
});
app.get("/DeviceBooking", (req,res) => {
    res.sendFile("views/DeviceBooking.html", {root:__dirname});
});
app.get("/MyInfo" , (req,res) => {
    res.sendFile("views/MyInfo.html", {root: __dirname});
})
app.get('/bal', (req,res) => {
    let { uname } = req.query;
    // console.log(uname);
    UserModel.findOne({uname:uname}, (err,profile) => {
        if(profile){
            if(err){
                return res.status(500);
            }else{
                // console.log(profile);
                return res.json(profile.balance);
            }
            console.log(profile);
        }else{
            console.log("No user")
            res.status(404);
        }
    })
});
app.post('/changeP', (req,res) => {
    const {uname , pwd} = req.body;
    console.log(req.body);
    UserModel.findOne({uname:uname}, (err,profile) => {
        if(profile){
            if(err){
                return res.status(500);
            }else{
                profile.password = pwd;
                console.log(profile);
                profile.save((err) => {
                    console.log(err);
                    if(err){
                        console.log("Error hai")
                        return res.status(500);
                    }else{
                        console.log("It's okay");
                        res.end();
                    }
                })
            }
        }else{
            console.log("No profile like that found");
            res.status(404);
        }
    })
});
app.get('/getInfo', (req,res) => {
    const {uname} = req.query;
    console.log(uname);
    UserModel.findOne({uname:uname}, (err,profile) => {
        if(err){
            return res.status(500);
        }else if(profile){
             console.log(profile); 
             return res.json(profile);          
        }
            console.log("No profile like that");
            res.status(404);
        
    });
});
// app.get('/', homeController.index);
// app.get('/login', userController.getLogin);
// app.post('/login', userController.postLogin);
// app.get('/logout', userController.logout);
// app.get('/forgot', userController.getForgot);
// app.post('/forgot', userController.postForgot);
// app.get('/reset/:token', userController.getReset);
// app.post('/reset/:token', userController.postReset);
// app.get('/signup', userController.getSignup);
// app.post('/signup', userController.postSignup);
// // app.get('/contact', contactController.getContact);
// // app.post('/contact', contactController.postContact);
// app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
// app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
// app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
// app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
// //app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

// /**
//  * For first login
//  * */
// app.get('/set/address', userController.getAddress);
// app.post('/set/address', userController.postAddress);


// /**
//  * API route to get areas of city
//  */
// app.post('/get/areas', (req, res) => {

//     ServiceArea
//         .find({ city: req.body.city }, (err, address) => {
//             console.log(address[0].area);
//             for (var i = 0; i < address[0].area.length; i++) {
//                 if (address[0].area[i] === req.user.profile.area) {
//                     address[0].area.splice(i, 1);
//                 }
//             }
//             if (err) {
//                 res.status(500);
//             } else if (address) {
//                 var data = {
//                     area: address[0].area,
//                     city: address[0].city,
//                     currentCity: req.user.profile.city,
//                     currentArea: req.user.profile.area
//                 }
//                 res.json(data);
//             }
//         });

// });

// app.get('/get/city', (req, res) => {
//     res.json(req.user.profile.city);
// });

// /**
//  * Admin Route to add city and area
//  */
// app.get('/admin', (req, res) => {
//     if (!req.user) {
//         res.redirect('/login');
//     } else {
//         ServiceArea.find({}, (err, list) => {
//             console.log(list);
//             req.flash('success', { msg: 'Successfully Logged in' });
//             res.render('admin', {
//                 values: list,
//                 title: 'Admin'
//             });
//         });
//     }
// });

// app.post('/admin', (req, res) => {
//     ServiceArea
//         .findOne({ date: req.body.date })
//         .then((addresses) => {
//             if (!addresses) {
//                 const newAddress = new ServiceArea({
//                     date: req.body.date,
//                     data: [{
//                         city: req.body.city,
//                         area: req.body.area,
//                         user: req.body.user,
//                         item: req.body.item,
//                         address: req.body.address
//                     }]
//                 });
//                 newAddress.save((err) => {
//                     if (err) {
//                         return next(err);
//                     }
//                     res.redirect('/admin');
//                 });
//             } else {
//                 var data = {
//                     city: req.body.city,
//                     area: req.body.area,
//                     user: req.body.user,
//                     item: req.body.item,
//                     address: req.body.address
//                 };
//                 addresses.data.push(data);
//                 addresses.save((err) => {
//                     if (err) {
//                         req.flash('errors', { msg: err });
//                         res.redirect('/admin');
//                     } else {
//                         req.flash('success', { msg: 'Success' });
//                         res.redirect('/admin');
//                     }
//                 });
//             }

//         });

// });

// /**
//  * OAuth authentication routes. (Sign in)
//  */
// app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
// app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect(req.session.returnTo || '/');
// });

// /**
//  * Error Handler.
//  */
// app.use(errorHandler());

// /**
//  * Start Express server.
//  */
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;