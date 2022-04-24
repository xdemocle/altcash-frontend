import { Hidden, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import clsx from 'clsx';
import { useEffect } from 'react';
import Logo from '../../assets/logo.png';
import { useGlobal } from '../../context/global';
import MainLinks from '../main-links';
import styles from './sidebar.module.scss';
import {
  ButtonLogoStyled,
  DrawerStyled,
  ToolbarHeaderStyled,
  ToolbarStyled,
  ToolbarTitleStyled
} from './styled';

const Sidebar = () => {
  const { breakpoints } = useTheme();
  const isDownMd = useMediaQuery(breakpoints.down('md'));
  const { isSidebarOpen, setSidebarOpen } = useGlobal();

  useEffect(() => {
    if (isDownMd) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isDownMd, setSidebarOpen]);

  const handleDrawerToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Hidden smDown>
      <DrawerStyled
        variant="permanent"
        anchor="left"
        className={clsx(
          styles['DrawerStyled'],
          !isSidebarOpen ? styles['DrawerStyled--Close'] : ''
        )}
        classes={{
          paper: clsx(
            styles['DrawerStyled-Paper'],
            !isSidebarOpen ? styles['DrawerStyled-Paper--Close'] : ''
          )
        }}
        ModalProps={{
          // Better open performance on mobile.
          keepMounted: true
        }}
        open={isSidebarOpen}
      >
        <ToolbarStyled
          className={isSidebarOpen ? styles['DrawerStyled-Toolbar--Open'] : ''}
        >
          <Tooltip
            title={`${isSidebarOpen ? 'Collapse' : 'Expand'} sidebar`}
            placement="right"
          >
            <ToolbarHeaderStyled>
              <ButtonLogoStyled
                disableRipple
                onClick={handleDrawerToggle}
                aria-label="toggle drawer"
              >
                <img src={Logo} alt="logo.png" width="48" />
              </ButtonLogoStyled>
              <ToolbarTitleStyled variant="subtitle1">
                Altcash
              </ToolbarTitleStyled>
            </ToolbarHeaderStyled>
          </Tooltip>

          <MainLinks isSidebarOpen={isSidebarOpen} />
        </ToolbarStyled>
      </DrawerStyled>
    </Hidden>
  );
};

export default Sidebar;