import { createContext, ReactNode, useContext, useState } from 'react';
import { persistUserCoinFavourites } from '../common/utils';

type GlobalContextProps = {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  coinPageNeedle: string | undefined;
  setCoinPageNeedle: React.Dispatch<React.SetStateAction<string | undefined>>;
  coinListPage: number;
  setCoinListPage: React.Dispatch<React.SetStateAction<number>>;
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
  userCoinFavourites: [];
  setUserCoinFavourites: React.Dispatch<React.SetStateAction<[]>>;
  addUserCoinFavourites: (symbol: string) => void;
  removeUserCoinFavourites: (symbol: string) => void;
};

const userCoinFavouritesLocal =
  window.localStorage.getItem('userCoinFavourites');

export const GlobalContext = createContext<GlobalContextProps>(
  {} as GlobalContextProps
);

interface Props {
  children: ReactNode;
}

// eslint-disable-next-line react/prop-types
const GlobalProvider = ({ children }: Props) => {
  const [isSidebarOpen, setSidebarOpen] =
    useState<GlobalContextProps['isSidebarOpen']>(false);
  const [coinPageNeedle, setCoinPageNeedle] =
    useState<GlobalContextProps['coinPageNeedle']>(undefined);
  const [coinListPage, setCoinListPage] =
    useState<GlobalContextProps['coinListPage']>(1);
  const [tab, setTab] = useState<GlobalContextProps['tab']>(0);
  const [userCoinFavourites, setUserCoinFavourites] = useState<
    GlobalContextProps['userCoinFavourites']
  >(userCoinFavouritesLocal ? JSON.parse(userCoinFavouritesLocal) : []);

  const addUserCoinFavourites = (symbol: string) => {
    userCoinFavourites.push(symbol as never);

    persistUserCoinFavourites(userCoinFavourites);

    setUserCoinFavourites(userCoinFavourites);
  };

  const removeUserCoinFavourites = (symbol: string) => {
    const findIx = userCoinFavourites.indexOf(symbol as never);

    userCoinFavourites.splice(findIx, 1);

    persistUserCoinFavourites(userCoinFavourites);

    setUserCoinFavourites(userCoinFavourites);
  };

  return (
    <GlobalContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        coinPageNeedle,
        setCoinPageNeedle,
        coinListPage,
        setCoinListPage,
        tab,
        setTab,
        userCoinFavourites,
        setUserCoinFavourites,
        addUserCoinFavourites,
        removeUserCoinFavourites
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextProps => {
  return useContext(GlobalContext);
};

export default GlobalProvider;
