<template>
  <div>
    <h1>DAFTAR TODO</h1>
    <ul>
      <li v-for="item in todos" :key="item.id">
        {{ item.desc }}
        <button @click="hapus(item.id)">Hapus</button>
      </li>
    </ul>
    <input v-model="text"/>
    <button @click="tambah">Tambah</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    return{
      todos: [],
      text: ''
    }
  },
  created: function(){
    const username = localStorage.getItem('uname')
    const password = localStorage.getItem('pass')
    axios.get('http://localhost:3000/todo', {headers: {uname : username, pass : password}})
    .then(result =>{
      this.todos = result.data
    })
  },
  methods: {
    tambah: function () {
      const tambahdata = { desc : this.text }
      const username = localStorage.getItem('uname')
      const password = localStorage.getItem('pass')
      axios.post('http://localhost:3000/todo', tambahdata, {headers: {uname : username, pass : password} })
      .then(()=>
        this.todos.push(tambahdata)
      )
    },
    hapus: function(id){
      const username = localStorage.getItem('uname')
      const password = localStorage.getItem('pass')
      axios.delete(`http://localhost:3000/todo/${id}`, {headers: {uname : username, pass : password}})
      location.reload()
    }
  }
}
</script>

