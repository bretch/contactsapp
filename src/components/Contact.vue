<template>
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4 xl2 offset-xl5>
      <v-card>
        <v-card-media src="/static/background.jpg" height="250px">
          <v-layout column class="media">
            <v-card-title>
              <v-btn dark icon to="/">
                <v-icon>chevron_left</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn dark icon class="mr-3" :to="`/contacts/${$route.params.id}/update`" replace>
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn dark icon @click="dialog = true">
                <v-icon color="red">delete</v-icon>
              </v-btn>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">{{ person.firstname }} {{ person.lastname }}</div>
            </v-card-title>
          </v-layout>
        </v-card-media>
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">cake</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ person.birthdate }}</v-list-tile-title>
              <v-list-tile-sub-title>Birthdate</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-divider inset></v-divider>
          <v-list-tile v-for="({value, type}, index) in person.phoneNumbers" :key="`phonenumber-${index}`">
            <v-list-tile-action>
              <v-icon v-if="index === 0" color="indigo">phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ value }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ type }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-divider inset></v-divider>
          <v-list-tile v-for="({value, type}, index) in person.emailAddresses" :key="`email-${index}`">
            <v-list-tile-action>
              <v-icon v-if="index === 0" color="indigo">mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ value }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ type }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-divider inset></v-divider>
          <v-list-tile v-for="({streetAddress, city, country}, index) in person.addresses" :key="`address-${index}`">
            <v-list-tile-action>
              <v-icon v-if="index === 0" color="indigo">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ streetAddress }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ city }} {{ country && `, ${country}` }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
      <DeleteContactDialog :id="$route.params.id" :dialog="dialog" @close="dialog = false"/>
    </v-flex>
  </v-layout>
</template>
<script>
  import DeleteContactDialog from './DeleteContactDialog'
  export default {
    components: {DeleteContactDialog},
    data () {
      return {
        dialog: false
      }
    },
    computed: {
      person () {
        return this.$store.getters.getPersonById(this.$route.params.id)
      }
    }
  }
</script>