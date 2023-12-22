<template>
  <section>
    <div id="navbar" class="col">
          <ul>
            <li>
              <router-link to="/">Books</router-link>
            </li>
            <li>
              <router-link to="/profile">Profile</router-link>
            </li>
            <li>
              <router-link v-if="!isLoggedIn" to="/login">Sign in</router-link>
              <a v-if="isLoggedIn" @click="already_signed">Sign in</a>
            </li>
            <li>
              <a v-if="isLoggedIn" @click="logout">Log Out</a>
            </li>
          </ul>
          <hr>
    </div>
    <div>
      <p><strong>Username:</strong> <span>{{ user }}</span></p>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Profile',
  computed: {
    user: function() {
      return this.$store.getters.stateUser
    },
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    already_signed() {
      this.$toast("Already signed in!", "warning")
    },
    logout () {
      this.$store.dispatch('logOut');
      this.$toast("You logged out!", "success")
    },
  }
});
</script>

<style lang="scss">
.container-fluid {
  width: 100%;
}

#navbar {
  a {
    cursor: pointer;
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }

  }
}

li {
  padding: 0;
  margin: 0;
  list-style: none;
  display: inline;
  margin-right: 20px;
  text-align: start;
}

ul {
  padding-left: 0;
  margin: 0;
}

</style>
