require("dotenv").config();
module.exports = () => {
  const envVars = {
    MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI,
    JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
    JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
    PORT: process.env.PORT,
  };

  const missingVars = [];
  for (const variable in envVars) {
    if (typeof envVars[variable] == "undefined") {
      missingVars.push(variable);
    }
  }

  if (missingVars.length) {
    throw new Error("Missing environment variables " + missingVars);
  }
};
