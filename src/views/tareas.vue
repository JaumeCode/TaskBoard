<template>
    
    <div id="main">
        
        <div id="header">
            <RouterLink to="/workspace">Workspace</RouterLink>
            <img src="../assets/icon.png" alt="">
            <button @click="cerrar_sesion">Cerrar Sesion</button>
            
        </div>
        <div id="buscador">
            <select v-model="selector" name="" id="">
                <option value="all">Todas</option>
                <option value="end">Finalizadas</option>
                <option value="no_end">No Finalizadas</option>
            </select>
        </div>
        <div id="cargador" v-if="loading">

            <img v-if="loading" src="../assets/load.gif" alt="">
        </div>
        <div id="contenido" v-else>
            <div id="carta_tarea" v-for="tarea in datos_filtro" :key="tarea.id">
            
                <p>{{ tarea.todo }}</p>
                <button v-if="!tarea.completed" @click="favorito(tarea)">Asignar</button>
                <h2 id="asignado" v-if="tarea.completed">Asignada</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink,useRouter } from 'vue-router';
import { auth } from '@/firebase/config';
import axios from 'axios';
import { logOut } from '@/functions/auth';
import { anadirFavoritos } from '@/functions/profile';
import { watch } from 'vue';
import { useStore } from '@/stores/TareasStore';
import { useToast } from 'vue-toastification';


const toast=useToast()

const store=useStore()

const user=auth.currentUser

const datos=ref([])
const datos_filtro=ref([])
const loading=ref(true)
const router=useRouter()
console.log(user)

const uid=user.uid

const selector=ref("all")


const getdata = async () => {
    loading.value = true
    const resultado = await axios.get("https://dummyjson.com/todos")
    datos.value = resultado.data.todos
    datos_filtro.value = resultado.data.todos
    
    setTimeout(() => {
        loading.value = false
    }, 2000)

}


onMounted(()=>{

    getdata()


})


watch(selector, () => {
    loading.value = true

    setTimeout(() => {
        if (selector.value === "all") {
            datos_filtro.value = datos.value
        }

        if (selector.value === "end") {
            datos_filtro.value = datos.value.filter(t => t.completed)
        }

        if (selector.value === "no_end") {
            datos_filtro.value = datos.value.filter(t => !t.completed)
        }

        loading.value = false
    }, 800) 
})

const cerrar_sesion=async()=>{

    const cerrar=await logOut()

    if (cerrar.ok){
        toast.warning("Sesion Cerrada Correctamente")
        router.push("/login")

    }



}


const favorito=async(tarea)=>{

    
    console.log(uid)
    console.log(tarea)
    const guardado=await anadirFavoritos(tarea)

    if(guardado.ok){

        console.log("Guardado correctamente")

    }
    
}


</script>

<style lang="sass" scoped>

#main
  display: flex
  flex-direction: column
  min-height: 100vh
  width: 100%
  background: radial-gradient(circle at top left, #0b0b0b 0%, #4c1d95 70%)
  color: #f1f1f1
  font-family: 'Inter', 'Segoe UI', sans-serif
  padding: 20px

#header
    display: flex
    justify-content: space-between
    align-items: center
    padding: 20px 30px
    background: #111
    border-radius: 12px
    box-shadow: 0 0 20px rgba(76, 29, 149, 0.25)
    margin-bottom: 20px

       


    img
        width: 130px

        @media screen and (max-width: 768px)
            width: 90px
    a
        text-decoration: none
        color: #f1f1f1
        font-size: 22px
        transition: color 0.2s

        @media screen and (max-width: 768px)
            font-size: 15px
        &:hover
            color: #7c3aed
            text-decoration: underline
            text-underline-offset: 4px

    button
        background: linear-gradient(135deg, #7c3aed, #5b21b6)
        color: #fff
        border: none
        border-radius: 20px
        padding: 10px 15px
        font-size: 14px
        font-weight: 600
        cursor: pointer
        transition: transform 0.2s, box-shadow 0.3s

        &:hover
            box-shadow: 0 0 20px rgba(124, 58, 237, 0.5)
            transform: scale(1.05)

#buscador
    margin-bottom: 50px
    display: flex
    justify-content: flex-start
    justify-content: center
    
    
    select
        background: #0d0d0d
        color: #f1f1f1
        width: 250px
        height: 40px
        border: 1px solid #222
        border-radius: 8px
        padding: 8px
        font-size: 14px
        transition: border 0.2s, box-shadow 0.2s

        &:focus
        
        border-color: #7c3aed
        box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.25)


img
    width: 250px


#cargador

    display: flex
    justify-content: center


#contenido
    display: flex
    justify-content: center
    flex-wrap: wrap
    gap: 30px
    margin-bottom: 20px







    #carta_tarea
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        gap: 20px
        width: 100%
        max-width: 320px
        min-height: 150px
        background: #111
        border-radius: 20px
        padding: 20px
        box-shadow: 0 0 15px rgba(124, 58, 237, 0.25)
        transition: transform 0.2s, box-shadow 0.2s


    
        p
            display: flex
            justify-content: center
            width: 180px
            justify-items: center
            
            font-size: 16px
            color: #f1f1f1

        h2
            font-size: 14px
            color: #9a9a9a

        button

            align-self: center
            background: linear-gradient(135deg, #7c3aed, #5b21b6)
            color: #fff
            border: none
            border-radius: 12px
            padding: 8px 15px
            font-size: 14px
            cursor: pointer
            transition: transform 0.2s, box-shadow 0.3s

            &:hover
                box-shadow: 0 0 15px rgba(124, 58, 237, 0.5)
                transform: scale(1.05)

        #asignado
            color: rgb(255, 251, 0,0.7)
            font-size: 15px
        
        




</style>