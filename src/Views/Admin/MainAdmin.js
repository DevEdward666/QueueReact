import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import React from "react";
import useStyles from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CashierMain from "./Add Cashier/CashierMain";
import AddLobbyMain from "./Add Lobby/AddLobbyMain";
import NumberMain from "./Add Number/NumberMain";
import MainUserManage from "./User Management/MainUserManage";
export default function MainAdmin() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [hidecashier, sethidecashier] = React.useState(true);
  const [hidelobby, sethidelobby] = React.useState(true);
  const [hideaddnumber, sethideaddnumber] = React.useState(true);
  const [hideusermanage, sethideusermanage] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const CashierClick = () => {
    sethidecashier(false);
    sethidelobby(true);
    sethideaddnumber(true);
    sethideusermanage(true);
  };
  const LobbyClick = () => {
    sethidecashier(true);
    sethidelobby(false);
    sethideaddnumber(true);
    sethideusermanage(true);
  };
  const NumberClick = () => {
    sethidecashier(true);
    sethidelobby(true);
    sethideaddnumber(false);
    sethideusermanage(true);
  };
  const UserManageClick = () => {
    sethidecashier(true);
    sethidelobby(true);
    sethideaddnumber(true);
    sethideusermanage(false);
  };
  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <List
          onMouseEnter={() => handleDrawerOpen()}
          onMouseLeave={() => handleDrawerClose()}
        >
          <ListItem button onClick={() => CashierClick()}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Cashier" />
          </ListItem>

          <ListItem button onClick={() => LobbyClick()}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Lobby" />
          </ListItem>

          <ListItem button onClick={() => NumberClick()}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Number" />
          </ListItem>

          {/* <ListItem button onClick={() => UserManageClick()}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="User Management" />
          </ListItem> */}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {hidecashier ? null : <CashierMain />}
        {hidelobby ? null : <AddLobbyMain />}
        {hideaddnumber ? null : <NumberMain />}
        {/* {hideusermanage ? null : <MainUserManage />} */}
      </main>
    </div>
  );
}
