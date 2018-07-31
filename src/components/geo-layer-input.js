import React, { Component } from 'react';

export default class GeoLayerInput extends Component {

  onChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    const { actions } = this.props;
    reader.readAsText(file);
    reader.onload = () => {
      const data = JSON.parse(reader.result.toString());
      actions.setGeo(data);
      actions.setViewport({
        longitude: data.features[0].geometry.coordinates[0][0][0],
        latitude: data.features[0].geometry.coordinates[0][0][1]
      });
    }
  }

  render () {
    return (
      <input type="file" accept=".json" onChange={this.onChange.bind(this)} />
    )
  }
}