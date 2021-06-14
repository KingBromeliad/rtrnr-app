<template>
  <ion-page>
    <div class="title">
    <h1>Welcome back!</h1>
    <h2>Select your daily workout</h2>
    </div>
    <ion-content>
      <ion-card v-for="workout in workouts" :key="workout.id">
        <ion-card-header>
          <ion-card-subtitle>{{ workout.description }}</ion-card-subtitle>
          <ion-card-title>{{ workout.title }}</ion-card-title>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonCard } from "@ionic/vue";

export default {
  name: "home",
  components: { IonPage, IonContent, IonCard },
  data() {
    return {
      workouts: [
        {
          id: "1",
          title: "Day 1",
          description: "Fullbody workout",
        },
        {
          id: "2",
          title: "Day 2",
          description: "Fullbody workout",
        },
        {
          id: "3",
          title: "Day 3",
          description: "Fullbody workout",
        },
      ],
    };
  },
};
</script>
<style scoped>
.title{
  background-color:  var(--ion-color-primary-contrast);
  color: var(--ion-color-primary);
  padding-left: 1vh;
}
</style>