import { createContext, ReactNode, useContext, useState } from 'react';

type GlobalContextProps = {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  coinPageNeedle: string | undefined;
  setCoinPageNeedle: React.Dispatch<React.SetStateAction<string | undefined>>;
  coinListPage: number;
  setCoinListPage: React.Dispatch<React.SetStateAction<number>>;
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
};

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
