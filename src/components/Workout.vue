<template>
  <ion-page>
    <!-- MODALS -->
    <ion-modal :is-open="isInfoOpenRef">
      <info @didDismiss="setInfoOpen(false)" :exercise="infoData"></info>
    </ion-modal>
    <ion-modal :is-open="isNoteOpenRef">
      <note @exitNote="addNote" :id="noteId" :note="noteData"></note>
    </ion-modal>
    <ion-modal :is-open="isVideoOpenRef">
      <record @exitVideo="addVideo" :id="videoId"></record>
    </ion-modal>
    <!-- HEADER -->
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Workout on!</ion-title>
        <ion-buttons slot="secondary">
          <ion-button color="danger" @click="presentAlertQuit()"
            >Quit</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- CARD ELEMENT -->

      <div v-for="(exercise, index) in exercises" :key="exercise.id">
        <ion-card
          :color="exercise.state == 'done' ? 'success' : 'tertiary'"
          style="border-radius: 45px; margin-bottom: 1em; margin-top: 0px; z-index: 10"
        >
          <ion-item
            :color="exercise.state == 'done' ? 'success' : 'tertiary'"
            lines="none"
          >
            <ion-card-header>
              <ion-card-title>{{ exercise.data.name }}</ion-card-title>
              <ion-card-subtitle>{{
                exercise.repsDone + " Reps"
              }}</ion-card-subtitle>
              <ion-card-subtitle>{{
                exercise.weightDone + " Kg"
              }}</ion-card-subtitle>
            </ion-card-header>
            <ion-fab-button
              v-if="exercise.state == 'edit'"
              slot="end"
              color="dark"
              @click="exercise.state = 'active'"
            >
              <ion-icon :icon="cloudDoneOutline"></ion-icon>
            </ion-fab-button>
            <ion-fab-button
              v-if="exercise.state == 'active'"
              slot="end"
              color="dark"
              @click="exercise.state = 'edit'"
            >
              <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
            <ion-fab-button
              v-if="exercise.state == 'done'"
              slot="end"
              color="light"
            >
              <ion-icon :icon="checkmarkOutline"></ion-icon>
            </ion-fab-button>
          </ion-item>
        </ion-card>
        <ion-card
          v-if="exercise.state == 'edit'"
          color="dark"
          style="
            border-radius: 0px 0px 45px 45px;
            transform: translateY(-55px);
            margin-top: 0px;
            padding-top: 40px;
          "
        >
          <ion-card-content style="padding:  0.4em 0.8em 0.8em 0.8em">
            <ion-grid style="--ion-grid-padding: 0px">
              <ion-row>
                <ion-col size="4">
                  <ion-row class="ion-justify-content-start">
                    <ion-button
                      style="height: 5em; widht: 4.5em"
                      color="light"
                      @click="openInfo(exercise.data)"
                    >
                      <ion-grid style=" width: 3em">
                        <ion-row
                          class="
                            ion-align-items-center ion-justify-content-center
                          "
                        >
                          <ion-icon
                            :icon="body"
                            style="font-size: 1.2em"
                          ></ion-icon>
                        </ion-row>
                        <ion-row
                          class="ion-align-items-center ion-justify-content-center"
                          ><h6 style="font-size: 0.8em; font-w">
                            Learn the <br />
                            exercise
                          </h6></ion-row
                        >
                      </ion-grid>
                    </ion-button>
                  </ion-row>
                </ion-col>

                <ion-col size="4" class="ion-justify-content-center">
                  <ion-row class="ion-justify-content-center">
                    <ion-button
                      style="height: 5em; widht: 4.5em"
                      color="light"
                      @click="openNote(exercise.id, exercise.note, index)"
                    >
                      <ion-grid style=" width: 3em">
                        <ion-row
                          class="
                          ion-align-items-center ion-justify-content-center
                        "
                        >
                          <ion-icon
                            :icon="document"
                            style="font-size: 1.2em"
                          ></ion-icon>
                        </ion-row>
                        <ion-row
                          class="ion-align-items-center ion-justify-content-center"
                          ><h6 style="font-size: 0.8em">
                            Leave <br />
                            a note
                          </h6></ion-row
                        >
                      </ion-grid>
                    </ion-button>
                  </ion-row>
                </ion-col>
                <ion-col size="4">
                  <ion-row class="ion-justify-content-end">
                    <ion-button
                      style="height: 5em;"
                      color="light"
                      @click="openVideo(exercise.id, index)"
                    >
                      <ion-grid style=" width: 3em">
                        <ion-row
                          class="
                          ion-align-items-center ion-justify-content-center
                        "
                        >
                          <ion-icon
                            :icon="camera"
                            style="font-size: 1.2em"
                          ></ion-icon>
                        </ion-row>
                        <ion-row
                          class="ion-align-items-center ion-justify-content-center"
                          ><h6 style="font-size: 0.8em">
                            Record <br />
                            execution
                          </h6></ion-row
                        >
                      </ion-grid>
                    </ion-button>
                  </ion-row>
                </ion-col>
              </ion-row>
            </ion-grid>
            <div
              style="
                background-color: var(--ion-color-light);
                color: white;
                border-radius: 16px;
                margin-bottom: 0.5em;
              "
            >
              <ion-grid style="--ion-grid-padding: 0px">
                <ion-row class="ion-align-items-center">
                  <ion-col class="ion-justify-content-center" size="4">
                    <h2 style="text-align: center">Modify reps</h2>
                  </ion-col>
                  <ion-col size="8">
                    <ion-grid>
                      <ion-row
                        class="ion-justify-content-end ion-align-items-center"
                      >
                        <ion-col size="auto"
                          ><ion-button
                            color="dark"
                            @click="
                              exercise.repsDone--;
                              exercise.repsDifference--;
                            "
                            ><ion-icon
                              :icon="remove"
                              slot="icon-only"
                            ></ion-icon></ion-button
                        ></ion-col>
                        <ion-col size="auto"
                          ><h2>{{ exercise.repsDone }}</h2></ion-col
                        >
                        <ion-col size="auto"
                          ><ion-button
                            color="dark"
                            @click="
                              exercise.repsDone++;
                              exercise.repsDifference++;
                            "
                            ><ion-icon
                              :icon="add"
                              slot="icon-only"
                            ></ion-icon></ion-button
                        ></ion-col>
                      </ion-row>
                    </ion-grid>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </div>
            <div
              style="
                background-color: var(--ion-color-light);
                color: white;
                border-radius: 16px;
              "
            >
              <ion-grid style="--ion-grid-padding: 0px">
                <ion-row class="ion-align-items-center">
                  <ion-col class="ion-justify-content-center" size="4">
                    <h2 style="text-align: center">Modify weight</h2>
                  </ion-col>
                  <ion-col size="8">
                    <ion-grid>
                      <ion-row
                        class="ion-justify-content-end ion-align-items-center"
                      >
                        <ion-col size="auto"
                          ><ion-button
                            color="dark"
                            @click="
                              exercise.weightDone -= 2;
                              exercise.weightDifference -= 2;
                            "
                            ><ion-icon
                              :icon="remove"
                              slot="icon-only"
                            ></ion-icon></ion-button
                        ></ion-col>
                        <ion-col size="auto"
                          ><h2>{{ exercise.weightDone }}</h2></ion-col
                        >
                        <ion-col size="auto"
                          ><ion-button
                            color="dark"
                            @click="
                              exercise.weightDone += 2;
                              exercise.weightDifference += 2;
                            "
                            ><ion-icon
                              :icon="add"
                              slot="icon-only"
                            ></ion-icon></ion-button
                        ></ion-col>
                      </ion-row>
                    </ion-grid>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </div>
          </ion-card-content>
        </ion-card>
        <!-- TIMER -->
        <ion-card
          v-if="exercise.state == 'active'"
          type="button"
          color="dark"
          style="border-radius: 45px; margin-top: 0em; margin-bottom: 1em;"
          @click="exerciseDone(exercise, index)"
        >
          <ion-card-header
            ><ion-card-subtitle>{{
              exercise.rest + " Seconds"
            }}</ion-card-subtitle></ion-card-header
          >
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonItem,
  IonIcon,
  IonFabButton,
  IonContent,
  IonButton,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonButtons,
  alertController,
  IonModal,
} from "@ionic/vue";
import { defineComponent, onMounted, ref, unref } from "@vue/runtime-core";
import {
  WorkoutExercise,
  NewWorkout,
  DoneExercise,
  PastWorkout,
} from "../main";
import {
  checkmarkOutline,
  addOutline,
  cloudDoneOutline,
  body,
  add,
  remove,
  document,
  camera,
} from "ionicons/icons";
import Info from "../components/modals/Info.vue";
import Note from "../components/modals/Note.vue";
import Record from "./modals/Record.vue";
import { db, auth } from "../main";

export default defineComponent({
  name: "workout",
  components: {
    Record,
    Note,
    Info,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonItem,
    IonIcon,
    IonFabButton,
    IonContent,
    IonButton,
    IonCardContent,
    IonCol,
    IonGrid,
    IonRow,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonButtons,
    IonModal,
  },
  props: {
    workout: { type: NewWorkout, required: true },
  },
  emits: {
    exitWorkout: null,
  },
  setup(props, context) {
    // setup current workout
    const data = new PastWorkout(props.workout);
    const currentWorkout = ref(data);

    //setup exercise list
    const element: DoneExercise[] = [];
    const exercises = ref(element);

    onMounted(() => {
      props.workout.exercises.forEach((element: WorkoutExercise) => {
        const setsN: number = element.sets;
        if (setsN >= 1) {
          for (let index = 0; index < setsN; index++) {
            const temp = new DoneExercise(element);
            temp.id = temp.id + ", set number " + (index + 1);
            exercises.value.push(temp);
          }
        } else {
          const temp = new DoneExercise(element);
          exercises.value.push(temp);
        }
      });
    });
    /* SETUP COMPLETED */

    function exitAndSave() {
      const doneWorkout: PastWorkout = unref(currentWorkout);
            const arrayData: object[] = exercises.value.map((obj) => {
        return Object.assign({}, obj);
      });

      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateAndTime = date + " " + time;

      db.collection("user/" + auth.currentUser?.uid + "/history")
        .add({
          name: doneWorkout.name,
          description: doneWorkout.description,
          exercises: arrayData,
          timestamp: dateAndTime,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });

      console.log(doneWorkout);
      context.emit("exitWorkout");
    }

    /* CARD CONTROLLER */

    function exerciseDone(data: DoneExercise, index: number) {
      data.state = "done";
      console.log(index);
    }

    /* -MODALS- */
    const isInfoOpenRef = ref(false);
    const setInfoOpen = (state: boolean) => (isInfoOpenRef.value = state);
    const infoData = ref({});

    function openInfo(data: object) {
      infoData.value = data;
      setInfoOpen(true);
    }

    const isNoteOpenRef = ref(false);
    const setNoteOpen = (state: boolean) => (isNoteOpenRef.value = state);
    const noteData = ref("");
    const noteId = ref("");
    const noteExercise = ref();

    function openNote(id: string, data: string, index: number) {
      noteData.value = data;
      noteId.value = id;
      noteExercise.value = index;
      setNoteOpen(true);
    }

    function addNote(note: string) {
      exercises.value[noteExercise.value].note = note;
      setNoteOpen(false);
    }

    const isVideoOpenRef = ref(false);
    const setVideoOpen = (state: boolean) => (isVideoOpenRef.value = state);
    const videoId = ref("");
    const videoExercise = ref();

    function openVideo(id: string, index: number) {
      videoId.value = id;
      videoExercise.value = index;
      setVideoOpen(true);
    }

    function addVideo() {
      setVideoOpen(false);
    }

    return {
      db,
      videoId,
      isVideoOpenRef,
      openVideo,
      addVideo,
      noteId,
      noteData,
      isNoteOpenRef,
      openNote,
      addNote,
      NewWorkout,
      WorkoutExercise,
      PastWorkout,
      DoneExercise,
      currentWorkout,
      exercises,
      exitAndSave,
      checkmarkOutline,
      addOutline,
      cloudDoneOutline,
      body,
      add,
      remove,
      document,
      camera,
      exerciseDone,
      isInfoOpenRef,
      setInfoOpen,
      infoData,
      openInfo,
    };
  },
  methods: {
    async presentAlertQuit() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Before exit",
        message: "Save current session?",
        buttons: [
          {
            text: "Discard",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              console.log("Confirm Cancel:");
              this.$emit("exitWorkout");
            },
          },
          {
            text: "Save",
            handler: () => {
              console.log("Confirm Okay");
              this.exitAndSave();
            },
          },
        ],
      });
      return alert.present();
    },
  },
});
</script>
