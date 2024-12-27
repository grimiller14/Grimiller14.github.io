import React, { useState, useEffect } from "react";
import { fetchMETAR, fetchTAF } from "./api/weather";
import { fetchAircraft } from "./api/opensky";

const App = () => {
  const [metar, setMetar] = useState(null);
  const [taf, setTaf] = useState(null);
  const [aircraft, setAircraft] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metarData = await fetchMETAR("KJFK");
        setMetar(metarData);

        const tafData = await fetchTAF("KJFK");
        setTaf(tafData);

        const aircraftData = await fetchAircraft(40.6413, -73.7781); // JFK coordinates
        setAircraft(aircraftData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>ATC Practice Tool</h1>
      <h2>Weather</h2>
      <pre>{metar ? JSON.stringify(metar, null, 2) : "Loading METAR..."}</pre>
      <pre>{taf ? JSON.stringify(taf, null, 2) : "Loading TAF..."}</pre>
      <h2>Nearby Aircraft</h2>
      <pre>{aircraft.length > 0 ? JSON.stringify(aircraft, null, 2) : "Loading Aircraft..."}</pre>
    </div>
  );
};

export default App;