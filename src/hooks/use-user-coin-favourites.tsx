import { useContext } from 'react';
import {
  UserCoinFavouritesContext,
  UserCoinFavouritesContextProps
} from '../context/user-coin-favourites';

const useUserCoinFavourites = (): UserCoinFavouritesContextProps => {
  return useContext(UserCoinFavouritesContext);
};

export default useUserCoinFavourites;
