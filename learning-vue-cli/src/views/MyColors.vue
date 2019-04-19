<template>
<div class="myColors">
  <div v-if="user">
    <div class="header">
        <h1 class="userHeader">{{user.name}}'s colors</h1>
    </div>
    <div>
        <button @click="toggleUpload" class="pure-button" id="buttons">New Color</button>
        <button @click="logout" class="pure-button" id="buttons">Logout</button>
        <color-collection :colors="colors"/>

        <!--a @click="toggleUpload"><i class="far fa-image"></i></a-->
        <!--a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a-->
    </div>
  </div>
  <div v-else>
    <p>If you would like to pick colors, please register for an account or login.</p>
    <router-link to="/register" class="pure-button">Register</router-link>
    <p>or</p>
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
    <escape-event @escape="escape"></escape-event>
    <uploader :show="show" @escape="escape" @uploadFinished="uploadFinished"/>
  </div>
</div>
</template>

<script>
import EscapeEvent from '@/components/EscapeEvent.vue'
import Uploader from '@/components/Uploader.vue'
import ColorCollection from '@/components/ColorCollection.vue'

export default {
  name: 'mycolors',
  components: {
    EscapeEvent,
    Uploader,
    ColorCollection,
  },
  data() {
    return {
      show: false,
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyColors");
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    colors() {
      return this.$store.state.colors;
    }
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    escape() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      try {
        this.error = await this.$store.dispatch("getMyColors");
      } catch (error) {
        console.log(error);
      }
    },

  }
}
</script>

</script>

<style scoped>
p {
  color: white;
}
#buttons {
  margin: 10px;
}
form {
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 4px;
  padding: 20px;
}

.userHeader {
  text-transform: uppercase;
  color: white;
}



.pure-controls {
  display: flex;
}

.pure-controls button {
  margin-left: auto;
}
</style>
