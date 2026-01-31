<template>

    <div id="main">
        <div id="formulario">
            <h1>Registrarte</h1>
            <form id="form" @submit.prevent="enviar_registro">
                <div>

                    <label for="">Correo</label>
                    <input type="email" v-model="correo">
                </div>
                <div>

                    <label for="">Contraseña</label>
                    <input type="password" v-model="password">
                </div>
                <button>Registrarte</button>
                <RouterLink to="/login">Ya tienes cuenta?</RouterLink>
            </form>
        </div>
    </div>

</template>

<script setup>
import { doRegister } from '@/functions/auth';
import { ref } from 'vue';
import { sendEmail } from '@/functions/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';


const correo=ref("")
const password=ref("")
const user=auth.currentUser

const router=useRouter()


const enviar_registro=async()=>{

    try{


        const resultado=await doRegister(correo.value,password.value)
        const email=await sendEmail(user)
        console.log("Registro Correcto")
        console.log("Verifica el correo electronico para continuar")
        router.push("/")
        
    }catch(error){

        console.log(error)
        console.log("Ya hay un correo registrado con este")

    }


   

}


</script>

<style lang="sass" scoped>


body,html
   
    box-sizing: border-box
    width: 100%
    height: 100%
    background: #0b0b0b
    font-family: 'Inter', 'Segoe UI', sans-serif

#main
    
    box-sizing: border-box
    min-height: 100vh
    width: 100vw
    display: flex
    justify-content: center
    align-items: center
    background: radial-gradient(circle at top left, #0b0b0b 50%, #4c1d95 50%)


#formulario
  background: #111
  padding: 40px
  border-radius: 14px
  width: 100%
  max-width: 380px
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.8)
  border: 1px solid #1f1f1f

  h1
    text-align: center
    margin-bottom: 2rem
    font-weight: 600
    color: #f1f1f1
    letter-spacing: 1px

#form
    display: flex
    flex-direction: column
    gap: 20px

    div
        display: flex
        flex-direction: column
        gap: 10px

    label
      font-size: 0.85rem
      color: #9a9a9a

    input
        background: #0d0d0d
        border: 1px solid #222
        border-radius: 8px
        padding: 0.75rem
        color: #f1f1f1
        font-size: 0.95rem
        transition: border 0.2s, box-shadow 0.2s

        &:focus
            outline: none
            border-color: #7c3aed
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25)

button
    margin-top: 0.5rem
    padding: 10px
    background: linear-gradient(135deg, #7c3aed,grey)
    border: none
    border-radius: 8px
    color: #fff
    font-size: 1rem
    font-weight: 600
    cursor: pointer
    transition: transform 0.1s, box-shadow 0.2s

    &:hover
      box-shadow: 0 8px 20px #7c3aed

    &:active
      transform: scale(0.97)

a
    text-align: center
    font-size: 14px
    color: white
    text-decoration: none
    opacity: 0.85

    &:hover
        opacity: 1
        text-decoration: underline


</style>