import React, { useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const fetchMETAR = async () => {
      const BASE_URL = "https://aviationweather.gov/adds/dataserver_current/httpparam";

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            dataSource: "metars",
            requestType: "retrieve",
            format: "xml",
            stationString: "KBNA",
            hoursBeforeNow: 1,
            mostRecentForEachStation: "true",
          },
        });
        console.log("METAR Data:", response.data);
      } catch (error) {
        console.error("Error fetching METAR:", error);
      }
    };

    fetchMETAR();
  }, []);

  return <div>Testing METAR API for KBNA...</div>;
};

export default App;