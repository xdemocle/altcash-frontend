import { useContext } from 'react';
import { GlobalContext, GlobalContextProps } from '../context/global';

const useGlobal = (): GlobalContextProps => {
  return useContext(GlobalContext);
};

export default useGlobal;
