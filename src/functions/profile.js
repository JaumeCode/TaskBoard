import { db } from "@/firebase/config";
import { auth } from "@/firebase/config";
import {
    doc,
    getDocs,
    setDoc,
    getDoc,
    addDoc,
    collection
} from "firebase/firestore"


//HOW TO USE:
//  const async guardar()
// res = await guardar ( user.value , {OBJETO CON DATOS})
// if(res.ok) ==> se guardó //
const guardar = async(user,datos)=>{
    try {
        const docRef = doc(db, "tareas", user.uid)
        await setDoc(docRef,datos)
        return{
            ok:true
        }
    } catch (error) {
        console.log(error)
        return{
            ok:false
        }
    }
}

//HOW TO USE:
// const async conseguire()
// res = await conseguir(user.value) ==> si va todo bien pues ya tienes los datos en
// res.data 
const conseguir = async(user)=>{
    try {
        const docRef = doc(db,"usuarios",user.uid)
        const snoopDog = await getDoc(docRef)
        if(snoopDog.exists()){
            return{
                ok:true,
                data : {
                    id: snoopDog.id, 
                    ...snoopDog.data()
                }
            }
        }
    } catch (error) {
        console.log(error)
        return{
            ok:false
        }
    }   

}
//HOW TO USE 
// const async conseguirdocs()
// res = await conseguirDocs()
// RES => RES.DATA SERAN LOS OBJETOS DE FAVORITOS
const conseguirDocs = async()=>{
    try {
        
        const docRef = collection(db, "usuarios",uid)
        const snoopDog = await getDocs(docRef)

        const datos = []
        snoopDog.forEach(dog =>{
            datos.push(dog.data())
        })

        return{
            ok:true,
            data : datos
        }

    } catch (error) {
        console.log(error)
        return{ok:false}
    }
}

////HOW TO USE:
//  const async guardar()
// res = await guardar ( user.value , {OBJETO CON DATOS})
// if(res.ok) ==> se guardó // CREA UN NUEVO DOCUMENTO, NO LO ACTUALIZA // favoritos?
const anadirDoc = async(datos) =>{

    try {
        
        const docRef = collection(db, "tareas")
        const anadir = await addDoc(docRef,datos)
        return{
            ok:true
        }
    
    } catch (error) {
        console.log(error)
        return{
            ok:false
        }
    }

}

//Asi añado favoritos
export const anadirFavoritos = async (tarea) => {
  const user = auth.currentUser;
  if (!user) return { ok: false, error: "Usuario no logueado" };

  // Guardamos la tarea en la subcolección "tareas" usando su ID
  const favoritosRef = doc(db, "usuarios", user.uid, "tareas", String(tarea.id));

  await setDoc(favoritosRef, {
    id: tarea.id,
    todo: tarea.todo,
    
  });

  return { ok: true };
}
//Asi recupero subcolecciones
export const obtenerFavoritos = async()=>{
    const user = auth.currentUser

    const favRef = collection(db, "usuarios", user.uid, "tareas")
    const snoopDog = await getDocs(favRef)

    const favoritos = snoopDog.docs.map(doc =>({
        ...doc.data()
    }))

    return{
        ok:true,
        favs : favoritos
    }
}

export{guardar, anadirDoc, conseguir , conseguirDocs}