import React, { useState } from "react";
import PropTypes from "prop-types";
import MainQueue from "../../MainQueue";
const LobbyList = () => {
  const [open, setOpen] = useState(true);
  const [location, setlocation] = useState("");
  return (
    <div>
      <MainQueue location />
    </div>
  );
};

LobbyList.propTypes = {};

export default LobbyList;
