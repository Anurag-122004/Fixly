// import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
  const { isLoggedin } = useContext(AppContent);

  return isLoggedin ? <Navigate to="/dashboard" /> : children;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;