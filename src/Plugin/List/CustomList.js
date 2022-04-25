import React from 'react';
import PropTypes from 'prop-types';
import { List,ListItem,ListItemText,Typography,Divider } from '@material-ui/core';
import UseStyles from "./styler";
const CustomList = ({list}) => {
  const classes = UseStyles();
    return (
        <List className={classes.rootList}>
        {list?.map((item) => (
          <>
            <ListItem alignItems="flex-start">
           
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="h6"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {item.title}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body1"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {item.body}
                    </Typography>
                  </React.Fragment>
                }
              />
              
            </ListItem>
            <Divider  />
           
          </>
        ))}
      </List>
    );
};

CustomList.propTypes = {
    
};

export default CustomList;