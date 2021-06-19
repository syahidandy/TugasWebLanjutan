<template>
    <div>
        <label>Username</label>
        <input type="text" v-model="username"/>
    </div>
    <div>
        <label>Password</label>
        <input type="password" v-model="password"/>
    </div>
    <button @click="save">Save</button> 
    <button @click="hapus">Delete</button>
</template>

<script>
export default{
    data:function(){
        return{
            username:'',
            password:''
        }
    },
    created : function(){
        this.username = localStorage.getItem('uname')
        this.password = localStorage.getItem('pass')
    },
    methods:{
        save:function(){
            localStorage.setItem('uname',this.username)
            localStorage.setItem('pass', this.password)
        },
        hapus:function(){
            localStorage.removeItem('uname')
            localStorage.removeItem('pass')
        }
    }
}
</script>