import mongoose, { Schema } from 'mongoose';
import { OrderQueue } from '../types';

export const OrderQueueSchemaObject = {
  orderId: { type: String, required: true },
  transactionId: { type: String },
  isExecuted: { type: Boolean },
  isFilled: { type: Boolean }
};

const OrderQueueSchema: Schema = new Schema(OrderQueueSchemaObject);

export default mongoose.model<OrderQueue>('OrderQueue', OrderQueueSchema);
