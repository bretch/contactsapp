<template>
  <v-container>
    <v-layout>
        <v-flex md8 offset-md2 lg6 offset-lg3>
          <v-toolbar fixed app color="indigo darken-4">
            <v-btn small to="/">back</v-btn>
            <v-spacer></v-spacer>
            <v-btn small @click="submit" :disabled="!valid">Ok</v-btn>
          </v-toolbar>      
          <v-form v-model="valid" ref="form">
            <v-text-field label="First Name" v-model="person.firstname" :rules="requiredRules" required single-line autofocus></v-text-field>
            <v-text-field label="Last Name" v-model="person.lastname" :rules="requiredRules" required single-line></v-text-field>
            <v-flex xs12 sm12>
                <v-dialog persistent v-model="modal"lazy full-width width="290px">
                  <v-text-field slot="activator" label="Birth Date" v-model="person.birthdate" :rules="requiredRules" required single-line readonly ></v-text-field>
                  <v-date-picker v-model="person.birthdate" scrollable actions :allowed-dates="allowedDates">
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-dialog>
            </v-flex>
            <List :items="person.phoneNumbers" :types="phoneNumberTypes" label="Phone" mask="phone"/>         
            <List :items="person.emailAddresses" :types="emailAddressTypes" label="Email" />
            <AddressList :items="person.addresses" />
          </v-form>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import List from './List'
  import AddressList from './AddressList'
  const initial = {
    firstname: '',
    lastname: '',
    birthdate: '',
    phoneNumbers: [{value: '', type: 'Home'}],
    emailAddresses: [{value: '', type: 'Home'}],
    addresses: [{streetAddress: '', city: '', country: ''}]
  }

  export default {
    components: { List, AddressList },
    data () {
      return {
        valid: true,
        modal: false,
        initial: {...initial},
        person: {...initial},
        emailAddressTypes: ['Home', 'Work', 'Other'],
        phoneNumberTypes: ['Home', 'Work', 'Mobile', 'Main', 'Other'],
        requiredRules: [
          (v) => !!v || 'This is required'
        ],
        allowedDates: {
          min: null,
          max: (new Date()).toISOString().substring(0, 10)
        }
      }
    },
    watch: {
      '$route.name': 'refresh'
    },
    mounted () {
      this.refresh()
    },
    methods: {
      refresh () {
        if (this.$route.name === 'UpdateContact') {
          const item = this.$store.getters.getPersonById(this.$route.params.id)
          if (item) this.person = item
        } else {
          // @Todo use ImmutableJS? nested props are refencing original initial object
          this.person = {
            ...this.initial,
            phoneNumbers: [{value: '', type: 'Home'}],
            emailAddresses: [{value: '', type: 'Home'}],
            addresses: [{streetAddress: '', city: '', country: ''}]
          }
        }
      },
      update () {
        this.$store.commit('UPDATE_PERSON', this.person)
        this.$router.replace(`/contacts/${this.$route.params.id}`)
        this.$store.dispatch('addToast', {text: 'Successfully updated contact.', color: 'success'})
      },
      async create () {
        const { person } = await this.$store.dispatch('addPerson', this.person)
        this.$router.replace(`/contacts/${person.id}`)
        this.$store.dispatch('addToast', {text: 'Successfully added contact.', color: 'success'})
      },
      submit () {
        if (this.$refs.form.validate()) {
          if (this.$route.params.id) {
            return this.update()
          }
          return this.create()
        }
      }
    }
  }
</script>