import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import { getToken, getUser, setUserToSessionStorage } from '../helpers/sessionStorage'

const PrivateRoute = (props) => {
  const hasToken = getToken()

  useEffect(() => {
    const user = getUser()

  }, [])

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