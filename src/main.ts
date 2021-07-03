import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/*Firebase components */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { Howl } from "howler";
   export const alarm = new Howl({
            src: [require("./chime.mp3")],
          });


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0DZVrbLLnaco9QNBggAbiiF63KjW2atk",
  authDomain: "rtrnr-app.firebaseapp.com",
  projectId: "rtrnr-app",
  storageBucket: "rtrnr-app.appspot.com",
  messagingSenderId: "982902845457",
  appId: "1:982902845457:web:4f0e4c0a43542a7d2081b0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();

//types

export class ExerciseData {
  name: string;
  subtitle: string;
  description: string;
  video: string | null;

  constructor(data: any) {
    this.name = data.name;
    this.subtitle = data.subtitle;
    this.description = data.description;
    this.video = data.description;
  }
}

export class NewWorkout {
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  note: string;
  color: string;

  constructor() {
    this.name = "";
    this.description = "";
    this.exercises = [];
    this.note = "";

    const colors = [
      "#A1FAB5",
      "#A8A1FA",
      "#FAB1A1",
      "#FAD6A1",
      "#E8A1FA",
      "#A1C5FA",
      "#A1FACF",
    ];

    this.color = colors[Math.floor(Math.random() * colors.length)];

  }
}

export class WorkoutExercise {
  data: ExerciseData;
  sets: number;
  reps: number;
  weight: number;
  rest: number;

  constructor(exercise: ExerciseData) {
    this.data = exercise;
    this.sets = NaN;
    this.reps = NaN;
    this.weight = NaN;
    this.rest = NaN;
  }
}

export class DoneExercise {
  id: string;
  data: object;
  sets: number;
  repsDone: number;
  repsDifference: number;
  weightDone: number;
  weightDifference: number;
  rest: number;
  note: string;
  video: string | null;
  state: string;

  constructor(exercise: WorkoutExercise) {
    this.id = exercise.data.name;
    this.data = exercise.data;
    this.sets = Number(exercise.sets);
    this.repsDone = Number(exercise.reps);
    this.repsDifference = 0;
    this.weightDone = Number(exercise.weight);
    this.weightDifference = 0;
    this.rest = Number(exercise.rest);
    this.note = "";
    this.video = null;
    this.state = "active";
  }
}

export class PastWorkout {
  name: string;
  description: string;
  exercises: DoneExercise[];
  timestamp: string;
  color: string;

  constructor(data: NewWorkout) {
    this.name = data.name;
    this.description = data.description;
    this.exercises = [];
    this.timestamp = "";
    this.color = data.color;
  }
}

const app = createApp(App)
  .use(IonicVue, {
    mode: 'ios'
  })
  .use(router);

router.isReady().then(() => {
  app.mount("#app");
});
