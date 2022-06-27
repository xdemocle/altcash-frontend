import { createContext, ReactNode, useState } from 'react';
import { persistUserCoinFavourites } from '../common/utils';

export interface UserCoinFavouritesContextProps {
  userCoinFavourites: string[];
  addUserCoinFavourites: (symbol: string) => void;
  removeUserCoinFavourites: (symbol: string) => void;
}

const userCoinFavouritesLocal =
  window.localStorage.getItem('userCoinFavourites');

export const UserCoinFavouritesContext =
  createContext<UserCoinFavouritesContextProps>(
    {} as UserCoinFavouritesContextProps
  );

interface Props {
  children: ReactNode;
}

const UserCoinFavouritesProvider = ({ children }: Props) => {
  const [userCoinFavourites, setUserCoinFavourites] = useState<
    UserCoinFavouritesContextProps['userCoinFavourites']
  >(userCoinFavouritesLocal ? JSON.parse(userCoinFavouritesLocal) : []);

  const addUserCoinFavourites = (symbol: string) => {
    userCoinFavourites.push(symbol as never);

    persistUserCoinFavourites(userCoinFavourites);

    setUserCoinFavourites([...[], ...userCoinFavourites]);
  };

  const removeUserCoinFavourites = (symbol: string) => {
    const findIx = userCoinFavourites.indexOf(symbol as never);

    userCoinFavourites.splice(findIx, 1);

    persistUserCoinFavourites(userCoinFavourites);

    setUserCoinFavourites([...[], ...userCoinFavourites]);
  };

  return (
    <UserCoinFavouritesContext.Provider
      value={{
        userCoinFavourites,
        addUserCoinFavourites,
        removeUserCoinFavourites
      }}
    >
      {children}
    </UserCoinFavouritesContext.Provider>
  );
};

export default UserCoinFavouritesProvider;
