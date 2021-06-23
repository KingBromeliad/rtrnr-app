<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>{{ userData.name }}</ion-title>
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
        <ion-button
          expand="block"
          color="dark"
          shape="round"
          @click="editWorkout()"
          >Edit Workout</ion-button
        >
        <ion-button
          expand="block"
          fill="outline"
          color="danger"
          shape="round"
          @click="deleteWorkout()"
          >Delete Workout</ion-button
        >
      </ion-card>
    </ion-content>
    <ion-footer>
        <ion-toolbar>
      <ion-button
      size="large"
        expand="block"
        color="primary"
        fill="outline"
        @click="editWorkout()"
        >Add a new workout</ion-button
      >
        </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  alertController,
  IonFooter,
} from "@ionic/vue";
import { onMounted, ref, defineComponent } from "vue";
import { db } from "../main";

export default defineComponent({
  name: "User",
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonFooter,
  },
  props: { id: String },
  setup(props: any) {
    const type: object[] = [];
    const workouts = ref(type);
    const userData = ref({});
    //const currentWorkout = reactive({});
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);
    const buttons = ["Cancel", "Confirm"];

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
      userData,
      buttons,
      isOpenRef,
      setOpen,
    };
  },
  methods: {
    async presentAlertConfirm() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm delete?",
        message: "This action is permanent",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Delete",
            handler: () => {
              console.log("Confirm Okay");
            },
          },
        ],
      });
      return alert.present();
    },
    editWorkout() {
      console.log("edit workout");
    },

    deleteWorkout() {
      this.presentAlertConfirm();
      console.log("delete");
    },
  },
});
</script>
