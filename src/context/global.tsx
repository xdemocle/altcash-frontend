import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react';
import {
  BUY_TABS_DEFAULT,
  BUY_TAB_ALL,
  BUY_TAB_FAVOURITE,
  BUY_TAB_FEATURED
} from '../common/constants';

export interface GlobalContextProps {
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  coinPageNeedle: string;
  setCoinPageNeedle: Dispatch<SetStateAction<string>>;
  coinListPage: number;
  setCoinListPage: Dispatch<SetStateAction<number>>;
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
  bitcoinRandPrice: number;
  setBitcoinRandPrice: Dispatch<SetStateAction<number>>;
}

export const GlobalContext = createContext<GlobalContextProps>(
  {} as GlobalContextProps
);

interface Props {
  children: ReactNode;
}

const GlobalProvider = ({ children }: Props) => {
  const router = useRouter();
  let defaultTab = BUY_TABS_DEFAULT;

  if (router.pathname === '/buy/featured') {
    defaultTab = BUY_TAB_FEATURED;
  } else if (router.pathname === '/buy/all') {
    defaultTab = BUY_TAB_ALL;
  } else if (router.pathname === '/buy/favourite') {
    defaultTab = BUY_TAB_FAVOURITE;
  }

  const [tab, setTab] = useState<GlobalContextProps['tab']>(defaultTab);

  const [isSidebarOpen, setSidebarOpen] =
    useState<GlobalContextProps['isSidebarOpen']>(false);
  const [coinPageNeedle, setCoinPageNeedle] =
    useState<GlobalContextProps['coinPageNeedle']>('');
  const [coinListPage, setCoinListPage] =
    useState<GlobalContextProps['coinListPage']>(1);
  const [bitcoinRandPrice, setBitcoinRandPrice] =
    useState<GlobalContextProps['bitcoinRandPrice']>(0);

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
        bitcoinRandPrice,
        setBitcoinRandPrice
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
