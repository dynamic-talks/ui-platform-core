import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectWithIoC } from "../react-enhancers/connectWithIoC";



class SVGIcon extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
    spritePath: PropTypes.string
  };

  static defaultProps = {
    spritePath: ''
  };

  render() {
    const {
      icon,
      spritePath
    } = this.props;

    return (
      <svg
        /*eslint-disable react/no-danger */
        dangerouslySetInnerHTML={{__html: `<use xlink:href="${spritePath}#${icon}"></use>`}}
        /*eslint-enabled react/no-danger */
      />
    );
  }
}

export default connectWithIoC(['manifestManager'])(SVGIcon);
