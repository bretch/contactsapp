<template>
  <v-container lg-8 offset-lg2>
      <v-toolbar fixed app color="indigo darken-4">
        <v-btn small to="/">back</v-btn>
        <v-spacer></v-spacer>
        <v-btn small @click="submit">Ok</v-btn>
      </v-toolbar>      
      <v-form v-model="valid" ref="form">
        <v-text-field label="First Name" v-model="person.firstname" :rules="requiredRules" required single-line autofocus></v-text-field>
        <v-text-field label="Last Name" v-model="person.lastname" :rules="requiredRules" required single-line></v-text-field>
        <v-text-field label="Birth Date" return-masked-value v-model="person.birthdate" :rules="requiredRules" mask="##/##/####" hint="MM/DD/YYYY" required single-line></v-text-field>
        <v-card>  
          <List :items="person.phoneNumbers" :types="phoneNumberTypes" label="Phone" mask="phone"/>         
        </v-card>
        <v-card class="mt-2">  
          <List :items="person.emailAddresses" :types="emailAddressTypes" label="Email" />         
        </v-card>
        <v-card class="mt-2">  
          <AddressList :items="person.addresses" />         
        </v-card>
      </v-form>
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
        initial: {...initial},
        person: {...initial},
        emailAddressTypes: ['Home', 'Work', 'Other'],
        phoneNumberTypes: ['Home', 'Work', 'Mobile', 'Main', 'Other'],
        requiredRules: [
          (v) => !!v || 'This is required'
        ]
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
      },
      async create () {
        const { person } = await this.$store.dispatch('addPerson', this.person)
        this.$router.replace(`/contacts/${person.id}`)
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