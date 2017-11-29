<template>
  <v-list two-line>
    <v-list-tile v-for="(item, index) in items" :key="`${label}-item-${index}`">
      <v-list-tile-content>
        <v-select :items="types" v-model="item.type" single-line bottom></v-select>
      </v-list-tile-content>
      <v-list-tile-content>
        <v-text-field  class="pd-5 ml-1" v-if="label === 'Email'" :rules="emailRules" :label="label" v-model="item.value" :mask="mask" single-line autofocus></v-text-field>
        <v-text-field class="pd-5 ml-1" :label="label" v-model="item.value" :rules="phoneRules" :mask="mask" single-line autofocus v-else></v-text-field>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn small v-if="items.length > 1" icon outline color="red" @click="remove(index)"><v-icon color="red">remove</v-icon></v-btn>
    </v-list-tile-action>            

    </v-list-tile>
    <!-- Add new entry -->
    <v-list-tile :key="`${label}-item-new`" v-if="items[0].value.trim()">
      <v-list-tile-content>
        <v-select :items="types" v-model="newEntry.type" single-line bottom ></v-select>
      </v-list-tile-content>
      <v-list-tile-content>
        <v-text-field class="ml-1" :label="label" v-model="newEntry.value" :mask="mask" @keyup="keyup" single-line></v-text-field>
      </v-list-tile-content>
      <v-list-tile-action></v-list-tile-action>
    </v-list-tile>
  </v-list>
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