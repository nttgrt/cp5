<template>
  <div class="home">
    <color-collection :colors="colors" />
  </div>
</template>

<script>
// @ is an alias to /src
import ColorCollection from '@/components/ColorCollection.vue'

export default {
  name: 'home',
  components: {
    ColorCollection
  },
  computed: {
    colors() {
      return this.$store.state.colors;
    }
  },
  async created() {
    await this.$store.dispatch("getAllColors");
  },
}
</script>
