<template>
  <v-app>
    <v-content>
      <v-container fill-height v-if="loading">
        <v-flex md-1 offset-md6 sm-2 offset-sm5 xs-2 offset-xs5>
          <v-progress-circular indeterminate v-bind:size="70" v-bind:width="6" color="indigo darken-4"></v-progress-circular>
        </v-flex>      
      </v-container>
      <router-view  v-else>
        <v-container fluid></v-container>
      </router-view>
    </v-content>
    <v-snackbar v-model="toast.id" :timeout="6000" top :color="toast.color">
        {{ toast.text }}
        <v-btn dark flat @click.native="$store.commit('CLOSE_TOAST')">close</v-btn>
    </v-snackbar>    
  </v-app>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    computed: mapState(['toast', 'loading']),
    mounted () {
      this.$store.dispatch('getPersons')
    }
  }
</script>
