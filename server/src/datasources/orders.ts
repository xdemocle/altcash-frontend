/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'bson';
import { isUndefined } from 'lodash';
import { Order, OrderParams, UpdateOrderParams } from '../types';

class OrdersAPI extends MongoDataSource<Order> {
  async getOrders(): Promise<Order[] | null> {
    const orders = await this.model.find();

    orders.map((order) => {
      order.timestamp = order._id.getTimestamp();
      return order;
    });

    return orders;
  }

  async getOrder(id: string) {
    const order = await this.model.findById(id);
    const response = JSON.parse(JSON.stringify(order));

    response.timestamp = order._id.getTimestamp();

    // console.debug(response);

    return response;
  }

  async createOrder(amount: string, total: string, symbol: string) {
    const pin = Math.random().toString().slice(3, 7);

    const newOrder = {
      amount,
      total,
      symbol,
      email: '',
      pin,
      isPending: true, // True by default
      isPaid: false,
      isWithdrawn: false,
      isCancelled: false,
      wallet: '',
      reference: ''
    };

    return await this.model.create(newOrder);
  }

  async updateOrder(id: string, input: OrderParams) {
    this.deleteFromCacheById(id);

    const updatedOrder: UpdateOrderParams = {};

    if (input.email) {
      updatedOrder.email = input.email;
    }

    if (!isUndefined(input.isPaid)) {
      updatedOrder.isPaid = input.isPaid;
    }

    if (!isUndefined(input.isPending)) {
      updatedOrder.isPending = input.isPending;
    }

    if (!isUndefined(input.isWithdrawn)) {
      updatedOrder.isWithdrawn = input.isWithdrawn;
    }

    if (!isUndefined(input.isCancelled)) {
      updatedOrder.isCancelled = input.isCancelled;
    }

    if (input.wallet) {
      updatedOrder.wallet = input.wallet;
    }

    if (input.reference) {
      updatedOrder.reference = input.reference;
    }

    // Ifthere is something forreal to update
    if (Object.keys(updatedOrder).length > 0) {
      await this.collection.updateOne(
        {
          _id: new ObjectId(id)
        },
        {
          $set: updatedOrder
        }
      );
    }

    return await this.getOrder(id);
  }

  async checkPendingPaidOrders(): Promise<Order[] | null> {
    const orders = await this.getOrders();
    const pendingOrders: Order[] = [];

    orders.forEach((order) => {
      if (order.isPending === true && order.isPaid === true) {
        pendingOrders.push(order);
      }
    });

    return pendingOrders;
  }
}

export default OrdersAPI;
