import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getToken } from '../helpers/sessionStorage'

const PrivateRoute = (props) => {

  const hasToken = getToken()

  return hasToken
    ? (
      <Route path={props.path} exact={props.exact} component={props.component} />
    )
    :
    (
      <Redirect to="/login" />
    );
};

export default PrivateRoute