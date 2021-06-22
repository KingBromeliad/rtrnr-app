<template>
<ion-page>
  <div v-if="selectWorkout" style="height: 100vh">
    <div style="justify-content: flex-start">
      <div class="title">
        <h1>Workout History</h1>
        <h2>Tap to view a report</h2>
      </div>
      <div id="history-grid">
        <ion-card v-for="pastWorkout in pastWorkouts" :key="pastWorkout.date.seconds" @click="goToWorkout(pastWorkout)">
          <ion-card-header>
            <ion-card-subtitle>{{ pastWorkout.name }}</ion-card-subtitle>
            <ion-card-title>date</ion-card-title>
          </ion-card-header>
        </ion-card>
      </div>
    </div>
  </div>
  <div v-else>
      <h1>Hello workout</h1>
      <h2>Current workout: {{ currentWorkout.name }}</h2>
      <ion-button @click="selectWorkout = true">Go Back</ion-button>
  </div>
</ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton
} from "@ionic/vue";
import { defineComponent, onMounted, ref, reactive } from "vue";
import { auth, db } from "../main";

export default defineComponent({
  name: "History",
  components: {
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton
  },
  setup() {
    const type: object[] = [];
    const pastWorkouts = ref(type);
    const selectWorkout = ref(true);
    const currentWorkout = reactive({});

    function getWorkouts() {
      db.collection("user/" + auth.currentUser?.uid + "/history")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            pastWorkouts.value.push(doc.data());
          });
        });
    }

    onMounted(() => {
      getWorkouts();
      console.log(pastWorkouts.value);
    });

    return {
      getWorkouts,
      pastWorkouts,
      selectWorkout,
      currentWorkout,
    };
  },
  methods: {
    goToWorkout(selection: object) {
      this.selectWorkout = false;
      this.currentWorkout = selection;
    },
  },
});
</script>
<style scoped>
#history-grid {
  display: grid;
  width: 100vw;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 1rem;
}
.title {
  background-color: var(--ion-color-primary-contrast);
  color: var(--ion-color-primary);
  padding-left: 1vh;
}
</style>