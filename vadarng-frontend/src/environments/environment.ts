export const environment = {
  production: false,
  appName: "SafeSai",
  appPrefix: "saf",
  localStorage: {
    settingsKey: "SETTINGS",
    authKey: "authorizationData"
  },
  appApi: {
    baseUrl: "http://localhost:60000/api"
  },
  identity: {
    baseUrl: "https://bbcidentity.maketit.net",
    scope: "openid profile email roles vadar"
  },
  grafana: {
    baseUrl: "https://portal.vadar.vsec.vn"
  },
  ex: "http://localhost:8080"
};
