import React from "react";
import { Route, RouteProps } from "react-router-dom";

interface IProps extends RouteProps {
  component: React.FC | (() => JSX.Element);
  isPrivate?: boolean;
  isLoginRoute?: boolean;
  isVerificationRoute?: boolean;
}

function RouteWrapper({
  component: Component,
  isPrivate,
  isLoginRoute,
  isVerificationRoute,
  ...rest
}: IProps) {
  /**
   * If not included on previous cases, redirect user to the desired route.
   */
  return <Route {...rest} component={Component} />;
}

export default RouteWrapper;
