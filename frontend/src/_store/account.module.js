import { userService } from "../_services";
import { router } from "../_helpers";

const user = JSON.parse(localStorage.getItem("user"));
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const actions = {
  login({ dispatch, commit }, { email, password }) {
    commit("loginRequest", { email });

    userService.login(email, password).then(
      () => {
        commit("loginSuccess", user);
        // go to HomePage
        router.push("/");
      },
      (error) => {
        commit("loginFailure", error);
        // send error message
        dispatch("alert/error", error, { root: true });
      }
    );
  },
  logout({ commit }) {
    userService.logout();
    commit("logout");
  },
  register({ dispatch, commit }, user) {
    commit("registerRequest", user);

    userService.register(user).then(
      () => {
        commit("registerSuccess", user);
        // go to LoginPage
        router.push("/login");
        setTimeout(() => {
          // display success message after route change completes
          dispatch("alert/success", "Registration successful", { root: true });
        });
      },
      (error) => {
        commit("registerFailure", error);
        // send error message
        dispatch("alert/error", error, { root: true });
      }
    );
  },
};

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state) {
    state.status = { registering: true };
  },
  registerSuccess(state) {
    state.status = {};
  },
  registerFailure(state) {
    state.status = {};
  },
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations,
};
