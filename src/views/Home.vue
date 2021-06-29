<template>
  <ion-page>
    <div v-if="selectWorkoutRef" style="height: 100vh">
      <ion-header class="ion-no-border">
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button @click="router.push('/trainer')"
              >Trainer</ion-button
            >
          </ion-buttons>
          <ion-title>Workouts!</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card
          v-for="workout in workouts"
          :key="workout.name"
          @click="goToWorkout(workout)"
        >
          <ion-card-header>
            <ion-card-subtitle>{{ workout.description }}</ion-card-subtitle>
            <ion-card-title>{{ workout.name }}</ion-card-title>
          </ion-card-header>
        </ion-card>
      </ion-content>
    </div>
    <div v-else>
      <h1>Hello workout</h1>
      <h2>Current workout: {{ currentWorkout.name }}</h2>
      <ion-fab vertical="top" horizontal="end" slot="fixed">
        <ion-fab-button @click="selectWorkout(true)">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-button @click="presentAlertConfirm()">Go Back</ion-button>
    </div>
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
  IonFab,
  IonFabButton,
  IonIcon,
  alertController,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { defineComponent, onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { auth, db } from "../main";

export default defineComponent({
  name: "home",
  components: {
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
    IonFab,
    IonIcon,
    IonFabButton,
  },
  setup() {
    const router = useRouter();
    const type: object[] = [];
    const workouts = ref(type);
    const selectWorkoutRef = ref(true);
    const selectWorkout = (state: boolean) => (selectWorkoutRef.value = state);
    const currentWorkout = reactive({});

    function getWorkouts() {
      db.collection("user/" + auth.currentUser?.uid + "/workout")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            workouts.value.push(doc.data());
          });
        });
    }

    onMounted(() => {
      getWorkouts();
      console.log(workouts.value);
    });

    return {
      add,
      router,
      getWorkouts,
      workouts,
      selectWorkoutRef,
      currentWorkout,
      selectWorkout
    };
  },
  methods: {
    goToWorkout(selection: object) {
      this.selectWorkout(false);
      this.currentWorkout = selection;
    },
    async presentAlertConfirm() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Before exit",
        message: "Save current session?",
        buttons: [
          {
            text: "Discard",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirm Cancel:", blah);
              this.selectWorkout(true);
            },
          },
          {
            text: "Save",
            handler: () => {
              console.log("Confirm Okay");
              this.selectWorkout(true);
            },
          },
        ],
      });
      return alert.present();
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
