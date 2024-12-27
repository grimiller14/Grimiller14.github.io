import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [metar, setMetar] = useState(null);
  const [error, setError] = useState(null);

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
        setMetar(response.data); // Store the METAR data
      } catch (err) {
        setError("Failed to fetch METAR data. Please check the API or network.");
      }
    };

    fetchMETAR();
  }, []);

  return (
    <div>
      <h1>METAR Test for KBNA</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && (
        <div>
          <h2>METAR Data:</h2>
          {metar ? (
            <pre>{metar}</pre>
          ) : (
            <p>Loading METAR data for KBNA...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;