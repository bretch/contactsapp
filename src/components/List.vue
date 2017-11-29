<template>
    <v-card>
      <v-layout row wrap  v-for="(item, index) in items" :key="`${label}-item-${index}`" class="pa-2">
        <v-flex xs12 sm4>
          <v-select :items="types" v-model="item.type" single-line bottom></v-select>
        </v-flex>
        <v-flex xs9 sm6>
          <v-text-field  class="pd-5 ml-1" v-if="label === 'Email'" :rules="emailRules" :label="label" v-model="item.value" :mask="mask" single-line autofocus></v-text-field>
          <v-text-field class="pd-5 ml-1" :label="label" v-model="item.value" :rules="phoneRules" :mask="mask" single-line autofocus v-else></v-text-field>          
        </v-flex>
        <v-flex xs2 class="mt-3">
          <v-btn small v-if="items.length > 1" icon outline color="red" @click="remove(index)"><v-icon color="red">remove</v-icon></v-btn>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    <!-- Add new entry -->
      <v-layout row wrap :key="`${label}-item-new`" class="pa-2">
        <v-flex xs12 sm4>
          <v-select :items="types" v-model="newEntry.type" single-line bottom></v-select>
        </v-flex>
        <v-flex xs9 sm6>
          <v-text-field  class="pd-5 ml-1" :label="label" @keyup="keyup" v-model="newEntry.value" :mask="mask" single-line autofocus></v-text-field>
        </v-flex>
      </v-layout>
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