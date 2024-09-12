const express = require('express');
const {signin,signup} = require('../controller/userController');
const { createOrder, deleteOrder, updateOrder, getAllOrder, getOrder } = require('../controller/orderController');
const { isAuthenticatedMid } = require('../middleware/auth');

const router = express.Router();



router.post(
    '/signup',
    signup
);
router.post(
    '/signin',
    signin
);

router.post(
    '/addOrder', createOrder 
    
);
router.delete(
    '/deleteOrder', deleteOrder 
    
);
router.put(
    '/updateOrder', updateOrder 
    
);
router.get(
    '/getOrders', getAllOrder 
    
);
router.get(
    '/getOrder', getOrder
    
);



module.exports = router;