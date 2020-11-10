import "core-js/stable";
import "regenerator-runtime/runtime";
import * as React from 'react';
import {Component} from 'react';
import MapGL, {Source, Layer} from 'react-map-gl';
import ControlPanel from './control-panel';
import Table from './table';
import {heatmapLayer} from './map-style';

// import 'mapbox-gl/dist/mapbox-gl.css';
import 'bulma/css/bulma.css'

const MAPBOX_TOKEN = process.env.REACT_APP_MapboxAccessToken; // Set your mapbox token here

function filterFeaturesByDay(featureCollection, time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter(feature => {
    const featureDate = new Date(feature.properties.ts_start);
    return (
      featureDate.getFullYear() === year &&
      featureDate.getMonth() === month &&
      featureDate.getDate() === day
    );
  });
  return {type: 'FeatureCollection', features};
}



export default class App extends Component {
  constructor(props) {
    super(props);
    const current = new Date().getTime();

    this.state = {
      filter:[
        "all",     
        [">=", ['get', 'ts_start'], 1598274000000],
        ["<=", ['get', 'ts_start'], 1598284800000]
      ],
      viewport: {
        latitude: 21.296781688577397,
        longitude: -157.81545064227578,
        zoom: 16,
        bearing: 0,
        pitch: 0
      },
      allDay: true,
      startTime: current,
      endTime: current,
      selectedTime: current,
      earthquakes: null,
      deviceList: []
    };

    this._handleChangeDay = this._handleChangeDay.bind(this);
    this._handleChangeAllDay = this._handleChangeAllDay.bind(this);
    this.queryTable = this.queryTable.bind(this);
  }

  async queryTable(time){
    const response = await fetch(
      `${process.env.REACT_APP_TO_DO_ITEMS_API}/item?start_date=` + time 
    );
    const items = await response.json();
    console.log(items)
  
    if (items && Array.isArray(items) && items.length) {
      // @ts-ignore
      this.setState({deviceList: items});
    }
  }

  async componentDidMount() {

    // const features = dataset.features;
    // const  startTime = features[0].properties.ts_start;
    // const endTime = features[features.length - 1].properties.ts_start;
    const response = await fetch(
      `${process.env.REACT_APP_TO_DO_ITEMS_API}/item?start_date=1598249215000` 
    );
    const items = await response.json();
    console.log(items)

    if (items && Array.isArray(items) && items.length) {
      // @ts-ignore
      this.setState({deviceList: items});
    }

    console.log(this.state.deviceList[0].building);
    const  startTime = 1598274000000;
    const endTime = 1599613140000;

    this.setState({
      endTime,
      startTime,
      selectedTime: endTime
    });
    console.log(startTime);
    console.log(endTime)
  }

  _onViewportChange = viewport => this.setState({viewport});

  _handleChangeDay = time => {
    this.setState({selectedTime: time});
    const lastDay = time - 10800000;
    this.setState({filter:[
        "all",     
        [">=", ['get', 'ts_start'], lastDay],
        ["<=", ['get', 'ts_start'], time]
      ]});
    console.log(this.state.filter);
    this.queryTable(time);
  };

  _handleChangeAllDay = allDay => {
    this.setState({allDay});
  };

  render() {
    const {viewport, data, allDay, selectedTime, startTime, endTime, filter} = this.state;
    return (
      <div style={{ height: "100vh" }}>
        <MapGL
          {...viewport}
          center={[-157.81545064227578, 21.296781688577397]}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._onViewportChange}
          onHover={this._onHover}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          minZoom={16}
        >
          {/* <Source type="vector" url="mapbox://jawmes.9ibjkhwl" >
            <Layer source-layer='ratio-76t48z' {...heatmapLayer} filter={this.state.filter}/>
          </Source> */}
          <Source type="vector" url="mapbox://jawmes.ap2y6u8z" >
            <Layer source-layer='data-2or5ij' {...heatmapLayer} filter={filter}/>
          </Source>
        </MapGL>
        <ControlPanel
          containerComponent={this.props.containerComponent}
          startTime={startTime}
          endTime={endTime}
          selectedTime={selectedTime}
          allDay={allDay}
          onChangeDay={this._handleChangeDay}
          onChangeAllDay={this._handleChangeAllDay}
        />
        <Table
          deviceList={this.state.deviceList}
        />    
      </div>
    );
  }
}

// export function renderToDom(container) {
//   render(<App />, container);
// }
