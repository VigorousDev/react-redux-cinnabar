import React, { Component } from 'react';
import L from 'leaflet';
import { heatLayer } from 'leaflet.heat';
import Paper from 'material-ui/Paper';

class ReturnsMap extends Component {
  constructor(props) {
    super(props);
    this.buildMap = this.buildMap.bind(this);
    this.stores = [
      [33.579218,	-84.57706, 'Alpharetta, GA'],
      [33.837712,	-84.380637, '3035 Peachtree Road NE Atlanta, GA'],
      [30.265541,	-97.747961, '436 W 2nd Street Austin, TX'],
      [30.397404,	-97.726203, '11700 Domain Blvd Austin, TX'],
      [38.980798,	-77.095301, '4836 Bethesda Avenue Bethesda, MD'],
      [39.022142,	-77.148498, '7101 Democracy Blvd Bethesda, MD D'],
      [42.351125,	-71.077939, 'Boston, MA'],
      [41.918002,	-87.65014, 'Chicago, IL'],
      [41.899359,	-87.624127, 'Chicago, IL'],
      [32.811549,	-96.77452, 'Dallas, TX'],
      [29.74384,	-95.453235, 'Houston, TX'],
      [34.073376,	-118.344249, 'Los Angeles, CA'],
      [25.773465,	-80.235373, 'Miami, FL'],
      [44.98297,	-93.270508, 'Minneapolis, MN'],
      [36.104342,	-86.819789, 'Nashville, TN'],
      [33.614525,	-117.878064, 'Newport Beach, CA'],
      [40.714436,	-74.015804, '250 Vesey Street New York'],
      [40.730223,	-73.988564, '95 Fifth Avenue New York, NY'],
      [40.741974,	-73.986215, '45 W 25th Street, 5th Floor New York, NY'],
      [40.758854,	-73.975042, '488 Madison Ave New York, NY'],
      [40.720914,	-73.99934, '35 Crosby Street New York, NY'],
      [40.089215,	-75.388507, 'King of Prussia, PA'],
      [39.949806,	-75.166723, 'Philadelphia, PA'],
      [32.873729,	-117.208681, 'San Diego, CA'],
      [37.787445,	-122.405249, 'San Francisco, CA'],
      [37.322985,	-121.948035, 'San Jose, CA'],
      [47.666487,	-122.309849, 'Seattle, WA'],
      [33.584324,	-111.926001, 'Scottsdale, AZ'],
      [38.904559,	-77.066713, '3320 Cady\'s Alley Washington, DC'],
      [38.916539,	-77.023213, '1924 8th Street NW Suite 123 Washington, DC'],
    ];
  }

  componentDidMount() {
    this.buildMap();
  }

  buildMap() {
    const stores = this.stores.map(s => [`${s[0]}`, `${s[1]}`]);
    let heatmapLayer;
    if (this.props.mapData[0]) {
      const data = this.props.mapData.slice(0, 1000).filter(d => d[0]).concat(stores);
      heatmapLayer = L.heatLayer(data,
        {
          radius: 20,
          maxZoom: 21,
          minOpacity: 0.5,
        });
    }

    const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    });

    const map = L.map('map', {
      center: new L.LatLng(39.8282, -98.5795),
      zoom: 4,
      layers: heatmapLayer ? [baseLayer, heatmapLayer] : [baseLayer],
    });

    const randNumber = () => {
      const num = (Math.random() * 20);
      return num > 50 ? 14 : num;
    };

    this.stores.map(s => L.marker(s).bindPopup(
      '<div>' +
        '<div>' + s[2] + '</div>' +
        '<div>' + randNumber().toFixed(1) + '% returns</div>' +
      '</div>'
    ).addTo(map));
  }

  render() {
    return (
      <Paper zDepth={1} style={{ height: '100%', width: '100%' }}>
        <div id="map" style={{ height: '100%' }}></div>
      </Paper>
    );
  }
}


ReturnsMap.propTypes = {
  mapData: React.PropTypes.array.isRequired,
};


export default ReturnsMap;
