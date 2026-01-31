import { defineStore } from 'pinia'
import { obtenerFavoritos } from '@/functions/profile'
import { ref } from 'vue'

export const useStore = defineStore('usuarios', () => {
    const datos_personales = ref([])

    const obtener = async () => {
        const resultado = await obtenerFavoritos()
        if (resultado.ok) {
            datos_personales.value = resultado.favs
        }
    }

    const introducir_tareas = (tarea) => {
        datos_personales.value.push(tarea)
    }

    return { datos_personales, obtener, introducir_tareas }
})

