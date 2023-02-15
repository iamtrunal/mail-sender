const router = require('express').Router();

const { 
    userRegistration,
    sendMail
} = require("../controller/auth.controller");

router.post("/insert", userRegistration)
router.post("/send-mail", sendMail);

module.exports = router;