import { useContext } from 'react';
import {
  FavouritesContext,
  FavouritesContextProps
} from '../context/favourites';

const useFavourites = (): FavouritesContextProps => {
  return useContext(FavouritesContext);
};

export default useFavourites;
