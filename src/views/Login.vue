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

export default  {
  name: 'Login',
  components: { IonHeader,IonButton, IonToolbar, IonTitle, IonPage },
    setup() {
              const router = useRouter();
    return {
   router 
    }
    }
}

</script>
<style scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>