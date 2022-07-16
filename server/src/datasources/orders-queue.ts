/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'bson';
import { isUndefined } from 'lodash';
import OrderModel from '../models/orders';
import {
  OrderQueueParams,
  OrderQueue,
  UpdateOrderQueueParams,
  Order
} from '../types';
import Logger from '../utilities/logger';
import BinanceAPI from './binance';
import OrdersAPI from './orders';

class OrdersQueueAPI extends MongoDataSource<OrderQueue> {
  async getQueues(): Promise<OrderQueue[] | null> {
    const orders = await this.model.find();

    orders.map((order) => {
      order.timestamp = order._id.getTimestamp();
      return order;
    });

    return orders;
  }

  async getQueue(id: string) {
    const order = await this.findOneById(id);
    const response = JSON.parse(JSON.stringify(order));

    response.timestamp = order._id.getTimestamp();

    console.debug('getQueue', response);

    return response;
  }

  async getQueueByOrderId(orderId: string) {
    const ordersQueue = await this.collection.find({ _id: orderId });
    const response = JSON.parse(JSON.stringify(ordersQueue));

    // response.timestamp = ordersQueue._id.getTimestamp();

    console.debug('getQueueByOrderId', response);

    return response;
  }

  async createQueue(order: Order) {
    return await this.model.create(order);
  }

  async updateQueue(id: string, input: UpdateOrderQueueParams) {
    this.deleteFromCacheById(id);

    const updatedQueueOrder = this.getUpdatedQueueOrder(input);

    // If there is something for real to update
    if (Object.keys(updatedQueueOrder).length > 0) {
      await this.collection.updateOne(
        {
          _id: new ObjectId(id)
        },
        {
          $set: updatedQueueOrder
        }
      );
    }

    return await this.getQueue(id);
  }

  async updateQueueByOrderId(orderId: string, input: UpdateOrderQueueParams) {
    const updatedQueueOrder = this.getUpdatedQueueOrder(input);

    // If there is something for real to update
    if (Object.keys(updatedQueueOrder).length > 0) {
      const queue = await this.collection.updateOne(
        {
          orderId
        },
        {
          $set: updatedQueueOrder
        }
      );

      return queue;
    }

    return null;
  }

  async executeExchangeOrder(orderId: string) {
    const ordersApi = new OrdersAPI(OrderModel);
    const binanceApi = new BinanceAPI();
    const order = await ordersApi.getOrder(orderId);

    Logger.error('error');

    try {
      const postOder = await binanceApi.postOrder(order);

      if (postOder) {
        this.updateQueueByOrderId(orderId, { isExecuted: true });
        Logger.info(postOder);
      }
    } catch (error) {
      Logger.error(error);
    }
  }

  async importAndCheckOrders(orders: Order[]) {
    const newOrdersQueue: OrderQueueParams[] = [];
    const queue = await this.getQueues();

    // Check if each order are already present
    orders.forEach(async (order) => {
      const isPresent = queue.find((e) => e.orderId === order.id);

      // TODO Check order to exchanger and update order isPending
      // console.log('isPresent.isExecuted', isPresent);

      if (!isPresent) {
        // TODO Execute order to exchanger
        newOrdersQueue.push({
          orderId: order._id,
          isExecuted: false,
          isFilled: false
        });
      }
    });

    // In parallel we execute the orders
    newOrdersQueue.forEach((queue) => {
      this.executeExchangeOrder(queue.orderId);
    });

    console.debug('importOrders', JSON.stringify(newOrdersQueue));

    return this.model.insertMany(newOrdersQueue);
  }

  getUpdatedQueueOrder(input: UpdateOrderQueueParams) {
    const updatedQueueOrder: UpdateOrderQueueParams = {};

    if (input.orderId) {
      updatedQueueOrder.orderId = input.orderId;
    }

    if (input.transactionId) {
      updatedQueueOrder.transactionId = input.transactionId;
    }

    if (!isUndefined(input.isExecuted)) {
      updatedQueueOrder.isExecuted = input.isExecuted;
    }

    if (!isUndefined(input.isFilled)) {
      updatedQueueOrder.isFilled = input.isFilled;
    }

    return updatedQueueOrder;
  }
}

export default OrdersQueueAPI;
