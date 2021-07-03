<template>
  <ion-page
    v-if="selectWorkoutRef"
    style="background-color: var(--ion-color-medium)"
  >
    <ion-header>
      <ion-item lines="none" color="medium">
        <ion-text color="light">
          <h1 style="font-weight: 500; font-size: 2.8em; margin-bottom: 0px">
            Welcome back!
          </h1>
          <h4 style="font-weight: 400; font-size: 1.5em; margin-top: 0.2em">
            Select your daily workout
          </h4>
        </ion-text>
      </ion-item>
      <div class="rounded-container-top"></div>
    </ion-header>
      <ion-content color="light">
        <ion-card
          v-for="workout in workouts"
          :key="workout.name"
          button="true"
          @click="goToWorkout(workout)"
          v-bind:style="{ '--color': workout.color,}"
          style="border-radius: 45px;"
        >
          <ion-item lines="none" v-bind:style="{ '--background': workout.color,}">
            <ion-card-header>
                <h1
                  style="font-weight: 550; font-size: 2.2em; margin-bottom: 0.1em; margin-top: 0.1em; color: var(--ion-color-light);"
                >
                  {{ workout.name }}
                </h1>
                <h6
                  style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.5em; color: var(--ion-color-light);"
                >
                  {{ workout.description }}
                </h6>
            </ion-card-header>
            <ion-fab-button
              slot="end"
              style="--box-shadow: 0px;"
              color="light"
              ><ion-icon v-bind:style="{ color: workout.color,}" :icon="caretForward"></ion-icon
            ></ion-fab-button>
          </ion-item>
        </ion-card>
      </ion-content>
    <ion-footer>
      <div class="rounded-container-bottom"></div>
    </ion-footer>
  </ion-page>
  <ion-page v-else>
    <workout
      :workout="currentWorkout"
      @exit-workout="selectWorkout(true)"
    ></workout>
  </ion-page>
</template>

<script lang="ts">
import {
  IonText,
  IonItem,
  IonHeader,
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonFabButton,
  IonIcon,
  IonFooter,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { auth, db, NewWorkout } from "../main";
import Workout from "../components/Workout.vue";
import { caretForward } from "ionicons/icons";

export default defineComponent({
  name: "home",
  components: {
    IonText,
    IonItem,
    Workout,
    IonHeader,
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonFabButton,
    IonIcon,
    IonFooter,
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
    function goToWorkout(data: NewWorkout) {
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
      caretForward,
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
.rounded-container-bottom {
  display: block;
  background-color: var(--ion-color-light);
  height: 21px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.rounded-container-top {
  display: block;
  background-color: var(--ion-color-light);
  height: 21px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>
