export const environment = {
  production: true,
  appName: "SafeSai",
  appPrefix: "saf",
  localStorage: {
    settingsKey: "SETTINGS",
    authKey: "authorizationData"
  },
  appApi: {
    baseUrl: "https://api.vadar.vn/api"
  },
  identity: {
    baseUrl: "https://identity.vsec.com.vn",
    scope: "openid profile email roles vadar"
  },
  grafana: {
    baseUrl: "https://discover.vadar.vn"
  },
  ex: "https://ex.vadar.vsec.vn"
};
