<template>
  <!-- Exercises list mode */ -->
  <ion-page v-if="listMode">
    <ion-header>
      <ion-toolbar>
        <ion-title>Exercise List</ion-title>
        <ion-buttons slot="primary">
          <ion-button @click="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content style="--padding-top: 2vh">
      <!-- PRETTY BIG CARD COMPONENT -->
      <ion-card v-for="exercise in exercises" :key="exercise.name">
        <ion-item lines="none">
          <ion-card-header>
            <ion-card-subtitle>{{ exercise.subtitle }}</ion-card-subtitle>
            <ion-card-title>{{ exercise.name }}</ion-card-title>
          </ion-card-header>
          <ion-button
            v-if="createMode"
            fill="outline"
            slot="end"
            size="large"
            @click="addExerciseToWorkout(exercise)"
            >Add</ion-button
          >
        </ion-item>
        <ion-item lines="none">
          <ion-icon
            v-if="exercise.description != null"
            :icon="checkmarkCircleOutline"
            slot="start"
            style="color: var(--ion-color-success)"
          ></ion-icon>
          <ion-icon
            v-else
            :icon="closeCircleOutline"
            slot="start"
            style="color: var(--ion-color-danger)"
          ></ion-icon>
          <ion-label>Description</ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-icon
            v-if="exercise.video != null"
            :icon="checkmarkCircleOutline"
            slot="start"
            style="color: var(--ion-color-success)"
          ></ion-icon>
          <ion-icon
            v-else
            :icon="closeCircleOutline"
            slot="start"
            style="color: var(--ion-color-danger)"
          ></ion-icon>
          <ion-label>Video</ion-label>
        </ion-item>
      </ion-card>
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button @click="listMode = false">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
  <ion-page v-else>
    <!-- Add new exercise mode -->
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>New exercise</ion-title>
        <ion-buttons slot="primary">
          <ion-button color="success" @click="addExercise()">Save</ion-button>
        </ion-buttons>
        <ion-buttons slot="secondary">
          <ion-button color="danger" @click="presentAlertConfirm()"
            >Cancel</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="newExercise.name"></ion-input>
        </ion-item>

        <ion-item lines="none">
          <ion-label position="floating">Subtitle</ion-label>
          <ion-input v-model="newExercise.subtitle"></ion-input>
        </ion-item>
      </ion-card>
      <ion-card>
        <ion-item lines="none">
          <ion-textarea
            v-model="newExercise.description"
            rows="10"
            placeholder="Enter exercise description here..."
          ></ion-textarea>
        </ion-item>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>work in progress...</ion-card-subtitle>
          <ion-card-title>Add video</ion-card-title>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTextarea,
  IonInput,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonItem,
  IonLabel,
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController,
  alertController,
  IonFab,
  IonFabButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  add,
} from "ionicons/icons";
import { db } from "../main";

export default defineComponent({
  name: "exercise-modal",
  props: {
    createMode: Boolean,
  },
  emits: {
    addToWorkout: null,
  },
  setup() {

    return { checkmarkCircleOutline, closeCircleOutline, add };
  },
  data() {
    return {
      content: "Content",
      listMode: true,
      exercises: [] as object[],
      newExercise: {
        name: "",
        subtitle: "",
        description: "",
        video: null,
      },
    };
  },
  components: {
    IonTextarea,
    IonInput,
    IonIcon,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCard,
    IonItem,
    IonLabel,
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonFab,
    IonFabButton,
  },
  mounted() {
    db.collection("exercise").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.exercises.push(doc.data());
        });
      });
  },
  methods: {
    async close() {
      await modalController.dismiss();
    },
    clearExercise() {
      this.newExercise.name = "";
      this.newExercise.subtitle = "";
      this.newExercise.description = "";
      this.newExercise.video = null;
    },

    async presentAlertConfirm() {
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
              this.clearExercise();
              this.listMode = true;
            },
          },
        ],
      });
      return alert.present();
    },

    addExercise() {
      console.log(this.newExercise);
      db.collection("exercise")
        .doc(this.newExercise.name)
        .set(this.newExercise)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      this.clearExercise();
      this.listMode = true;
    },

    addExerciseToWorkout(exercise: object) {
      this.$emit("addToWorkout",  exercise );
    },
  },
});
</script>
