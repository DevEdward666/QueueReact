import UsersReducers from "./UsersReducers";
import DefaultReducers from "./DefaultReducers";
import LoginReducers from "./LoginReducers";
import QueueReducers from "./QueueReducers";
import SignalRReducers from "./SignalRReducers";
import CashierReducers from "./CashierReducers";
import AdminReducers from "./AdminReducers";
import { combineReducers } from "redux";

const RootReducers = combineReducers({
  UsersReducers: UsersReducers,
  LoginReducers: LoginReducers,
  DefaultReducers: DefaultReducers,
  QueueReducers: QueueReducers,
  SignalRReducers: SignalRReducers,
  CashierReducers: CashierReducers,
  AdminReducers: AdminReducers,
});
export default RootReducers;
