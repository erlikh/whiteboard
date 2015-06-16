System.config({
  "baseURL": "/static",
  "transpiler": "traceur",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "pubsub-js": "npm:pubsub-js@1.5.2",
    "socket.io-client": "github:Automattic/socket.io-client@1.3.5",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:pubsub-js@1.5.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

