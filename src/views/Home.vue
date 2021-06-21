<template>
  <ion-page>
    <div v-if="selectWorkout">
    <div class="title">
      <h1>Welcome back!</h1>
      <h2>Select your daily workout</h2>
    </div>
    <ion-content style="height: 100vh">
      <ion-card v-for="workout in workouts" :key="workout.name" @click="goToWorkout(workout)">
        <ion-card-header>
          <ion-card-subtitle>{{ workout.description }}</ion-card-subtitle>
          <ion-card-title>{{ workout.name }}</ion-card-title>
        </ion-card-header>
      </ion-card>
    </ion-content>
    </div>
    <div v-else>
<h1>Hello workout</h1>
<h2>Current workout: {{currentWorkout.name}}</h2>
<ion-button @click="selectWorkout = true">Go Back</ion-button>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton
} from "@ionic/vue";
import { defineComponent, onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { auth, db } from "../main";

export default defineComponent({
  name: "home",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton
  },
  setup() {
    const router = useRouter();
    const type: object[] = [];
    const workouts = ref(type);
    const selectWorkout = ref(true);
    const currentWorkout = reactive({});

    function getWorkouts() {
      db.collection("user/" + auth.currentUser?.uid + "/workout")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            workouts.value.push(doc.data());});});
    }

    onMounted(() => {
      getWorkouts();
      console.log(workouts.value);
    });

    return {
      router,
      getWorkouts,
      workouts,
      selectWorkout,
      currentWorkout
    };
  },
  methods: {
    goToWorkout(selection: object) {
      //this.router.push("/tabs/workout");
      this.selectWorkout = false;
      this.currentWorkout = selection;
    },
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