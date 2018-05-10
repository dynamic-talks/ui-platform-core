import React, { Component } from 'react';

export class SVGIcon extends Component {
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
