const Item = require("../models/item")
const qr = require('qrcode');
const { ServiceError } = require("../utils/err/serviceError");
const { StatusCodes } = require("http-status-codes");
class OrderService {
    async addOrder(data) {
        try {
            console.log('data in service:', data);
            const { serialNumber, component, name, partNumber, dateReceived, numberReceived } = data;

            const balanceItems = numberReceived;
            const response = await Item.create({
                serialNumber,
                component,
                name,
                partNumber,
                dateReceived,
                numberReceived,
                balanceItems
            });


            const newQr = await qr.toDataURL(JSON.stringify(response._id));

            response.qrCode = newQr;
            await response.save();

            return response;
        } catch (error) {
            console.error('Error in addOrder:', error);
            throw error;
        }
    }

    async deleteOrder(orderId) {
        try {
            console.log('data in service:', orderId);
            const response = await Item.findByIdAndDelete(orderId)
            return `Item with ${orderId}  deleted successfully`
        } catch (error) {
            throw error
        }

    }
    async updateOrder(orderId, data) {
        try {
            const {
                numberDispatched,
                dateDispatched,
                serialNumber,
                component,
                name,
                partNumber,
                dateReceived,
                numberReceived,
                isPartialUpdate 
            } = data;

            const order = await Item.findById(orderId);

            if (!isPartialUpdate) {
                if (serialNumber) order.serialNumber = serialNumber;
                if (component) order.component = component;
                if (name) order.name = name;
                if (partNumber) order.partNumber = partNumber;
                if (dateReceived) order.dateReceived = dateReceived;
                if (numberReceived) order.numberReceived = numberReceived;
                if (dateDispatched && numberDispatched) {
                    order.dateDispatched = dateDispatched;
                    order.balanceItems = order.numberReceived - numberDispatched;
                    if (order.balanceItems < 0) {
                        throw new ServiceError(
                            'Dispatch Exceeds Stock',
                            `Cannot dispatch items more than in stock`,
                            StatusCodes.BAD_REQUEST
                        );
                    }
                    order.numberDispatched = numberDispatched;
                }
            } else {
                if (dateDispatched && numberDispatched) {
                    order.dateDispatched = dateDispatched;
                    order.balanceItems -= numberDispatched;
                    if (order.balanceItems < 0) {
                        throw new ServiceError(
                            'Dispatch Exceeds Stock',
                            `Cannot dispatch items more than in stock`,
                            StatusCodes.BAD_REQUEST
                        );
                    }
                    order.numberDispatched += Number(numberDispatched);
                }
            }

            const newqr = await qr.toDataURL(JSON.stringify(order._id));
            order.qrCode = newqr;
            await order.save();

            return order;
        } catch (error) {
            throw error;
        }
    }

    async getOrder(OrderId) {
        try {
            const response = await Item.findOne({ _id: OrderId })
            console.log(response)
            return response
        } catch (error) {
            throw error
        }

    }
    async getAllOrder() {
        try {
            const response = await Item.find({})
            return response
        } catch (error) {
            throw error
        }

    }
}

module.exports = OrderService