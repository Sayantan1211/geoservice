import ax from "axios";
import { baseApiUrl } from "../config/config";

export const axios = ax.create({
  baseURL: `${baseApiUrl}`,
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
  timeout: 50000,
});
