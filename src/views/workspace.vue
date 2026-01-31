<template>
  <div id="main">
    <div id="header">
      <RouterLink to="/">Volver</RouterLink>
      <h1>Tareas Asignadas</h1>
    </div>
    <div id="head_2">
        <h3>Estas son tus tareas</h3>
        <img src="../assets/arrow.gif" alt="">
    </div>
    <div id="cargando" v-if="login">
        <img src="../assets/load.gif" alt="">
    </div>
    <div v-if="!login" id="contenido">
      <div id="contenido_2" v-for="fav in store.datos_personales" :key="fav.id">
        <p>{{ fav.todo }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>


import { ref } from 'vue'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from '@/stores/TareasStore'


const login=ref(true)
const store = useStore()

onMounted(async () => {
    
    login.value = true

    await store.obtener()

  
    setTimeout(() => {
        login.value = false 
    }, 1500) 

    console.log(store.datos_personales)
})


</script>

<style scoped lang="sass">
#main
    display: flex
    flex-direction: column
    min-height: 100vh
    width: 100%
    background: radial-gradient(circle at top left, #0b0b0b 0%, #4c1d95 70%)
    color: #f1f1f1
    font-family: 'Inter', 'Segoe UI', sans-serif
    padding: 20px
    color: white
    gap: 30px

    #header
        display: flex
        justify-content: space-between
        background: #111
        padding: 20px
        border-radius: 15px
        box-shadow: 0 0 20px rgba(76, 29, 149, 0.25)

            
        a
            display: flex
            align-content: center
            text-decoration: none
            color: black
            background: rgba(255, 255, 255, 0.8)
            padding: 10px
            border: none
            border-radius: 15px
            transition: transform 1s,color 0.5s ,background 1s

            &:hover
                transform: scale(1.05)
                color: white
                background: #111

        h1
            text-decoration: underline
            text-underline-offset: 4px

            @media screen and (max-width: 768px)
                
                display: flex
                align-content: center
                justify-content: center
                font-size: 22px


    #head_2
        display: flex
        justify-content: center
        flex-direction: column
        align-items: center

        h3
            width: 240px
            font-size: 25px

        img
            width: 70px
            margin-top: 20px
    #cargando
        display: flex
        justify-content: center



    #contenido
        margin-top: 20px
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        gap: 30px
        #contenido_2
            display: flex
            justify-content: center
            width: 300px
            padding: 30px
            background: rgba(255, 255, 255, 0.19)
            border-radius: 16px
            box-shadow: 0 0 20px rgba(76, 29, 149, 0.25)
            
            
            border: 1px solid rgba(255, 255, 255, 1)
            transition: 1s transform ,1s box-shadow 

            &:hover
                transform: scale(1.05)
                box-shadow: 0 30px 30px rgba(0, 0, 0, 0.1)




        

</style>
