<template>
  <ion-page>
    <div class="title">
      <h1>Welcome back!</h1>
      <h2>Select your daily workout</h2>
    </div>
    <ion-content>
      <ion-card v-for="workout in workouts" :key="workout.id" @click="goToWorkout()">
        <ion-card-header>
          <ion-card-subtitle>{{ workout.description }}</ion-card-subtitle>
          <ion-card-title>{{ workout.title }}</ion-card-title>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/vue";
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent ({
  name: "home",
  components: { IonPage, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle },
    setup() {
    const router = useRouter();
  return {
   router 
}
},
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
  methods: {
    goToWorkout(){
      this.router.push('/tabs/workout')
    }
  }
})
</script>
<style scoped>
.title {
  background-color: var(--ion-color-primary-contrast);
  color: var(--ion-color-primary);
  padding-left: 1vh;
}
</style>