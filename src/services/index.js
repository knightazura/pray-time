const GEOCITIES_API =
  process.env.NODE_ENV === "production"
    ? "https://mzk-world-cities-api.herokuapp.com/v1"
    : import.meta.env.VITE_GEOCITIES_API;
const PRAYTIMES_API =
  process.env.NODE_ENV === "production"
    ? "https://api.aladhan.com/v1"
    : import.meta.env.VITE_PRAYTIMES_API;

const SERVICES = {
  GEOCITIES_API,
  PRAYTIMES_API
};

export default SERVICES;
