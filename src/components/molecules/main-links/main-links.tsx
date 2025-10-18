import {
  ContactSupportOutlined,
  HomeOutlined, // LockOutlined,
  MonetizationOnOutlined,
  PeopleAltOutlined
} from '@mui/icons-material';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { SyntheticEvent } from 'react';
import { UrlObject } from 'url';
// import useAuth from '../../hooks/use-auth';

const StyledList = styled(List)({
  position: 'relative',
  height: 'calc(100% - 6rem)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0
});

const StyledListItemIcon = styled(ListItemIcon)({
  marginLeft: '1.3rem',
  marginRight: '1.4rem',
  color: '#A09EA0',
  '.active &': {
    color: '#fff'
  }
});

const StyledListItemText = styled(ListItemText)({
  paddingLeft: '.7rem'
});

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  flexGrow: '0 !important',
  position: 'relative',
  paddingLeft: '1rem',
  paddingRight: '1.8rem',
  margin: '0',
  height: '4.75rem',
  width: '100%',
  textDecoration: 'none !important',
  color: 'inherit',
  '&:visited': {
    color: 'inherit'
  },
  '&.active::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '1.5rem',
    width: '3.2rem',
    height: '3.2rem',
    borderRadius: '.6rem',
    backgroundColor: theme.palette.primary.main,
    zIndex: -1
  }
}));

type Props = {
  isSidebarOpen: boolean;
};

const MainLinks = ({ isSidebarOpen }: Props) => {
  // const auth = useAuth();
  const router = useRouter();

  const navTo = (e: SyntheticEvent, href: string | UrlObject) => {
    e.preventDefault();

    router.push(href);
  };

  return (
    <StyledList as="nav">
      <Tooltip
        title="Homepage"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <StyledListItemButton
          // component="a"
          // href="/"
          selected={router.pathname == '/'}
          className={clsx(router.pathname == '/' ? 'active' : '')}
          onClick={(e: SyntheticEvent) => navTo(e, '/')}
        >
          <StyledListItemIcon>
            <HomeOutlined />
          </StyledListItemIcon>
          <StyledListItemText primary="Home" />
        </StyledListItemButton>
      </Tooltip>

      <Tooltip
        title="Buy crypto coins"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <StyledListItemButton
          as="a"
          // href="/buy"
          className={clsx(
            router.pathname == '/buy' ||
              router.pathname == '/buy/[tab]' ||
              router.pathname == '/coin/[id]'
              ? 'active'
              : ''
          )}
          selected={
            router.pathname == '/buy' ||
            router.pathname == '/buy/[tab]' ||
            router.pathname == '/coin/[id]'
          }
          onClick={(e: SyntheticEvent) => navTo(e, '/buy')}
        >
          <StyledListItemIcon>
            <MonetizationOnOutlined />
          </StyledListItemIcon>
          <StyledListItemText primary="Crypto Coins" />
        </StyledListItemButton>
      </Tooltip>

      <Tooltip
        title="About Us"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <StyledListItemButton
          as="a"
          // href="/about"
          selected={router.pathname == '/about'}
          className={clsx(router.pathname == '/about' ? 'active' : '')}
          onClick={(e: SyntheticEvent) => navTo(e, '/about')}
        >
          <StyledListItemIcon>
            <PeopleAltOutlined />
          </StyledListItemIcon>
          <StyledListItemText primary="About Us" />
        </StyledListItemButton>
      </Tooltip>

      <Tooltip
        title="Support"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <StyledListItemButton
          as="a"
          // href="/support"
          selected={router.pathname == '/support'}
          className={clsx(router.pathname == '/support' ? 'active' : '')}
          onClick={(e: SyntheticEvent) => navTo(e, '/support')}
        >
          <StyledListItemIcon>
            <ContactSupportOutlined />
          </StyledListItemIcon>
          <StyledListItemText primary="Support" />
        </StyledListItemButton>
      </Tooltip>
    </StyledList>
  );
};

export default MainLinks;
