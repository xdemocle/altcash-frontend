/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCoin = /* GraphQL */ `
  subscription OnCreateCoin($id: ID, $name: String, $symbol: String) {
    onCreateCoin(id: $id, name: $name, symbol: $symbol) {
      id
      name
      symbol
      markets {
        id
        market
        exchanger
        isActive
      }
    }
  }
`;
export const onUpdateCoin = /* GraphQL */ `
  subscription OnUpdateCoin($id: ID, $name: String, $symbol: String) {
    onUpdateCoin(id: $id, name: $name, symbol: $symbol) {
      id
      name
      symbol
      markets {
        id
        market
        exchanger
        isActive
      }
    }
  }
`;
export const onDeleteCoin = /* GraphQL */ `
  subscription OnDeleteCoin($id: ID, $name: String, $symbol: String) {
    onDeleteCoin(id: $id, name: $name, symbol: $symbol) {
      id
      name
      symbol
      markets {
        id
        market
        exchanger
        isActive
      }
    }
  }
`;
