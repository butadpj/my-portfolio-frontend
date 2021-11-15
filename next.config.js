const withPWA = require("next-pwa");

module.exports = withPWA({
  /* config options here */
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  env: {
    devHost: "http://127.0.0.1:8000", // Development hostname
    prodHost: "https://nenetelecom.pythonanywhere.com", // Production hostname
  },
  images: {
    domains: ["127.0.0.1", "nenetelecom.pythonanywhere.com"],
  },
});
