import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation createOrder($amount: String, $total: String, $symbol: String) {
    createOrder(amount: $amount, total: $total, symbol: $symbol) {
      _id
      amount
      total
      symbol
      pin
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder($id: String, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      _id
      amount
      total
      symbol
      isPaid
      isPending
      isWithdrawn
      isCancelled
      wallet
      reference
      email
      pin
    }
  }
`;
