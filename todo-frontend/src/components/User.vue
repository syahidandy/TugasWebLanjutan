<template>
  <div>
    <h1>DAFTAR USER</h1>
    <ul>
      <li v-for="item in users" :key="item.id">
        {{ item.uname }}
        <button @click="hapus(item.id)">Hapus</button>
      </li>
    </ul>
    <input v-model="username"/>&nbsp;
    <input v-model="password" type="password"/>
    <button @click="tambah">Tambah</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    return{
      users: [],
      username: '',
      password: ''
    }
  },
  created: function(){
    const username = localStorage.getItem('uname')
    const password = localStorage.getItem('pass')
    axios.get('http://localhost:3000/user', {headers: {uname : username, pass : password}})
    .then(result =>{
      this.users = result.data
    })
  },
  methods: {
    tambah: function () {
      const tambahdata = { uname: this.username, pass: this.password }
      const username = localStorage.getItem('uname')
      const password = localStorage.getItem('pass')
      axios.post('http://localhost:3000/user', tambahdata, {headers: {uname : username, pass : password}})
      this.todos.push(tambahdata)
      location.reload()
    },
    hapus: function(id){
      const username = localStorage.getItem('uname')
      const password = localStorage.getItem('pass')
      axios.delete(`http://localhost:3000/user/${id}`, {headers: {uname : username, pass : password}})
      location.reload()
    }
  }
}
</script>

