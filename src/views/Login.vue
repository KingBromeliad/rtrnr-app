<template>
  <ion-page >
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <div class="box">
        <ion-button shape="round"
        @click="() => router.push('/tabs/home')"
        >Login</ion-button>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader,IonButton, IonToolbar, IonTitle } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { reactive, toRefs} from 'vue';
import { auth, db } from '../main'

enum AuthMode {
  SignIn,
  SignUp
}

export default  {
  name: 'Login',
  components: { IonHeader,IonButton, IonToolbar, IonTitle, IonPage },
    setup() {
      const router = useRouter();
      const state = reactive({
        name : '',
        email : '',
        password : '',
        mode : AuthMode.SignIn,
        errorMsg : ''
      });

    const signInWithEmailAndPassword = async (email : String, password : String) => {
      try { 
        if(!email || !password) {
        state.errorMsg = "Email and Password required";
        return;
      }

      await auth.signInWithEmailAndPassword(email, password);
      router.push("tabs/home");
      } catch (error) {}
    }
    return {
   router 
    }
    }
}

</script>
<style scoped>
.box {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>