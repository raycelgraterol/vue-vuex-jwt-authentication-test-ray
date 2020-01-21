export default {
    template: `
      <div>
          <h2>Login</h2>
          <form @submit.prevent="handleSubmit">
              <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                  <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
              </div>
              <div class="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                  <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
              </div>
              <div class="form-group">
                  <button class="btn btn-primary" :disabled="loggingIn">Login</button>                  
              </div>
          </form>
      </div>
    `,
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        loggingIn () {
            return this.$store.state.authentication.status.loggingIn;
        }
    },
    created () {
        // reset login status
        this.$store.dispatch('authentication/logout');
    },
    methods: {
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;
            const { dispatch } = this.$store;
            if (username && password) {
                dispatch('authentication/login', { username, password });
            }
        }
    }
};