import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectWithIoC } from "../react-enhancers/connectWithIoC";



class SVGIcon extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
    manifestManager: PropTypes.string
  };

  static defaultProps = {
    manifestManager: ''
  };

  render() {
    const {
      icon,
      manifestManager
    } = this.props;

    const spritePrefix = manifestManager && manifestManager.get('sprite.svg') ? `/build/${manifestManager.get('sprite.svg')}` : '';

    return (
      <svg
        /*eslint-disable react/no-danger */
        dangerouslySetInnerHTML={{__html: `<use xlink:href="${spritePrefix}#${icon}"></use>`}}
        /*eslint-enabled react/no-danger */
      />
    );
  }
}

export default connectWithIoC(['manifestManager'])(SVGIcon);
