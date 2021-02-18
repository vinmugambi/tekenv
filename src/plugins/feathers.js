import feathers from "@feathersjs/feathers";
import restClient from "@feathersjs/rest-client";
import auth from "@feathersjs/authentication-client";
import {provide} from "vue";

const rest = restClient(import.meta.env.VITE_API);

// const socket = io("http://localhost:3030", { transports: ["websocket"] });

const feathersClient = feathers()
  // .configure(socketio(socket))
  .configure(rest.fetch(window.fetch))
  .configure(auth({ storage: window.localStorage }));

export const provideFeathers = () => {
  provide("feathers", feathersClient);
};

feathersClient.service("visa").hooks({
  before: {},
  after: {},
  error: {
    all: [
      async (context) => {
        console.error(context.service.name, context.method, context.error);
      },
    ],
  },
});

export default feathersClient;