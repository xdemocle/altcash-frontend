import mongoose, { Schema } from 'mongoose';
import { Order } from '../types';

export const OrderSchemaObject = {
  amount: { type: String, required: true },
  total: { type: String, required: true },
  symbol: { type: String, required: true },
  email: { type: String },
  pin: { type: String },
  isPaid: { type: Boolean },
  isPending: { type: Boolean },
  isWithdrawn: { type: Boolean },
  isCancelled: { type: Boolean },
  wallet: { type: String },
  reference: { type: String }
};

const OrderSchema: Schema = new Schema(OrderSchemaObject);

export default mongoose.model<Order>('Order', OrderSchema);
