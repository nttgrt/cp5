<template>
<div>
  <div class="row justify-content-md-center">
    <div class="colorBox" v-for="color in colors">
      <div class="col">
        <div class="swatchBox" v-bind:style="{backgroundColor: color.rgbString}"></div>
        <p class="colorTitle"> {{color.title}} </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
//import moment from 'moment';

export default {
  name: 'ColorCollection',
  props: {
    colors: Array,
  },
  created() {
    console.log(this.colors);
  },
  methods: {
    /*formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }*/
  },
}
</script>

<style scoped>
.tempText {
  color: white;
}

.colorTitle {
  color: white;
  padding: 0;
  text-transform: uppercase;
  font-size: 15px;
}

.swatchBox {
  height: 200px;
  width: 200px;
  display: inline-block;
  border-style: solid;
  border-color: #616161;
  border-width: thick;
  border-radius: 5px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}
</style>
