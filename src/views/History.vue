<template>
  <ion-page style="justify-content: flex-start">
    <div class="title">
    <h1>Workout History</h1>
    <h2>Tap to view a report</h2>
    </div>
    <div id="history-grid">
      <ion-card v-for="pastWorkout in pastWorkouts" :key="pastWorkout.id">
        <ion-card-header>
          <ion-card-subtitle>{{ pastWorkout.title }}</ion-card-subtitle>
          <ion-card-title>{{ pastWorkout.date }}</ion-card-title>
        </ion-card-header>
      </ion-card>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';

export default  {
  name: 'History',
  components: { IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle },
  data() {
    return {
      pastWorkouts: [
        {
          id: "1", //date and time computed
          date: "21 may",
          title: "Day 1",
          description: "Fullbody workout",
        },
        {
          id: "2",
          date: "21 may",
          title: "Day 2",
          description: "Fullbody workout",
        },
        {
          id: "3",
          date: "17 may",
          title: "Day 3",
          description: "Fullbody workout",
        },
                {
          id: "4",
          date: "15 may",
          title: "Day 1",
          description: "Fullbody workout",
        },
      ],
    }
  }
}
</script>
<style scoped>
#history-grid{
  display: grid;
  width: 100vw;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 1rem;
}
.title{
  background-color:  var(--ion-color-primary-contrast);
  color: var(--ion-color-primary);
  padding-left: 1vh;
}
</style>