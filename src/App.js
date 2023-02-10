import "./App.css";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import Navigation from "./Views/Navigation/Navigation";
import store from "./Services/Store";
import { Provider } from "react-redux";
import Login from "./Components/Containers/LoginCtnr";
import Main from "./Views/Main/Main";
import Cashier from "./Views/Cashier/Main";
import ReceptionCashierUI from "./Views/CashierReception/ReceptionCashierUI";
import AddCashier from "./Views/Admin/Add Cashier/CashierMain";
import MainAdmin from "./Views/Admin/MainAdmin";
import MainGenerator from "./Views/Generator/MainGenerator";
import "./../src/CustomStyles/PRSelectedInfo.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
const theme = createTheme({
  typography: {
    fontFamily: "Cambria",
  },
});
function App() {
  const LoginContainer = () => (
    <div>
      <Provider store={store}>
        <Route path="/Login" component={Login} />
      </Provider>
    </div>
  );
  const DefaultContainer = () => (
    <Provider store={store}>
      <Navigation />
      <Route exact path="/"> <Redirect push to="/Cashier"/></Route>
      <Route path="/Display" component={Main} />
      <Route path="/Cashier" component={Cashier} />
      <Route path="/ReceptionCashier" component={ReceptionCashierUI}/>
      <Route path="/AddCashier" component={AddCashier} />
      <Route path="/MainAdmin" component={MainAdmin} />
      <Route path="/Generator" component={MainGenerator} />
    </Provider>
  );
  return (
    <ThemeProvider theme={theme}>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/(login)" component={LoginContainer} />
            <Route component={DefaultContainer} />
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
