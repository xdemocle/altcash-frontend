import { createContext, ReactNode, useState } from 'react';
import { isServer, persistFavourites } from '../common/utils';

export interface FavouritesContextProps {
  userCoinFavourites: string[];
  addFavourites: (symbol: string) => void;
  removeFavourites: (symbol: string) => void;
}

const userCoinFavouritesLocal = () => {
  if (!isServer()) {
    return window.localStorage.getItem('userCoinFavourites') || '';
  }

  return '';
};

export const FavouritesContext = createContext<FavouritesContextProps>(
  {} as FavouritesContextProps
);

interface Props {
  children: ReactNode;
}

const FavouritesProvider = ({ children }: Props) => {
  const [userCoinFavourites, setFavourites] = useState<
    FavouritesContextProps['userCoinFavourites']
  >(userCoinFavouritesLocal() ? JSON.parse(userCoinFavouritesLocal()) : []);

  const addFavourites = (symbol: string) => {
    userCoinFavourites.push(symbol as never);

    persistFavourites(userCoinFavourites);

    setFavourites([...[], ...userCoinFavourites]);
  };

  const removeFavourites = (symbol: string) => {
    const findIx = userCoinFavourites.indexOf(symbol as never);

    userCoinFavourites.splice(findIx, 1);

    persistFavourites(userCoinFavourites);

    setFavourites([...[], ...userCoinFavourites]);
  };

  return (
    <FavouritesContext.Provider
      value={{
        userCoinFavourites,
        addFavourites,
        removeFavourites
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesProvider;
