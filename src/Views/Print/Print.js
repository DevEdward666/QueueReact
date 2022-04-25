import React, { useState } from "react";
import PropTypes from "prop-types";

const Print = ({ Countername, Queueno, handlePrint }) => {
  if (handlePrint === true) {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var output =
      (month < 10 ? "0" : "") +
      month +
      "/" +
      (day < 10 ? "0" : "") +
      day +
      "/" +
      date.getFullYear();

    setTimeout(function () {
      var mywindow = window.open(``, `PRINT`, `height=200,width=300`);
      mywindow.document.write(`<html><head><title></title>`);
      mywindow.document.write(`</head><body>`);
      mywindow.document.write(`<h2 align="center">${Countername}</h2>`);
      mywindow.document.write(`<h1 align="center">${Queueno}</h1>`);
      mywindow.document.write(`<h6 align="center">${output}</h6>`);
      mywindow.document.write(`</body></html>`);
      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/
      mywindow.print();
      mywindow.close();

      return true;
    }, 50);
  }
};

Print.propTypes = {};

export default Print;
