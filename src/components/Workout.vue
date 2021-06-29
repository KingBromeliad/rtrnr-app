<template>
  <ion-page>
    <!-- CARD ELEMENT -->
    <div v-for="exercise in exercises" 
    <ion-card v-for="exercise in exercises">
      <ion-item>
        <ion-card-header>
          <ion-card-title>{{}}</ion-card-title>
          <ion-card-subtitle></ion-card-subtitle>
          <ion-card-subtitle></ion-card-subtitle>
        </ion-card-header>
        <ion-fab-button>
          <ion-icon v-if="exercise.state == 'active'"></ion-icon>
          <ion-icon v-if="exercise.state == 'done'"></ion-icon>
          <ion-icon v-if="exercise.state == 'info'"></ion-icon>
        </ion-fab-button>
      </ion-item>
    </ion-card>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
} from "@ionic/vue";
import { defineComponent, onMounted, ref, unref } from "@vue/runtime-core";


class NewWorkout {
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  note: string;

  constructor() {
    this.name = "";
    this.description = "";
    this.exercises = [];
    this.note = "";
  }
}

class WorkoutExercise {
  data: object;
  sets: number;
  reps: number;
  weight: number;
  rest: number;

  constructor(exercise: object) {
    this.data = exercise;
    this.sets = NaN;
    this.reps = NaN;
    this.weight = NaN;
    this.rest = NaN;
  }
}

class DoneExercise {
  data: object;
  sets: number;
  reps: number;
  weight: number;
  rest: number;
  note: string;
  video: string | null;
  state: string;

  constructor(exercise: WorkoutExercise) {
    this.data = exercise.data;
    this.sets = exercise.sets;
    this.reps = exercise.reps;
    this.weight = exercise.weight;
    this.rest = exercise.rest;
    this.note = "";
    this.video = null;
    this.state = "active";
  }
}

class PastWorkout {
  name: string;
  description: string;
  exercises: DoneExercise[];
  timestamp: string;

  constructor(data: NewWorkout) {
    this.name = data.name;
    this.description = data.description;
    this.exercises = [];
    this.timestamp = "";
  }
}

export default defineComponent({
  name: "User",
  components: {
    IonHeader,
    IonToolbar,
    IonButton,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
  },
  props: {
    workout: { type: NewWorkout, required: true },
  },
  emits: {
    openDescription: null,
    openNotes: null,
    openVideo: null,
  },
  setup(props) {
    // setup current workout
    const data = new PastWorkout(props.workout);
    const currentWorkout = ref(data);

    //setup exercise list
    const element: DoneExercise[] = [];
    const exercises = ref(element);

    onMounted(() => {
      props.workout.exercises.forEach((element: WorkoutExercise) => {
        const temp = new DoneExercise(element);
        exercises.value.push(temp);
      });
    });
    /* SETUP COMPLETED */

    function exitAndSave(){
        currentWorkout.value.exercises = exercises.value;
        const doneWorkout: PastWorkout = unref(currentWorkout);
        console.log(doneWorkout);
    }



    return {
      NewWorkout,
      WorkoutExercise,
      PastWorkout,
      DoneExercise,
      currentWorkout,
      exercises,
      exitAndSave
    };
  },
});
</script>
