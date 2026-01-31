import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login.vue'
import register from '@/views/register.vue'
import tareas from '@/views/tareas.vue'
import workspace from '@/views/workspace.vue'
import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: tareas, meta: { requiresAuth: true } },
    { path: "/workspace", component: workspace, meta: { requiresAuth: true } },
    {path:"/login",component:login},
    {path:"/register",component:register}
  ],
})






router.beforeEach((to, from, next) => {
  
  onAuthStateChanged(auth,(userFirebase)=>{
  
    const user = auth.currentUser
    
    if (to.meta.requiresAuth) {
      
      if (!user) {
        next("/login")
        
      }
  
      
      if (!user.emailVerified) {
        next("/login") 
        
      }
  
      
      return next()

    } else {
      next()
    }
  })
  

})

export default router