import { createStore } from "vuex";

import Feathers from "../plugins/feathers.js";

const actions = {
  async initialise(context) {
    const applications = await Feathers.service("visa").find();
    context.commit("patch", { totalApplications: applications.total });
    context.commit("patch", { applications: applications.data });
  },
  async discard(context, id) {
    let remaining = context.state.applications.filter(
      (single) => single._id !== id
    );
    context.commit("patch", { applications: remaining });
    context.commit("patch", {
      totalApplications: context.state.totalApplications - 1,
    });

    Feathers.service("visa").remove(id);
  },
  async update(context, payload) {
    context.commit("input", payload);
    await Feathers.service("visa")
      .patch(context.state.current._id, payload)
      .catch((error) => console.error(error));
  },
};

const mutations = {
  patch(state, payload) {
    if (!Object.keys(payload) || !Object.keys(payload).length === 0) {
      console.error(
        "patch payload should be an object that has more than one key"
      );
    }
    let key = Object.keys(payload)[0];
    state.key = payload[key];
  },
  input(state, payload) {
    if (!Object.keys(payload) || !Object.keys(payload).length === 0) {
      throw new Error(
        "patch payload should be an object that at least one key"
      );
    }
    let key = Object.keys(payload)[0];
    state.current.key = payload[key];
  },
};

const getters = {
  userHasApplications(state) {
    if (state.loggedIn) {
      return (
        state.applications &&
        !(state.applications.length === 0 && !state.current)
      );
    } else return false;
  },
};

const store = createStore({
  state() {
    return {
      current: null,
      applications: null,
      error: null,
      step: null,
      loggedIn: false,
    };
  },
  mutations,
  actions,
  getters,
});

export default store;
