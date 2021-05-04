import { Switch } from "react-router-dom";
import Register from "pages/Register/Register";

import RouteWrapper from "./Route";

const Routes = () => {
  return (
    <Switch>
      <RouteWrapper exact path="/" component={Register} isLoginRoute />
    </Switch>
  );
};

export default Routes;
