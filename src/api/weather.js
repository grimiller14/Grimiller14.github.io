import axios from "axios";

const BASE_URL = "/adds/dataserver_current/httpparam";

export const fetchMETAR = async (icao) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        dataSource: "metars",
        requestType: "retrieve",
        format: "xml",
        stationString: icao,
        hoursBeforeNow: 1,
        mostRecentForEachStation: "true",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching METAR:", error);
    throw error;
  }
};

export const fetchTAF = async (icao) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        dataSource: "tafs",
        requestType: "retrieve",
        format: "json",
        stationString: icao,
        hoursBeforeNow: 1,
        mostRecentForEachStation: "true",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TAF:", error);
    throw error;
  }
};