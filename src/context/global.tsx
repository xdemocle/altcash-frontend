import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { useLocation } from 'react-router-dom';
import {
  BUY_TABS_DEFAULT,
  BUY_TAB_ALL,
  BUY_TAB_FAVOURITE,
  BUY_TAB_FEATURED
} from '../common/constants';

type GlobalContextProps = {
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  coinPageNeedle: string | undefined;
  setCoinPageNeedle: Dispatch<SetStateAction<string | undefined>>;
  coinListPage: number;
  setCoinListPage: Dispatch<SetStateAction<number>>;
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
};

export const GlobalContext = createContext<GlobalContextProps>(
  {} as GlobalContextProps
);

interface Props {
  children: ReactNode;
}

const GlobalProvider = ({ children }: Props) => {
  const location = useLocation();
  let defaultTab = BUY_TABS_DEFAULT;

  if (location.pathname === '/buy/featured') {
    defaultTab = BUY_TAB_FEATURED;
  } else if (location.pathname === '/buy/all') {
    defaultTab = BUY_TAB_ALL;
  } else if (location.pathname === '/buy/favourite') {
    defaultTab = BUY_TAB_FAVOURITE;
  }

  const [tab, setTab] = useState<GlobalContextProps['tab']>(defaultTab);

  const [isSidebarOpen, setSidebarOpen] =
    useState<GlobalContextProps['isSidebarOpen']>(false);
  const [coinPageNeedle, setCoinPageNeedle] =
    useState<GlobalContextProps['coinPageNeedle']>(undefined);
  const [coinListPage, setCoinListPage] =
    useState<GlobalContextProps['coinListPage']>(1);

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
        setTab
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
