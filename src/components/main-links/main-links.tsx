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
import Link from 'next/link';
import { useRouter } from 'next/router';
// import useAuth from '../../hooks/use-auth';
import useStyles from './use-styles';

type Props = {
  isSidebarOpen: boolean;
};

const MainLinks = (props: Props) => {
  // const auth = useAuth();
  const router = useRouter();
  const classes = useStyles();
  const { isSidebarOpen } = props;

  return (
    <List component="nav" className={classes.nav}>
      <Tooltip
        title="Homepage"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <Link href="/">
          <ListItemButton
            component={'a'}
            href="/"
            selected={router.pathname == '/'}
            className={clsx(
              classes.listItem,
              router.pathname == '/' ? 'active' : ''
            )}
          >
            <ListItemIcon>
              <HomeOutlined className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="Home" className={classes.listItemText} />
          </ListItemButton>
        </Link>
      </Tooltip>

      <Tooltip
        title="Buy crypto coins"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <Link href="/buy">
          <ListItemButton
            component={'a'}
            href="/buy"
            className={clsx(
              classes.listItem,
              router.pathname == '/buy' ? 'active' : ''
            )}
            selected={router.pathname.search('/buy') !== -1}
          >
            <ListItemIcon>
              <MonetizationOnOutlined className={classes.icons} />
            </ListItemIcon>
            <ListItemText
              primary="Crypto Coins"
              className={classes.listItemText}
            />
          </ListItemButton>
        </Link>
      </Tooltip>

      <Tooltip
        title="About Us"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <Link href="/about">
          <ListItemButton
            component={'a'}
            href="/about"
            selected={router.pathname == '/about'}
            className={clsx(
              classes.listItem,
              router.pathname == '/about' ? 'active' : ''
            )}
          >
            <ListItemIcon>
              <PeopleAltOutlined className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="About Us" className={classes.listItemText} />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip
        title="Support"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <Link href="/support">
          <ListItemButton
            component={'a'}
            href="/support"
            selected={router.pathname == '/support'}
            className={clsx(
              classes.listItem,
              router.pathname == '/support' ? 'active' : ''
            )}
          >
            <ListItemIcon>
              <ContactSupportOutlined className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="Support" className={classes.listItemText} />
          </ListItemButton>
        </Link>
      </Tooltip>
    </List>
  );
};

export default MainLinks;
