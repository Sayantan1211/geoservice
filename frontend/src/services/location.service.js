import { axios } from "./axios";

export const getLocationDetails = async (locationName) => {
  return await axios.get(`location?location_name=${locationName}`);
};
