import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import UsermanageUI from "./UsermanageUI";

export default function MainUserManage() {
  return (
    <Container fixed>
      <UsermanageUI />
    </Container>
  );
}
