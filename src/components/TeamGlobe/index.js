import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import EarthNightUrl from '@site/static/img/earth-night.jpg';
import NightSkyUrl from '@site/static/img/night-sky.png';
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [countries, setCountries] = useState(GeoDataset);
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      
      const handleResize = () => {
        if(window.innerWidth<1000)
          {
            setDimensions({ width: window.innerWidth/1.1, height: window.innerHeight/1.3});
          }
          else
          {
            setDimensions({ width: window.innerWidth/1.73, height: window.innerHeight/1.3 });
          }
      };
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);


  const fetchData = async () => {
    try {
      let response = await fetch(Dataset);
      let json = await response.arrayBuffer();
      return { success: true, data: json };
    } catch (error) {
      return { success: false };
    }
  };

  const loadData = async () => {
    
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
  }, [loaded]);

  function countryColor({ properties: d }){
    let color = 'grey'

    team_data.forEach(i => {
      if (d.ADMIN === i.country) {
        console.log('match')
        color = 'yellow'
      }
    });

    return color
  }

  const getTooltip = ({ properties: d }) => {

    // let returnHTML = `
    //   <b>${d.ADMIN} (${d.ISO_A2}):</b>`;

    let returnHTML=''
  
    let membersHTML = '';
  
    team_data.forEach(i => {
      if (d.ADMIN === i.country) {
        membersHTML += `
          <div style="padding:5px">
            <div><b>${i.name}</b></div>      
            <img src="${i.image_link}" alt="${i.name}" style="width: 100px; height: auto;" />
          </div>
        `;
      }
    });
  // <div>(${i.designation})</div>
    if (membersHTML) {
      returnHTML += `<div style="text-align: center; margin-top: 10px; border: 1px solid white; background-color: gray; padding:10px; display:flex  ">${membersHTML}</div>`;
    }
  
    return returnHTML;
  };

  function hoverHeight({ properties: d }){
    let height = 0.06

    team_data.forEach(i => {
      if (d.ADMIN === i.country) {
        console.log('match')
        height = 0.12
      }
    });

    return height
  }
  const renderGlobe = () => {
    if (loaded !== 'loaded') {
      return <div>Loading...</div>;
    }

    const Globe = require('react-globe.gl').default;

    return (
      <Globe
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl={EarthNightUrl}
        backgroundImageUrl={NightSkyUrl}
        arcsData={arcs}
        arcStartLat={d => +d.startlat}
        arcStartLng={d => +d.startlng}
        arcEndLat={d => +d.endlat}
        arcEndLng={d => +d.endlng}
        arcDashLength={0.25}
        arcDashGap={1}
        arcLabel={d => d.label}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={3000}
        arcColor={() => "#9cff00"}
        arcsTransitionDuration={0.3}
        arcAltitudeAutoScale={1.2}
        polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
        polygonAltitude={d => d === hoverD ? hoverHeight(d) : 0.06}
        polygonCapColor={d => d === hoverD ? 'steelblue':countryColor(d)}
        polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
        polygonStrokeColor={() => '#111'}
        polygonLabel={getTooltip}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
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