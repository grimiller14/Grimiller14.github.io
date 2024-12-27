import React, { useEffect } from "react";
import { fetchMETAR, fetchTAF } from "./api/weather";

const App = () => {
  useEffect(() => {
    const testAPI = async () => {
      try {
        const metar = await fetchMETAR("KJFK");
        console.log("METAR:", metar);

        const taf = await fetchTAF("KJFK");
        console.log("TAF:", taf);
      } catch (error) {
        console.error("API Test Failed:", error);
      }
    };

    testAPI();
  }, []);

  return <div>Testing METAR/TAF API...</div>;
};

export default App;