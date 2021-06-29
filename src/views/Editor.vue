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
      :duration="800"
      @didDismiss="showToast(false)"
      position="top"
      translucent="true"
    >
    </ion-toast>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>{{editModeRef ? 'Edit workout' : 'Create workout'}}</ion-title>
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
    <ion-content :color=" editModeRef ? 'warning' : 'dark'">
      <!-- WORKOUT TITLE AND DESCRIPTION -->
      <ion-card color="light">
        <ion-item v-if="editInfo" lines="none" color="light">
          <ion-fab-button slot="end" @click="editInfo = false" color="success">
            <ion-icon :icon="checkmarkOutline"></ion-icon>
          </ion-fab-button>
          <ion-card-header>
            <ion-label position="stacked">Description</ion-label>
            <ion-input
              placeholder="Enter a short description"
              v-model="newWorkout.description"
            ></ion-input>
            <ion-card-title>
              <ion-label position="stacked">Title</ion-label>
              <ion-input
                placeholder="Enter title"
                v-model="newWorkout.name"
              ></ion-input>
            </ion-card-title>
          </ion-card-header>
        </ion-item>
        <ion-item v-else lines="none" color="light">
          <ion-fab-button slot="end" @click="editInfo = true" color="secondary">
            <ion-icon :icon="pencilOutline"></ion-icon>
          </ion-fab-button>
          <ion-card-header>
            <ion-card-subtitle>{{ newWorkout.description }}</ion-card-subtitle>
            <ion-card-title>{{ newWorkout.name }}</ion-card-title>
          </ion-card-header>
        </ion-item>
      </ion-card>
      <!-- WORKOUT EXERCISES -->
      <ion-card
        v-for="(exercise, index) in newWorkout.exercises"
        :key="exercise.data.name"
        color="tertiary"
      >
        <ion-item color="tertiary" lines="none">
          <ion-card-header color="tertiary">
            <ion-card-subtitle>{{ exercise.data.subtitle }}</ion-card-subtitle>
            <ion-card-title>{{ exercise.data.name }}</ion-card-title>
          </ion-card-header>
          <ion-fab-button
            slot="end"
            color="danger"
            @click="removeExercise(index)"
          >
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-fab-button>
        </ion-item>
        <ion-card-content>
          <ion-item color="tertiary">
            <ion-label position="fixed">Sets</ion-label>
            <ion-input
              inputmode="numeric"
              type="number"
              placeholder="Number"
              v-model="exercise.sets"
            ></ion-input>
          </ion-item>
          <ion-item color="tertiary">
            <ion-label position="fixed">Reps</ion-label>
            <ion-input
              inputmode="numeric"
              type="number"
              placeholder="Number"
              v-model="exercise.reps"
            ></ion-input>
          </ion-item>
          <ion-item color="tertiary">
            <ion-label position="fixed">Weight</ion-label>
            <ion-input
              inputmode="numeric"
              type="number"
              placeholder="Kilograms"
              v-model="exercise.weight"
            ></ion-input>
          </ion-item>
          <ion-item lines="none" color="tertiary">
            <ion-label position="fixed">Rest</ion-label>
            <ion-input
              inputmode="numeric"
              type="number"
              placeholder="Seconds"
              v-model="exercise.rest"
            ></ion-input>
          </ion-item>
        </ion-card-content>
      </ion-card>
      <ion-card color="primary">
        <ion-card-header>
          <ion-card-title>Add a note</ion-card-title>
        </ion-card-header>
        <ion-item color="primary">
          <ion-textarea
            placeholder="Enter more information here..."
            rows="8"
            v-model="newWorkout.note"
          ></ion-textarea>
        </ion-item>
      </ion-card>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button
          size="large"
          expand="block"
          color="dark"
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
      <ion-card v-for="workout in workouts" :key="workout.name" color="primary">
        <ion-item lines="none" color="primary">
          <ion-card-header slot="start">
            <ion-card-subtitle>{{ workout.description }}</ion-card-subtitle>
            <ion-card-title>{{ workout.name }}</ion-card-title>
          </ion-card-header>
          <ion-fab-button
            slot="end"
            color="danger"
            @click="deleteAlertConfirm(workout.name)"
          >
            <ion-icon :icon="trashOutline"></ion-icon>
          </ion-fab-button>
        </ion-item>
        <ion-card-content>
          <ion-button
            expand="block"
            color="dark"
            shape="round"
            @click="editWorkout(workout)"
          >
            <ion-icon slot="start" :icon="pencilOutline"></ion-icon>
            Edit Workout
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button
          size="large"
          expand="block"
          color="primary"
          fill="outline"
          @click="createWorkout()"
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
  IonCardContent,
  alertController,
  IonFooter,
  IonModal,
  IonToast,
  IonItem,
  IonInput,
  IonIcon,
  IonLabel,
  IonTextarea,
  IonFabButton,
} from "@ionic/vue";
import { onMounted, ref, unref, defineComponent } from "vue";
import { db } from "../main";
import ExerciseModal from "../components/ExerciseModal.vue";
import {
  checkmarkOutline,
  pencilOutline,
  closeOutline,
  trashOutline,
} from "ionicons/icons";

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
    IonCardContent,
    IonFooter,
    IonModal,
    ExerciseModal,
    IonToast,
    IonItem,
    IonInput,
    IonIcon,
    IonLabel,
    IonTextarea,
    IonFabButton,
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
    const editModeRef = ref(false);
    const editMode = (state: boolean) => (editModeRef.value = state);

    //create workout
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

    const workout = new NewWorkout();
    const newWorkout = ref(workout);

    //create workout exercise
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

    function getWorkouts() {
      db.collection("user/" + props.id + "/workout").onSnapshot(
        (querySnapshot) => {
          const temp: NewWorkout[] = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const item = new NewWorkout();
            temp.push(Object.assign(item, doc.data()));
            console.log(temp);
          });
          workouts.value = temp;
        }
      );
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
    function createWorkout(){
      editMode(false);
      addWorkout(true);
      newWorkout.value = new NewWorkout();
    }

    //toast
    const toastRef = ref(false);
    const showToast = (state: boolean) => (toastRef.value = state);

    function addToWorkout(exercise: object) {
      const tempExercise = new WorkoutExercise(exercise);
      newWorkout.value.exercises.push(tempExercise);
      showToast(true);
    }

    //Workout title and subtitle
    const editInfo = ref(true);

    function removeExercise(index: number) {
      newWorkout.value.exercises.splice(index, 1);
    }

    function saveWorkout() {
      const data: NewWorkout = unref(newWorkout);
      const arrayData: object[] = data.exercises.map((obj) => {
        return Object.assign({}, obj);
      });

      db.collection("user/" + props.id + "/workout")
        .doc(data.name)
        .set({
          name: data.name,
          description: data.description,
          exercises: arrayData,
          note: data.note,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      addWorkout(false);
    }

    function editWorkout(workout: NewWorkout) {
      newWorkout.value = workout;
      addWorkout(true);
      editMode(true);
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
      editInfo,
      checkmarkOutline,
      pencilOutline,
      closeOutline,
      trashOutline,
      removeExercise,
      editWorkout,
      editModeRef,
      editMode,
      createWorkout
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

    async deleteAlertConfirm(data: string) {
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
              this.deleteWorkout(data);
            },
          },
        ],
      });
      return alert.present();
    },

    deleteWorkout(workoutName: string) {
      db.collection("user/" + this.id + "/workout")
        .doc(workoutName)
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
