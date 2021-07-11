<template>
  <!-- Exercises list mode */ -->
  <ion-page v-if="listMode" style="background-color: var(--ion-color-light)">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title color="dark">Exercise List</ion-title>
        <ion-buttons slot="primary">
          <ion-button color="light" @click="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar color="primary">
        <ion-searchbar
          v-model="search"
          show-cancel-button="focus"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content style="--padding-top: 2vh" color="secondary">
      <!-- PRETTY BIG CARD COMPONENT -->
      <ion-card
        v-for="exercise in exercises"
        :key="exercise.name"
        color="light"
      >
        <ion-item lines="none" color="light">
          <ion-card-header>
            <ion-card-subtitle>{{ exercise.subtitle }}</ion-card-subtitle>
            <ion-card-title>{{ exercise.name }}</ion-card-title>
          </ion-card-header>
          <ion-button
            v-if="createMode"
            fill="outline"
            slot="end"
            size="large"
            color="primary"
            @click="addExerciseToWorkout(exercise)"
            >Add</ion-button
          >
          <ion-button
            v-else
            fill="outline"
            slot="end"
            size="large"
            color="danger"
            @click="presentAlertDelete(exercise.name)"
            >Delete</ion-button
          >
        </ion-item>
        <ion-item lines="none" color="light">
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
        <ion-item lines="none" color="light">
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
          <ion-icon color="secondary" :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
  <ion-page v-else>
    <!-- Add new exercise mode -->
    <ion-header class="ion-no-border">
      <ion-toolbar color="success">
        <ion-title>New exercise</ion-title>
        <ion-buttons slot="primary">
          <ion-button color="primary" @click="addExercise()">Save</ion-button>
        </ion-buttons>
        <ion-buttons slot="secondary">
          <ion-button color="danger" @click="presentAlertConfirm()"
            >Cancel</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
      <ion-card color="secondary">
        <ion-item color="secondary">
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="newExercise.name"></ion-input>
        </ion-item>

        <ion-item lines="none" color="secondary">
          <ion-label position="floating">Subtitle</ion-label>
          <ion-input v-model="newExercise.subtitle"></ion-input>
        </ion-item>
      </ion-card>
      <ion-card color="success">
        <ion-item lines="none" color="success">
          <ion-textarea
            v-model="newExercise.description"
            rows="10"
            placeholder="Enter exercise description here..."
            style="color: var(--ion-color-light)"
          ></ion-textarea>
        </ion-item>
      </ion-card>

      <ion-card color="tertiary">
        <ion-item lines="none" color="tertiary">
          <ion-label position="floating">Video url</ion-label>
          <ion-input v-model="newExercise.video"></ion-input>
        </ion-item>
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
  IonSearchbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  add,
} from "ionicons/icons";
import { db, ExerciseData } from "@/main";

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
      exercises: [] as ExerciseData[],
      exercisesData: [] as ExerciseData[],
      newExercise: {
        name: "",
        subtitle: "",
        description: "",
        video: null,
      },
      search: "",
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
    IonSearchbar,
  },
  mounted() {
    db.collection("exercise").onSnapshot((querySnapshot) => {
      const temp: ExerciseData[] = [];
      querySnapshot.forEach((doc) => {
        const item = new ExerciseData(doc.data());
        temp.push(item);
      });
      this.exercisesData = temp;
      this.exercises = temp;
    });
  },
  watch: {
    search(word) {
      this.exercises = [];
      this.exercisesData.forEach((exercise) => {
        if (exercise.name.toLowerCase().indexOf(word) > -1) this.exercises.push(exercise);
      });
    },
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

    async presentAlertDelete(name: string) {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Delete?",
        message: "This action is permanent",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirm Cancel:", blah);
            },
          },
          {
            text: "Delete",
            handler: () => {
              this.deleteExercise(name);
            },
          },
        ],
      });
      return alert.present();
    },

    addExercise() {
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
      this.$emit("addToWorkout", exercise);
    },

    deleteExercise(exercise: string) {
      db.collection("exercise")
        .doc(exercise)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
});
</script>
