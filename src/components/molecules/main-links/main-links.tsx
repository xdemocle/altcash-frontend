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
import clsx from 'clsx';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { SyntheticEvent } from 'react';
import { UrlObject } from 'url';
// import useAuth from '../../hooks/use-auth';
import useStyles from './use-styles';

type Props = {
  isSidebarOpen: boolean;
};

const MainLinks = ({ isSidebarOpen }: Props) => {
  // const auth = useAuth();
  const router = useRouter();
  const classes = useStyles();

  const navTo = (e: SyntheticEvent, href: string | UrlObject) => {
    e.preventDefault();

    router.push(href);
  };

  return (
    <List component="nav" className={classes.nav}>
      <Tooltip
        title="Homepage"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItemButton
          component={'a'}
          href="/"
          selected={router.pathname == '/'}
          className={clsx(
            classes.listItem,
            router.pathname == '/' ? 'active' : ''
          )}
          onClick={(e: SyntheticEvent) => navTo(e, '/')}
        >
          <ListItemIcon>
            <HomeOutlined className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Home" className={classes.listItemText} />
        </ListItemButton>
      </Tooltip>

      <Tooltip
        title="Buy crypto coins"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItemButton
          component={'a'}
          href="/buy"
          className={clsx(
            classes.listItem,
            router.pathname == '/buy/[tab]' ? 'active' : ''
          )}
          selected={router.pathname == '/buy/[tab]'}
          onClick={(e: SyntheticEvent) => navTo(e, '/buy')}
        >
          <ListItemIcon>
            <MonetizationOnOutlined className={classes.icons} />
          </ListItemIcon>
          <ListItemText
            primary="Crypto Coins"
            className={classes.listItemText}
          />
        </ListItemButton>
      </Tooltip>

      <Tooltip
        title="About Us"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItemButton
          component={'a'}
          href="/about"
          selected={router.pathname == '/about'}
          className={clsx(
            classes.listItem,
            router.pathname == '/about' ? 'active' : ''
          )}
          onClick={(e: SyntheticEvent) => navTo(e, '/about')}
        >
          <ListItemIcon>
            <PeopleAltOutlined className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="About Us" className={classes.listItemText} />
        </ListItemButton>
      </Tooltip>

      <Tooltip
        title="Support"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItemButton
          component={'a'}
          href="/support"
          selected={router.pathname == '/support'}
          className={clsx(
            classes.listItem,
            router.pathname == '/support' ? 'active' : ''
          )}
          onClick={(e: SyntheticEvent) => navTo(e, '/support')}
        >
          <ListItemIcon>
            <ContactSupportOutlined className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Support" className={classes.listItemText} />
        </ListItemButton>
      </Tooltip>
    </List>
  );
};

export default MainLinks;
