import { Drawer, IconButton, styled, Typography } from '@mui/material';

export const DrawerStyled = styled(Drawer)(({ theme }) => ({
  zIndex: 2,
  position: 'relative',
  whiteSpace: 'nowrap',
  minHeight: '100vh',
  overflow: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  [theme.breakpoints.up('xl')]: {
    minHeight: '100%'
  }
}));

export const ToolbarStyled = styled('div')(({ theme }) => ({
  position: 'absolute',
  overflow: 'hidden',
  width: '6rem',
  height: '100%',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  [theme.breakpoints.up('xl')]: {
    position: 'relative',
    overflowY: 'auto'
  }
}));

export const ToolbarHeaderStyled = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  padding: '1.5rem'
}));

export const ButtonLogoStyled = styled(IconButton)(() => ({
  padding: 0,
  backgroundColor: 'transparent !important'
}));

export const ToolbarTitleStyled = styled(Typography)(() => ({
  margin: '0 1.5rem'
}));
