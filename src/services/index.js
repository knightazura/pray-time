const GEOCITIES_API =
  process.env.NODE_ENV === "production"
    ? process.env.VITE_GEOCITIES_API
    : import.meta.env.VITE_GEOCITIES_API;
const PRAYTIMES_API =
  process.env.NODE_ENV === "production"
    ? process.env.VITE_PRAYTIMES_API
    : import.meta.env.VITE_PRAYTIMES_API;

const SERVICES = {
  GEOCITIES_API,
  PRAYTIMES_API
};

export default SERVICES;
