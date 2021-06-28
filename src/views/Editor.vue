<template>
  <ion-page v-if="addWorkoutRef">
    <ion-modal :is-open="isOpenRef" @didDismiss="setOpen(false)">
      <exercise-modal
        :createMode="true"
        @add-to-workout="addToWorkout"
      ></exercise-modal>
    </ion-modal>
    <ion-toast
      :is-open="toastRef"
      message="Exercise successfully added to workout."
      :duration="1000"
      @didDismiss="showToast(false)"
      position="top"
      translucent="true"
    >
    </ion-toast>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Create workout</ion-title>
        <ion-buttons slot="primary">
          <ion-button color="success" @click="saveWorkout()">Save</ion-button>
        </ion-buttons>
        <ion-buttons slot="secondary">
          <ion-button color="danger" @click="presentAlertSave()"
            >Cancel</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- WORKOUT TITLE AND DESCRIPTION -->
      <ion-card color="light">
        <ion-card-header>
          <!-- EDIT SUBTITLE -->
          <ion-item v-if="editDescription" lines="none" color="light">
              <ion-label position="stacked">Description</ion-label>
              <ion-input
                placeholder="Enter a short description"
                v-model="newWorkout.description"
              ></ion-input>
            <ion-button slot="end" @click="editDescription = false" fill="clear">
              <ion-icon :icon="checkmarkOutline" slot="icon-only" color="success"></ion-icon>
            </ion-button>
          </ion-item>
          <ion-item v-else lines="none" color="light">
            <ion-card-subtitle>{{ newWorkout.description }}</ion-card-subtitle>
            <ion-button slot="end" @click="editDescription = true" fill="clear">
              <ion-icon :icon="pencilOutline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-item>
          <!-- EDIT TITLE -->
          <ion-item v-if="editTitle" lines="none" color="light">
            <ion-card-title>
              <ion-label position="stacked">Title</ion-label>
              <ion-input
                placeholder="Enter title"
                v-model="newWorkout.name"
              ></ion-input>
            </ion-card-title>
            <ion-button slot="end" @click="editTitle = false" fill="clear">
              <ion-icon :icon="checkmarkOutline" slot="icon-only" color="success"></ion-icon>
            </ion-button>
          </ion-item>
          <ion-item v-else lines="none" color="light">
            <ion-card-title>{{ newWorkout.name }}</ion-card-title>
            <ion-button slot="end" @click="editTitle = true" fill="clear">
              <ion-icon :icon="pencilOutline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-card-header>
      </ion-card>

      <!-- WORKOUT EXERCISES -->  
  <ion-card v-for="exercise in newWorkout.exercises" :key="exercise.name">
    <ion-card-header>
      <ion-card-subtitle>{{exercise.subtitle}}</ion-card-subtitle>
      <ion-card-title>{{exercise.name}}</ion-card-title>
    </ion-card-header>
  </ion-card>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button
          size="large"
          expand="block"
          color="secondary"
          fill="solid"
          @click="setOpen(true)"
          >Add exercise to workout</ion-button
        >
      </ion-toolbar>
    </ion-footer>
  </ion-page>
  <ion-page v-else>
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
          @click="addWorkout(true)"
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
  IonModal,
  IonToast,
  IonItem,
  IonInput,
  IonIcon,
  IonLabel
} from "@ionic/vue";
import { onMounted, ref, defineComponent } from "vue";
import { db } from "../main";
import ExerciseModal from "../components/ExerciseModal.vue";
import { checkmarkOutline, pencilOutline } from "ionicons/icons";

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
    IonModal,
    ExerciseModal,
    IonToast,
    IonItem,
    IonInput,
    IonIcon,
    IonLabel
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
    const addWorkoutRef = ref(false);
    const addWorkout = (state: boolean) => (addWorkoutRef.value = state);

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

    //create workout
    class NewWorkout {
      name: string;
      description: string;
      exercises: object[];

      constructor() {
        this.name = "";
        this.description = "";
        this.exercises = [];
      }
    }
    
    const workout = new NewWorkout();
    const newWorkout = ref(workout);

    //toast
    const toastRef = ref(false);
    const showToast = (state: boolean) => (toastRef.value = state);

    function addToWorkout(exercise: object) {
      newWorkout.value.exercises.push(exercise);
      showToast(true);
      
    }

    //Workout title and subtitle
    const editTitle = ref(true);
    const editDescription = ref(true);

    function saveWorkout() {
      addWorkout(false);
    }
    return {
      workouts,
      userData,
      buttons,
      isOpenRef,
      setOpen,
      addWorkout,
      addWorkoutRef,
      saveWorkout,
      addToWorkout,
      toastRef,
      showToast,
      newWorkout,
      editTitle,
      editDescription,
      checkmarkOutline,
      pencilOutline,
    };
  },
  methods: {
    async presentAlertSave() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm exit",
        message: "All changes will be lost",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Exit",
            handler: () => {
              this.addWorkout(false);
            },
          },
        ],
      });
      return alert.present();
    },

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
