import axios from "axios";

const BASE_URL = "https://opensky-network.org/api/states/all";

export const fetchAircraft = async (lat, lon) => {
  try {
    const response = await axios.get(BASE_URL);
    const allAircraft = response.data.states;

    // Filter aircraft near the given lat/lon
    const nearbyAircraft = allAircraft.filter((plane) => {
      const planeLat = plane[6];
      const planeLon = plane[5];
      return Math.abs(planeLat - lat) < 1 && Math.abs(planeLon - lon) < 1;
    });

    return nearbyAircraft;
  } catch (error) {
    console.error("Error fetching aircraft:", error);
    throw error;
  }
};