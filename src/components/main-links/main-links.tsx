import {
  ContactSupportOutlined,
  HomeOutlined, // LockOutlined,
  MonetizationOnOutlined,
  PeopleAltOutlined,
  StorefrontOutlined
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
// import clsx from 'clsx';
import Link from 'next/link';
import useAuth from '../../hooks/use-auth';
import useStyles from './use-styles';

type Props = {
  isSidebarOpen: boolean;
};

const MainLinks = (props: Props) => {
  const auth = useAuth();
  const classes = useStyles();
  const { isSidebarOpen } = props;

  return (
    <List component="nav" className={classes.nav}>
      <Tooltip
        title="Homepage"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem component={Link} href="/" className={classes.listItem}>
          <ListItemIcon>
            <HomeOutlined className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Home" className={classes.listItemText} />
        </ListItem>
      </Tooltip>

      <Tooltip
        title="Buy crypto coins"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <Link href="/buy">
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <MonetizationOnOutlined className={classes.icons} />
            </ListItemIcon>
            <ListItemText
              primary="Crypto Coins"
              className={classes.listItemText}
            />
          </ListItem>
        </Link>
      </Tooltip>

      {!!auth.isAuthenticated && (
        <Tooltip
          title="Your private area"
          placement="right"
          enterDelay={isSidebarOpen ? 2000 : 50}
        >
          <Link href="/overview">
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <StorefrontOutlined className={classes.icons} />
              </ListItemIcon>
              <ListItemText
                primary="Your area"
                className={classes.listItemText}
              />
            </ListItem>
          </Link>
        </Tooltip>
      )}

      <Tooltip
        title="About Us"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <Link href="/about">
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <PeopleAltOutlined className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="About Us" className={classes.listItemText} />
          </ListItem>
        </Link>
      </Tooltip>
      <Tooltip
        title="Support"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <Link href="support">
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <ContactSupportOutlined className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="Support" className={classes.listItemText} />
          </ListItem>
        </Link>
      </Tooltip>
      {/* <Tooltip
        title="Login in your area"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem
          component={Link}
          to="/login"
          className={clsx(classes.listItem, classes.listItemLast)}
        >
          <ListItemIcon>
            <LockOutlined className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Login" className={classes.listItemText} />
        </ListItem>
      </Tooltip> */}
    </List>
  );
};

export default MainLinks;
