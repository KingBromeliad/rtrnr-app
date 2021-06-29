<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>User</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div>
      <ion-card color="tertiary" style="z-index: 10; margin-bottom: 0px">
        <ion-card-header>
          <ion-card-subtitle>animation test</ion-card-subtitle>
          <ion-card-title>Animation</ion-card-title>
        </ion-card-header>
        <ion-card-content><ion-button @click="showCard = !showCard">Show</ion-button></ion-card-content>
      </ion-card>
      <transition name="bounce">
        <ion-card color="warning" v-if="showCard" style="margin-top: 0px; transform: translateY(-8px); border-top-left-radius: 0px; border-top-right-radius: 0px">
        <ion-card-header>
          <ion-card-subtitle>animation test</ion-card-subtitle>
          <ion-card-title>Animation</ion-card-title>
        </ion-card-header>
        <ion-card-content>test</ion-card-content>
      </ion-card>
      </transition>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle,IonCardSubtitle, IonCardContent } from '@ionic/vue';
import { defineComponent, ref } from '@vue/runtime-core';


export default defineComponent ({
  name: 'User',
  components: { IonHeader, IonToolbar, IonButton, IonTitle, IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle,IonCardSubtitle, IonCardContent },
  setup(){
    const showCard = ref(false);
    return{
      showCard
    }
  }
});
</script>
<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.bounce-enter-active {
  animation: bounce-in 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530);
}
.bounce-leave-active {
  animation: bounce-in 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-160px);
  }
  100% {
    transform: translateY(0);
  }
}

</style>