import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import LooksOneIcon from '@material-ui/icons/LooksOne';
import WeekendIcon from '@material-ui/icons/Weekend';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import clsx from "clsx";
import React from "react";
import useStyles from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CashierMain from "./Add Cashier/CashierMain";
import AddLobbyMain from "./Add Lobby/AddLobbyMain";
import NumberMain from "./Add Number/NumberMain";
import Toolbar from '@material-ui/core/Toolbar';
import MainUserManage from "./User Management/MainUserManage";
export default function MainAdmin() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [hidecashier, sethidecashier] = React.useState(true);
  const [hidelobby, sethidelobby] = React.useState(true);
  const [hideaddnumber, sethideaddnumber] = React.useState(true);
  const [hideusermanage, sethideusermanage] = React.useState(true);
  const drawerWidth = 240;
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
         className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
      <div className={classes.drawerContainer}>
        <List
          onMouseEnter={() => handleDrawerOpen()}
          onMouseLeave={() => handleDrawerClose()}
        >
          <ListItem button onClick={() => CashierClick()}>
            <ListItemIcon>
              <HowToRegIcon />
            </ListItemIcon>
            <ListItemText primary="Add Counter" />
          </ListItem>

          <ListItem button onClick={() => NumberClick()}>
            <ListItemIcon>
              <LooksOneIcon />
            </ListItemIcon>
            <ListItemText primary="Add Number" />
          </ListItem>

          <ListItem button onClick={() => LobbyClick()}>
            <ListItemIcon>
              <WeekendIcon />
            </ListItemIcon>
            <ListItemText primary="Add Lobby" />
          </ListItem>


          <ListItem button onClick={() => UserManageClick()}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="User Management" />
          </ListItem>
        </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {hidecashier ? null : <CashierMain />}
        {hidelobby ? null : <AddLobbyMain />}
        {hideaddnumber ? null : <NumberMain />}
        {hideusermanage ? null : <MainUserManage />}
      </main>
    </div>
  );
}
