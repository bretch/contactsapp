import Vue from 'vue'
import VueRouter from 'vue-router'
import Contacts from '@/components/Contacts'
import Contact from '@/components/Contact'
import ContactItem from '@/components/ContactItem'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Contacts',
      component: Contacts
    },
    {
      path: '/contacts/:id',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/create',
      name: 'CreateContact',
      component: ContactItem
    },
    {
      path: '/contacts/:id/update',
      name: 'UpdateContact',
      component: ContactItem
    }
  ]
})
