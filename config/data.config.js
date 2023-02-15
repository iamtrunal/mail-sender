require('dotenv').config();

let CONFIG = {}; //Make this global to use all over the application

CONFIG.email = process.env.EMAIL || "<Your email>";
CONFIG.password = process.env.PASSWORD || "<Your Email's Password>";

module.exports = CONFIG;