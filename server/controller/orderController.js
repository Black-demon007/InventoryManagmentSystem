const { StatusCodes } = require('http-status-codes')
const OrderService = require('../services/orderService')

const orderService = new OrderService()
const createOrder = async (req, res) => {
    try {
        const data = req.body
        console.log('data in controller:', data);
        const response = await orderService.addOrder(data)
        res.status(StatusCodes.OK).json({
            success: true,
            data: response
        })
    } catch (error) {
        console.error('Error in controller:', error.name);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Internal Server Error',
            success: false,
            error: error.explanation || 'Unknown error occurred',
            data: {}
        });
    }
}
const deleteOrder = async (req, res) => {
    try {
        const orderId = req.query.id
        console.log('req body:', req.query.id);
        const response = await orderService.deleteOrder(orderId)
        res.status(StatusCodes.OK).json({
            success: true,
            msg: response
        })
    } catch (error) {
        console.error('Error in controller:', error.name);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Internal Server Error',
            success: false,
            error: error.explanation || 'Unknown error occurred',
            data: {}
        });
    }
}
const updateOrder = async (req, res) => {
    try {
        const orderId = req.query.id
        const data = req.body
        console.log('orderid:', orderId, 'data:', data);

        const response = await orderService.updateOrder(orderId, data)
        res.status(StatusCodes.OK).json({
            success: true,
            data: response
        })
    } catch (error) {
        if (error.name == 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}
const getAllOrder = async (req, res) => {
    try {
        const response = await orderService.getAllOrder()
        res.status(StatusCodes.OK).json({
            success: true,
            data: response
        })
    } catch (error) {
        console.error('Error in controller:', error.name);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Internal Server Error',
            success: false,
            error: error.explanation || 'Unknown error occurred',
            data: {}
        });
    }
}
const getOrder = async (req, res) => {
    try {
        const OrderId = req.query.id
        const response = await orderService.getOrder(OrderId)
        res.status(StatusCodes.OK).json({
            success: true,
            data: response
        })
    } catch (error) {
        console.error('Error in controller:', error.name);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Internal Server Error',
            success: false,
            error: error.explanation || 'Unknown error occurred',
            data: {}
        });
    }
}


module.exports = { createOrder, deleteOrder, updateOrder, getAllOrder, getOrder }