<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Upload</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <input v-model="title" placeholder="Title">
            <p></p>
            <input v-model="rgb.r" maxlength="3" type="number"></input>
            <input v-model="rgb.g" maxlength="3" type="number"></input>
            <input v-model="rgb.b" maxlength="3" type="number"></input>
            <div class="swatchBox" v-bind:style="{backgroundColor: this.rgbString}"></div>
            <p></p>
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-secondary">Upload</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'Uploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      rgb: {
        r: 0,
        b: 0,
        g: 0
      },
      title: '',
      description: '',
      file: null,
      error: '',
    }
  },
  computed: {
    rgbString() {
      return this.rgbToString(this.rgb.r, this.rgb.g, this.rgb.b);
    }
  },
  methods: {
    close() {
      this.$emit('escape');
    },
    rgbToString(r, g, b) {
        return("rgb(" + r + ", "+ g + ", " + b + ")");
    },
    async created() {
      await this.$store.dispatch("getUser");
    },
    async upload() {
      console.log("in upload");
      console.log("rgb is");
      console.log(this.rgb);
      try {
        let dataObject = {
          title: this.title,
          rgbString: this.rgbToString(this.rgb.r, this.rgb.g, this.rgb.b),
        }
        this.error = await this.$store.dispatch("upload", dataObject);
        if (!this.error) {
          this.title = '';
          this.description = '';
          this.file = null;
          this.$emit('uploadFinished');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>


<style scoped>
.swatchBox {
  height: 200px;
  width: 100%;
  display: inline-block;
  border-style: solid;
  border-color: #616161;
  border-width: thick;
  border-radius: 5px;
}

input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px
}

.pure-button-secondary {
  float: right;
}
</style>
