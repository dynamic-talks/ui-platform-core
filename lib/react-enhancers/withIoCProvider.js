//import { compose, setDisplayName, setPropTypes, withContext } from 'recompose';
import React from 'react';
import { IoCContainer } from 'libioc';
import PropTypes from 'prop-types';


const IOC_PROP_TYPES = {
  iocContainer: PropTypes.instanceOf(IoCContainer).isRequired,
};



export const withIoCProvider = (iocContainer) => (Component) => {

  class IoCProvider extends React.Component {
    static displayName        = 'IoCProvider';
    static childContextTypes  = IOC_PROP_TYPES;

    getChildContext() {
      return {
        iocContainer,
      };
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return IoCProvider;
};
