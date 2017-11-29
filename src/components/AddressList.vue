<template>
  <v-flex class="mt-2">
    <v-card v-for="(item, index) in items" :key="`address-item-${index}`" class="mt-2">
      <v-subheader>Address Line {{ index + 1}}</v-subheader>
      <v-layout row wrap class="pa-2">
        <v-flex xs12 sm12 md12 lg5 class="pr-2">
          <v-text-field label="Street Address" v-model="item.streetAddress" autofocus></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md5 lg3 class="pr-2">
          <v-text-field label="City" v-model="item.city"></v-text-field>
        </v-flex> 
        <v-flex xs8 sm6 md4 lg2>
          <v-select label="Country" :items="countries" v-model="item.country" bottom item-text="country_name" item-value="country_code" autocomplete></v-select>
        </v-flex>
        <v-flex xs4 sm6 md2>
          <v-btn small v-if="items.length > 1" icon outline color="red" @click="remove(index)"><v-icon color="red">remove</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-card>
    <!-- Add new entry -->
    <template v-if="items[0].streetAddress.trim()">
      <v-card class="mt-2">
        <v-subheader>Address Line {{ items.length + 1 }}</v-subheader>
        <v-layout row wrap class="pa-2">
          <v-flex xs12 sm12 md12 lg5 class="pr-2">
            <v-text-field class="sm12" label="Street Address" @keyup="keyup" v-model="newEntry.streetAddress"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md5 lg3 class="pr-2">
            <v-text-field label="City" v-model="newEntry.city"></v-text-field>
          </v-flex> 
          <v-flex xs8 sm6 md4 lg2>
            <v-select label="Country" :items="countries" v-model="newEntry.country" bottom item-text="country_name" item-value="country_code" autocomplete></v-select>
          </v-flex>
          <v-flex xs4 sm6 md2> </v-flex>
        </v-layout>     
      </v-card>
    </template>
  </v-flex>
</template>
<script>
  import { mapState } from 'vuex'
  let timeout = null

  export default {
    props: ['items'],
    data () {
      const initial = {streetAddress: '', city: '', country: ''}
      return {
        initial,
        newEntry: {...initial}
      }
    },
    computed: mapState(['countries']),
    methods: {
      addEntry () {
        if (this.newEntry.streetAddress.trim()) {
          this.items.push(this.newEntry)
          this.newEntry = {...this.initial}
        }
      },
      keyup (e) {
        clearTimeout(timeout)

        let that = this
        timeout = setTimeout(() => {
          that.addEntry()
        }, 300)
      },
      remove (index) {
        this.items.splice(index, 1)
      }
    }
  }
</script>