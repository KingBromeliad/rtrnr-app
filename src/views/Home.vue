<template>
  <ion-page v-if="selectWorkoutRef" style="height: 100vh">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="router.push('/trainer')">Trainer</ion-button>
        </ion-buttons>
        <ion-title>Workouts!</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card
        v-for="workout in workouts"
        :key="workout.name"
        @click="goToWorkout(workout)"
        color="secondary"
      >
        <ion-card-header>
          <ion-card-subtitle>{{ workout.description }}</ion-card-subtitle>
          <ion-card-title>{{ workout.name }}</ion-card-title>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
  <ion-page v-else>
    <workout :workout="currentWorkout" @exit-workout="selectWorkout(true);"></workout>
  </ion-page>
</template>

<script lang="ts">
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { auth, db, NewWorkout } from "../main";
import Workout from "../components/Workout.vue";

export default defineComponent({
  name: "home",
  components: {
    Workout,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton,
  },
  setup() {
    const router = useRouter();
    const type: NewWorkout[] = [];
    const workouts = ref(type);
    const selectWorkoutRef = ref(true);
    const selectWorkout = (state: boolean) => (selectWorkoutRef.value = state);
    const workoutType = new NewWorkout();
    const currentWorkout = ref(workoutType);

    function getWorkouts() {
      db.collection("user/" + auth.currentUser?.uid + "/workout")
        .get()
        .then((querySnapshot) => {
          const temp: NewWorkout[] = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const item = new NewWorkout();
            temp.push(Object.assign(item, doc.data()));
          });
          workouts.value = temp;
        });
    }

    onMounted(() => {
      getWorkouts();
      console.log(workouts.value);
    });

    //GOT TO WORKOUT
    function goToWorkout(data: NewWorkout){
      currentWorkout.value = data;
      selectWorkout(false);
    }


    return {
      add,
      router,
      getWorkouts,
      workouts,
      selectWorkoutRef,
      currentWorkout,
      selectWorkout,
      goToWorkout,
    };
  },
});
</script>
<style scoped>
.title {
  background-color: var(--ion-color-primary-contrast);
  color: var(--ion-color-primary);
  padding-left: 1vh;
}
</style>
