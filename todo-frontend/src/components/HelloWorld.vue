<template>
  <div>
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
    axios.get('http://localhost:3000/todo')
    .then(result =>{
      this.todos = result.data
    })
  },
  methods: {
    tambah: function () {
      const tambahdata = { desc : this.text }
      axios.post('http://localhost:3000/todo', tambahdata)
      this.todos.push(tambahdata)
    },
    hapus: function(id){
      axios.delete(`http://localhost:3000/todo/${id}`)
      this.todos.splice
    }
  }
}
</script>

