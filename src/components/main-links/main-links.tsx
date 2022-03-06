import {
  ContactSupportOutlined,
  HomeOutlined,
  LockOutlined,
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
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import useStyles from './use-styles';

type Props = {
  isSidebarOpen: boolean;
};

const MainLinks = (props: Props) => {
  const classes = useStyles();
  const { isSidebarOpen } = props;

  return (
    <List component="nav" className={classes.nav}>
      <Tooltip
        title="Homepage"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem component={NavLink} to="/" className={classes.listItem}>
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
        <ListItem component={NavLink} to="/buy" className={classes.listItem}>
          <ListItemIcon>
            <MonetizationOnOutlined className={classes.icons} />
          </ListItemIcon>
          <ListItemText
            primary="Crypto Coins"
            className={classes.listItemText}
          />
        </ListItem>
      </Tooltip>

      <Tooltip
        title="Your private area"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem
          component={NavLink}
          to="/overview"
          className={classes.listItem}
        >
          <ListItemIcon>
            <StorefrontOutlined className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Your area" className={classes.listItemText} />
        </ListItem>
      </Tooltip>

      <Tooltip
        title="About Us"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem component={NavLink} to="/about" className={classes.listItem}>
          <ListItemIcon>
            <PeopleAltOutlined className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="About Us" className={classes.listItemText} />
        </ListItem>
      </Tooltip>
      <Tooltip
        title="Support"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem
          component={NavLink}
          to="/support"
          className={classes.listItem}
        >
          <ListItemIcon>
            <ContactSupportOutlined className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Support" className={classes.listItemText} />
        </ListItem>
      </Tooltip>
      <Tooltip
        title="Login in your area"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem
          component={NavLink}
          to="/login"
          className={clsx(classes.listItem, classes.listItemLast)}
        >
          <ListItemIcon>
            <LockOutlined className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Login" className={classes.listItemText} />
        </ListItem>
      </Tooltip>
    </List>
  );
};

export default MainLinks;
