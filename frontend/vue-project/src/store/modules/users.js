import axios from 'axios';

const state = {
  user: null,
};

const getters = {
  isAuthenticated: (state) => {
    return !!state.user;
  },
  stateUser: state => state.user,
};

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

const actions = {
    register({dispatch}, form) {
        return axios.post('register', form)
            .then(() => {
                sleep(500).then(() => {
                    let UserForm = new FormData();
                    UserForm.append('username', form.username);
                    UserForm.append('password', form.password);
                    dispatch('logIn', UserForm);
                });
            })
    },
    logIn({dispatch}, user) {
        return axios.post('login', user, {withCredentials: true})
          .then(() => {
            sleep(500).then(() => {
                dispatch('viewMe');
            });
          })
    },
    viewMe({commit}) {
        axios.get('/whoami', {withCredentials: true})
            .then((res) => {
                commit('setUser', res.data);
                console.log(res.data)
            });
    },
    logOut({commit}) {
        let new_user = null;
        commit('logout', new_user);
  }
};

const mutations = {
  setUser(state, username) {
    state.user = username;
  },
  logout(state, user){
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
