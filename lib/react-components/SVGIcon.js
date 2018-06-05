import React, { Component } from 'react';
import PropTypes from 'prop-types';



export class SVGIcon extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
  };

  render() {
    const { icon } = this.props;
    return (
      <svg
        /*eslint-disable react/no-danger */
        dangerouslySetInnerHTML={{__html: `<use xlink:href=#${icon}></use>`}}
        /*eslint-enabled react/no-danger */
      />
    );
  }
}
