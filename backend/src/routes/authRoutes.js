const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('api/invoices',invoices);//retrive invoices
router.post('api/invoices',invoices);//create new invoice
router.put('api/invoices/:id',invoices);//update a invoice
router.delete('api/invoices/:id',invoices);//delete a invoice
module.exports = router;
