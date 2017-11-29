<template>
    <v-container lg-8 offset-lg2>
        <v-toolbar fixed app color="indigo darken-4">
          <v-toolbar-title v-text="'Contacts'" class="white--text"></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>      
        <SearchBar/>
        <template v-for="(group, letter) in sortedPersons">
            <v-card class="mb-2">
              <v-list subheader>
                <v-subheader>{{ letter }}</v-subheader>
                <v-list-tile avatar three-line v-for="(person) in group" :key="person.id" :to="`/contacts/${person.id}`" replace>
                  <v-list-tile-avatar>
                    <v-icon class="indigo white--text">account_circle</v-icon>
                  </v-list-tile-avatar>                
                  <v-list-tile-content>
                    <v-list-tile-title v-text="`${person.firstname} ${person.lastname}`"></v-list-tile-title>
                    <v-list-tile-sub-title>{{ person.emailAddresses[0].value }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-title class="text-xs-right">{{ person.phoneNumbers[0].value }}</v-list-tile-title>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card>              
        </template>
        <v-btn color="pink" dark absolute bottom right fab fixed class="mb-5" to="/create">
          <v-icon>add</v-icon>
        </v-btn>        
    </v-container>
</template>
<script>
  import SearchBar from './SearchBar'
  export default {
    components: {SearchBar},
    computed: {
      sortedPersons () {
        return this.$store.getters.sortedByAlphabet
      }
    }
  }
</script>