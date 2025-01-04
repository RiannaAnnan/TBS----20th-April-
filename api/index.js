const express = require('express');
const app = express();
const Mongoose = require('mongoose');
const User = require('./models/User');
const HotelBooking = require('./models/HotelBookings');
const Hotel = require('./models/Hotel');
// cors allows for the different ports to communicate with each other
const cors = require('cors');
// bcrypt is a package in node which encrypts the password as it is sent over to the database
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');

// is an internet standard for securely transmitting sensitive data
const jwt = require('jsonwebtoken');
const jwtSecret = 'random';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// allows us to view the images that have been uploaded in the web browser
// accesses the 'uploads' folder in the api
app.use('/uploads', express.static(__dirname + '/uploads'));

// retrieves the user data from the request body
function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}

// connects to the database in mongodb
Mongoose.connect('mongodb+srv://riannaannan:sGwZft8NPnnmNMbE@cluster0.ky1abzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.get('/test', (req, res) => {
    Mongoose.connect('mongodb+srv://riannaannan:sGwZft8NPnnmNMbE@cluster0.ky1abzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    Mongoose.connect('mongodb+srv://riannaannan:sGwZft8NPnnmNMbE@cluster0.ky1abzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    
    try {    
        const userInfo = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userInfo);
} catch (e) {
    res.status(422).json(e);
}

});

app.post('/login', async (req, res) => {
    Mongoose.connect('mongodb+srv://riannaannan:sGwZft8NPnnmNMbE@cluster0.ky1abzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const {email, password} = req.body;
    const userInfo = await User.findOne({email});
    // if the database contains user data, then the json response finds it.
    if (userInfo) {
        // checks to make sure that the password entered matches that in the database
        const passwordCheck = bcrypt.compareSync(password, userInfo.password);
        if (passwordCheck) {
            jwt.sign({email:userInfo.email, id:userInfo._id}, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userInfo);
            });
        } else {
            res.json('incorrect password');
        }
    } else {
        res.json('account not found');
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.get('/profile', (req, res) => {
    Mongoose.connect('mongodb+srv://riannaannan:sGwZft8NPnnmNMbE@cluster0.ky1abzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        });
    } else {
        res.json(null);
    }
});

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'image' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
});

app.post('/hotels', (req, res) => {
    const {title, location, address, description, addedPhotos,
        features, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const hotelInfo = await Hotel.create({
            hotelid:userData.id,
            title, location, address, description, photos:addedPhotos, features:features,
            extraInfo, checkIn, checkOut, maxGuests, price,
        });
        res.json(hotelInfo);
    });
    });

app.get('/admin-hotels', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json( await Hotel.find({hotelid:id}) );  
    });

});

app.get('/hotels', async (req, res) => {
    res.json(await Hotel.find());
});

app.put('/hotels/', async (req, res) => {
    Mongoose.connect('mongodb+srv://riannaannan:sGwZft8NPnnmNMbE@cluster0.ky1abzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const {token} = req.cookies;
    const {id, title, location, address, description,
    addedPhotos, features, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const hotelDoc = await Hotel.findById(id);
        if (userData.id === hotelDoc.hotelid.toString()) {
            hotelDoc.set({
                title, location, address, description, addedPhotos,
                features, extraInfo, checkIn, checkOut, maxGuests, price
            });
            await hotelDoc.save();
            res.json('hotel details have been updated')
        }
    })
});

app.get('/hotels/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await Hotel.findById(id));
});

app.post('/hotelbookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {
        hotel, checkIn, checkOut, numGuests, name, phoneNumber, price} = req.body;
        HotelBooking.create({
            hotel, checkIn, checkOut, numGuests, name, phoneNumber, price, user:userData.id,
        }).then((bookingdoc) => {
            res.json(bookingdoc);
        }).catch((err) => {
            throw err;
        });
});

app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await HotelBooking.find({user:userData.id}).populate('hotel'));
});

app.listen(4000);