const express = require('express');
const { loginProfile, editProfile } = require('../controllers/profilecontroller');
const router = express.Router();


router.post("/",loginProfile);
router.patch("/edit",editProfile);

module.exports = router;