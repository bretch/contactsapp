<template>
    <v-card class="mt-2">
      <v-subheader>{{ label }}</v-subheader>
      <template v-for="(item, index) in items">
        <v-layout row wrap :key="`${label}-item-${index}`" class="pa-2">
          <v-flex xs12 :class="{'sm4 mr-2': items.length > 1, 'sm5 mr-2': items.length === 1}">
            <v-select :items="types" v-model="item.type" bottom required></v-select>
          </v-flex>
          <v-flex :class="{'sm6 mr-2 xs9': items.length > 1, 'sm6 xs12': items.length === 1}">
            <v-text-field  v-if="label === 'Email'" :rules="emailRules" :label="label" v-model="item.value" :mask="mask" required autofocus></v-text-field>
            <v-text-field :label="label" v-model="item.value" :rules="phoneRules" :mask="mask" autofocus v-else></v-text-field>          
          </v-flex>
          <v-flex class="mt-2 --text-center" v-if="items.length > 1">
            <v-btn icon flat outline color="red" @click="remove(index)"><v-icon color="red">remove</v-icon></v-btn>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </template>        
      <!-- Add new entry -->
      <template v-if="items[0].value.trim()">
        <v-layout row wrap :key="`${label}-item-new`" class="pa-2">
          <v-flex xs12 :class="{'sm4 mr-2': items.length > 1, 'sm5 mr-2': items.length === 1}">
            <v-select :items="types" v-model="newEntry.type" bottom></v-select>
          </v-flex>
          <v-flex :class="{'sm6 mr-2 xs9': items.length > 1, 'sm6 xs12': items.length === 1}">
            <v-text-field  class="pd-5 ml-1" :label="label" @keyup="keyup" v-model="newEntry.value" :mask="mask" single-line></v-text-field>
          </v-flex>
        </v-layout>
      </template>
    </v-card>            
</template>
<script>
  let timeout = null

  export default {
    props: ['items', 'label', 'types', 'mask'],
    data () {
      const initial = { type: 'Home', value: '' }
      return {
        initial,
        newEntry: {...initial},
        phoneRules: [
          (v) => !!v || 'Phone is required'
        ],
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    methods: {
      addEntry () {
        if (this.newEntry.value.trim()) {
          this.items.push(this.newEntry)
          this.newEntry = {...this.initial}
        }
      },
      keyup (e) {
        clearTimeout(timeout)

        let that = this
        timeout = setTimeout(() => {
          that.addEntry()
        }, 500)
      },
      remove (index) {
        this.items.splice(index, 1)
      }
    }
  }
</script>