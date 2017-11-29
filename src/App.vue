<template>
  <v-app>
    <v-content>
      <router-view>
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
    computed: mapState(['toast'])
  }
</script>
