<template>
    <v-text-field
      prepend-icon="search"
      :label="`${persons.length} contacts`"
      :value = "query"
      @input="updateQuery"
    ></v-text-field>    
</template>
<script>
    import { mapState } from 'vuex'

    export default {
      computed: mapState(['query', 'persons']),
      methods: {
        updateQuery (value) {
          this.$store.commit('UPDATE_QUERY', value)
        }
      }
    }
</script>