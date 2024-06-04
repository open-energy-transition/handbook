import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import { countries } from './countries';

import EarthNightUrl from '@site/static/img/earth-night-light.jpg';
import NightSkyUrl from '@site/static/img/night-sky-light.png';
import Dataset from '@site/static/datasets/worldcities.xlsx';
import GeoDataset from '@site/static/datasets/countries.json';
import team_data from "../../../team.json";
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const initialState = "unloaded";

function GlobeComponent() {
  const [loaded, setLoaded] = useState(initialState);
  const [places, setPlaces] = useState([]);
  const [arcs, setArcs] = useState([]);
  const [volcanoes, setVolcanoes] = useState([]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [countries, setCountries] = useState(GeoDataset);
  const [hoverD, setHoverD] = useState();

  const fetchData = async () => {
    try {
      let response = await fetch(Dataset);
      let json = await response.arrayBuffer();
      return { success: true, data: json };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const loadData = async () => {
    team_data.forEach(e => {
      e.randomAltitude = getRandomAltitude();
      e.randomColor = generateRandomHexColor();
    });

    setVolcanoes(team_data);

    let res = await fetchData();
    if (res.success) {
      const wb = XLSX.read(res.data, { type: "array" });
      const wc = wb.Sheets["worldcities"];
      const arcs = wb.Sheets["transactions"];
      const wc_data = XLSX.utils.sheet_to_json(wc, { header: 1 });
      const arcs_data = XLSX.utils.sheet_to_json(arcs, { header: 1 });

      const lon_ = [];
      const lat_ = [];
      const pop = [];
      const cities = [];
      const places_ = [];

      wc_data.forEach(data => {
        lon_.push(data[2]);
        lat_.push(data[1]);
        pop.push("0.25");
        cities.push(data[0]);
      });

      lon_.shift();
      lat_.shift();
      pop.shift();
      cities.shift();
      cities.forEach((city, index) => {
        places_.push({
          lat: lat_[index],
          lng: lon_[index],
          size: pop[index],
          city: city
        });
      });

      const arc_start_lat = [];
      const arc_start_lon = [];
      const arc_end_lon = [];
      const arc_end_lat = [];
      const start_city = [];
      const end_city = [];
      let _currentTransaction = "";

      arcs_data.forEach(data => {
        if (_currentTransaction === data[0]) {
          if (data[1] === "end") {
            end_city.push(data[2]);
            arc_end_lat.push(data[3]);
            arc_end_lon.push(data[4]);
          }
        } else {
          if (data[1] === "start") {
            start_city.push(data[2]);
            arc_start_lat.push(data[3]);
            arc_start_lon.push(data[4]);
            _currentTransaction = data[0];
          }
        }
      });

      const transaction = [];
      end_city.forEach((city, index) => {
        transaction.push({
          startlat: arc_start_lat[index],
          startlng: arc_start_lon[index],
          endlat: arc_end_lat[index],
          endlng: arc_end_lon[index],
          label: start_city[index] + " to " + city
        });
      });

      setArcs(transaction);
      setPlaces(places_);
      setLoaded('loaded');
    }
  };

  useEffect(() => {
    if (loaded === "unloaded" && ExecutionEnvironment.canUseDOM) {
      loadData();
    }

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [loaded]);

  function generateRandomHexColor() {
    const hexColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return hexColor;
  }

  const getRandomAltitude = () => 0.2 + Math.random() * 0.3;

  const getTooltip = d => `
    <div style="text-align: center">
      <div><b>${d.name}</b></div>
      <div>(${d.designation})</div>
      <img src="${d.image_link}" alt="${d.name}" style="width: 100px; height: auto;" />
    </div>
  `;

  const renderGlobe = () => {
    if (loaded !== 'loaded') {
      return <div>Loading...</div>;
    }

    const Globe = require('react-globe.gl').default;

    return (
      <Globe
        width={dimensions.width/1.35}
        height={dimensions.height/1.35}
        globeImageUrl={EarthNightUrl}
        backgroundImageUrl={NightSkyUrl}
        // arcsData={arcs}
        // arcStartLat={d => +d.startlat}
        // arcStartLng={d => +d.startlng}
        // arcEndLat={d => +d.endlat}
        // arcEndLng={d => +d.endlng}
        // arcDashLength={0.25}
        // arcDashGap={1}
        // arcLabel={d => d.label}
        // arcDashInitialGap={() => Math.random()}
        // arcDashAnimateTime={3000}
        // arcColor={() => "#9cff00"}
        // arcsTransitionDuration={0.3}
        // arcAltitudeAutoScale={1.2}
        // hexPolygonsData={countries.features}
        // hexPolygonResolutio={3}
        // hexPolygonMargin={0.7}
        // hexPolygonColor={() => "rgba(255,255,255, 1)"}
        // showAtmosphere={false}
        // pointsData={volcanoes}
        // pointLat="lat"
        // pointLng="lon"
        // // pointAltitude={d => d.randomAltitude}
        // polygonAltitude={0}
        // pointColor={d => d.randomColor}
        // pointRadius={0.9}
        // pointLabel={getTooltip}
        // labelsData={volcanoes}
        // labelLat="lat"
        // labelLng="lon"
        // labelAltitude={d => d.randomAltitude}
        // labelAltitude={0}
        // labelColor={d => d.randomColor}
        // labelDotOrientation={() => 'bottom'}
        // labelIncludeDot={true}
        // labelDotRadius={2}
        // labelText="name"
        // labelSize={3}
        // labelResolution={1}
        // labelLabel={getTooltip}

        polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
        polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
        polygonCapColor={d => d === hoverD ? 'steelblue' : 'red'}
        polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
        polygonStrokeColor={() => '#111'}
        polygonLabel={({ properties: d }) => `
          <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
          GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
          Population: <i>${d.POP_EST}</i>
        `}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}


        // hexPolygonsData={countries.features}
        // hexPolygonResolution={3}
        // hexPolygonMargin={0.3}
        // // hexPolygonUseDots={true}
        // hexPolygonColor={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`}
        // hexPolygonLabel={({ properties: d }) => `
        //   <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
        //   Population: <i>${d.POP_EST}</i>
        // `}
      />
    );
  };

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => renderGlobe()}
    </BrowserOnly>
  );
}

export default GlobeComponent;