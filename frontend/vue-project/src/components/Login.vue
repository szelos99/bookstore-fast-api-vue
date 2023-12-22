<template>
   <div class="container">
      <div class="row align-items-center">
         <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
               <h1>Sign In</h1>
               <form class="form-group">
                  <input v-model="form.username" type="userame" class="form-control" placeholder="Username" required>
                  <input v-model="form.password" type="password" class="form-control" placeholder="Password" required>
                  <button type="button" class="btn btn-primary" @click="doLogin">Submit</button>
                  <p>Don't have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign up here</a>
                  </p>
               </form>
            </div>

            <div v-else class="card register" v-bind:class="{ error: emptyFields }">
               <h1>Sign Up</h1>
               <form class="form-group">
                  <input v-model="user.username" type="username" class="form-control" placeholder="Username" required>
                  <input v-model="user.password" type="password" class="form-control" placeholder="Password" required>
                  <button type="button" class="btn btn-primary" @click="doRegister">Submit</button>
                  <p>Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
                  </p>
               </form>
            </div>
         </div>
      </div>

   </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
   name: "Login",
   data() {
    return {
      registerActive: false,
      passwordReg: "",
      confirmReg: "",
      emptyFields: false,
      user: {
         username: "",
         password: "",
      },
      form: {
        username: '',
        password:'',
      }
    }
   },
   
   methods: {
      doRegister() {
         if(this.user.username === "" || this.user.password === ""){
            this.emptyFields = true;
         }else{
               this.$store.dispatch('register', this.user)
                  .then((res) => {
                     this.$toast("Sign in successful!","success");
                     this.$router.push("/");
                  })
                  .catch((error) => {
                     console.log(error)
                     let detail = error.response.data.detail
                     this.$toast(detail,"error");
                  })
               
         }
      },
      doLogin() {
         if (this.form.username === "" || this.form.password === "") {
            this.emptyFields = true;
         } else {
            try {
               const User = new FormData();
               User.append('username', this.form.username);
               User.append('password', this.form.password);
               this.$store.dispatch('logIn', User)
                  .then((res) => {
                     this.$toast("Sign in successful!","success");
                     this.$router.push("/");
                  })
                  .catch((error) => {
                     console.log(error)
                     let detail = error.response.data.detail
                     this.$toast(detail,"error");
                  });
               
            } catch (error) {
               console.log(error)
               this.$toast("Login failed!","error");
            }
         }
      },
   }
});
</script>

<style>
p {
   line-height: 1rem;
}

.card {
   padding: 20px;
}

.form-group {
   input {
      margin-bottom: 20px;
   }
}

.login-page {
   align-items: center;
   display: flex;
   height: 100vh;

   h1 {
      margin-bottom: 1.5rem;
   }
}

.error {
   animation-name: errorShake;
   animation-duration: 0.3s;
}

@keyframes errorShake {
   0% {
      transform: translateX(-25px);
   }
   25% {
      transform: translateX(25px);
   }
   50% {
      transform: translateX(-25px);
   }
   75% {
      transform: translateX(25px);
   }
   100% {
      transform: translateX(0);
   }
}

</style>