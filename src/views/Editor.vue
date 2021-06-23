<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>{{userData.name}}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/trainer"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card v-for="workout in workouts" :key="workout.name">
        <ion-card-header>
          <ion-card-subtitle>{{ workout.description }}</ion-card-subtitle>
          <ion-card-title>{{ workout.name }}</ion-card-title>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/vue";
import { onMounted, ref, reactive } from "vue";
import { db } from "../main";

export default {
  name: "User",
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
  },
  props: { id: String },
  setup(props: any) {
    const type: object[] = [];
    const workouts = ref(type);
    const userData = ref({});
    //const currentWorkout = reactive({});

    function getWorkouts() {
      db.collection("user/" + props.id + "/workout")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            workouts.value.push(doc.data());
          });
        });
    }

    function getUserData() {
      const docRef = db.collection("user").doc(props.id);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
              const temp: object | undefined = doc.data();
              if (temp) userData.value = temp;
              else console.log("Firebase support TS please");
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
    onMounted(() => {
      getWorkouts();
      getUserData();
    });

    return {
      workouts,
      userData
    };
  },
};
</script>
