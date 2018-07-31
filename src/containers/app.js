// app.js　mapboxを使用する場合のサンプル
import React from 'react';
import {
  Container, connectToHarmowareVis,
  HarmoVisLayers, MovesLayer, DepotsLayer,
  MovesInput, DepotsInput, SimulationDateTime,
  PauseButton, PlayButton, ForwardButton, ReverseButton, AddMinutesButton,
  ElapsedTimeRange, SpeedRange, getContainerProp
} from 'harmoware-vis';
import { GeoJsonLayer } from 'deck.gl';

import GeoLayerInput from '../components/geo-layer-input';

import * as actions from '../actions';
import geo from '../reducers/geo';

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN; //mapbox.com から取得したAccesstoken

const COLOR_SCALE = [
  // negative
  [65, 182, 196],
  [127, 205, 187],
  [199, 233, 180],
  [237, 248, 177],

  // positive
  [255, 255, 204],
  [255, 237, 160],
  [254, 217, 118],
  [254, 178, 76],
  [253, 141, 60],
  [252, 78, 42],
  [227, 26, 28],
  [189, 0, 38],
  [128, 0, 38]
];

function colorScale(x) {
  const i = Math.round(x * 7) + 4;
  if (x < 0) {
    return COLOR_SCALE[i] || COLOR_SCALE[0];
  }
  return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1];
}

class App extends Container {

  constructor() {
    super();
    this.state = {
      popup: [0, 0, '']
    }
  }

  render() {
    const {popup} = this.state;
    const { settime, timeBegin, timeLength, actions, clickedObject, depotsData,
      secperhour, animatePause, animateReverse, getMoveOptionChecked, getDepotOptionChecked,
      getOptionChangeChecked, viewport, routePaths, lightSettings, movesbase, movedData, geo } = this.props;

    return (
      <div>
        <div id="controller_area">
          <ul>
            <li>
              <h3>Geoデータ</h3>
              <p><a target="_blank" href="https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json">https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json</a><br />を読み込んでみてください。</p>
              <GeoLayerInput actions={actions} />
            </li>
          </ul>
        </div>

        <div id="harmovis_area">
          <HarmoVisLayers
            viewport={viewport} actions={actions}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            layers={[
              new GeoJsonLayer({
                data: geo,
                opacity: 0.8,
                stroked: false,
                filled: true,
                extruded: true,
                wireframe: true,
                fp64: true,
                lightSettings,
                getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
                getFillColor: f => colorScale(f.properties.growth),
                getLineColor: [255, 255, 255],
                pickable: true,
              })
            ]}
          />
        </div>
        <svg width={viewport.width} height={viewport.height} className="svg-overlay">
          <g fill="white" fontSize="12">
            {popup[2].length > 0 ?
              popup[2].split('\n').map((value, index) =>
                <text
                  x={popup[0] + 10} y={popup[1] + (index * 12)}
                  key={index.toString()}
                >{value}</text>) : null
            }
          </g>
        </svg>
      </div>
    );
  }
}
export default connectToHarmowareVis(App, actions);