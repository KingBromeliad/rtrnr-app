<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle} from '@ionic/vue';


export default  {
  name: 'home',
  components: {IonHeader, IonToolbar, IonTitle, IonPage }
}
</script>