import { Switch } from "react-router-dom";
import Register from "pages/Register/Register";
import VaccineAvailability from "pages/VaccineAvailability/VaccineAvailability";

import RouteWrapper from "./Route";

const Routes = () => {
  return (
    <Switch>
      <RouteWrapper exact path="/" component={Register} />
      <RouteWrapper
        exact
        path="/availability"
        component={VaccineAvailability}
      />
    </Switch>
  );
};

export default Routes;
