<template>
  <ion-page style="background-color: var(--ion-color-light)">
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
    <ion-content
      fullscreen="true"
      style="--padding-top: 4em; z-index: 20; --background: transparent;"
    >
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button color="dark" size="small" @click="presentAlertQuit()">
          <ion-icon :icon="close"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-card
        color="tertiary"
        button="true"
        @click="showWorkoutNote = !showWorkoutNote"
        style="border-radius: 45px; margin-top: 0em; margin-bottom: 1em;; z-index: 10"
      >
        <ion-item color="tertiary" lines="none">
          <ion-icon
            style="color: var(--ion-color-primary)"
            slot="start"
            :icon="document"
          ></ion-icon>
          <ion-label color="primary">Workout note</ion-label>
        </ion-item>
      </ion-card>
      <ion-card
        v-if="showWorkoutNote"
        style="
            border-radius: 0px 0px 20px 20px;
            transform: translateY(-30px);
            margin-top: 0px;
            margin-bottom: 0.4em
            padding-top: 0.4em;
          "
        color="secondary"
        ><ion-card-content>{{ workout.note }}</ion-card-content></ion-card
      >
      <!-- CARD ELEMENT -->

      <div v-for="(exercise, index) in exercises" :key="exercise.id">
        <ion-card
          :color="exercise.state == 'done' ? 'primary' : 'success'"
          style="border-radius: 45px; margin-bottom: 1em; margin-top: 0px; z-index: 10"
        >
          <ion-item
            :color="exercise.state == 'done' ? 'primary' : 'dark'"
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
              style="--box-shadow: 0px"
              v-if="exercise.state == 'edit'"
              slot="end"
              color="light"
              @click="exercise.state = 'active'"
            >
              <ion-icon
                style="color: var(--ion-color-dark)"
                :icon="remove"
              ></ion-icon>
            </ion-fab-button>
            <ion-fab-button
              style="--box-shadow: 0px"
              v-if="exercise.state == 'active'"
              slot="end"
              color="light"
              @click="exercise.state = 'edit'"
            >
              <ion-icon
                style="color: var(--ion-color-dark)"
                :icon="add"
              ></ion-icon>
            </ion-fab-button>
            <ion-fab-button
              style="--box-shadow: 0px"
              v-if="exercise.state == 'done'"
              slot="end"
              color="light"
            >
              <ion-icon :icon="checkmarkOutline"></ion-icon>
            </ion-fab-button>
          </ion-item>
        </ion-card>
        <ion-card
          v-show="exercise.state == 'edit'"
          color="secondary"
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
              <ion-grid
                style="--ion-grid-padding: 0px; --ion-grid-column-padding: 0px;"
              >
                <ion-row class="ion-align-items-center">
                  <ion-col class="ion-justify-content-center" size="4">
                    <h2 style="text-align: center">Modify reps</h2>
                  </ion-col>

                  <ion-col size="3"
                    ><ion-button
                      shape="round"
                      color="dark"
                      @click="
                        exercise.repsDone--;
                        exercise.repsDifference--;
                      "
                      ><ion-icon
                        :icon="remove"
                        size="small"
                        slot="icon-only"
                      ></ion-icon></ion-button
                  ></ion-col>
                  <ion-col size="2"
                    ><h2 style="text-align: center">
                      {{ exercise.repsDone }}
                    </h2></ion-col
                  >
                  <ion-col size="3"
                    ><ion-button
                      shape="round"
                      color="dark"
                      @click="
                        exercise.repsDone++;
                        exercise.repsDifference++;
                      "
                      ><ion-icon
                        :icon="add"
                        size="small"
                        slot="icon-only"
                      ></ion-icon></ion-button
                  ></ion-col>
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
              <ion-grid
                style="--ion-grid-padding: 0px; --ion-grid-column-padding: 0px;"
              >
                <ion-row class="ion-align-items-center">
                  <ion-col class="ion-justify-content-center" size="4">
                    <h2 style="text-align: center">Modify weight</h2>
                  </ion-col>

                  <ion-col size="3"
                    ><ion-button
                      shape="round"
                      color="dark"
                      @click="
                        exercise.weightDone -= 2;
                        exercise.weightDifference -= 2;
                      "
                      ><ion-icon
                        :icon="remove"
                        size="small"
                        slot="icon-only"
                      ></ion-icon></ion-button
                  ></ion-col>
                  <ion-col size="2"
                    ><h2 style="text-align: center">
                      {{ exercise.weightDone }}
                    </h2></ion-col
                  >
                  <ion-col size="3"
                    ><ion-button
                      shape="round"
                      color="dark"
                      @click="
                        exercise.weightDone += 2;
                        exercise.weightDifference += 2;
                      "
                      ><ion-icon
                        :icon="add"
                        size="small"
                        slot="icon-only"
                      ></ion-icon></ion-button
                  ></ion-col>
                </ion-row>
              </ion-grid>
            </div>
          </ion-card-content>
        </ion-card>
        <!-- TIMER -->
        <ion-card
          v-if="exercise.state == 'active' && exercise.timerActive == false"
          button="true"
          color="secondary"
          style="border-radius: 45px; margin-top: 0em; margin-bottom: 1em;"
          @click="setTimer(index, exercise.rest)"
        >
          <ion-item lines="none" color="secondary"
            ><ion-icon size="small" slot="start" :icon="flame"></ion-icon
            ><ion-label>Done</ion-label>
            <ion-label slot="end" style="text-align: right" color="medium">{{
              "rest: " + exercise.rest + "s"
            }}</ion-label></ion-item
          >
        </ion-card>
        <ion-card
          v-else-if="exercise.state == 'active' && exercise.timerActive == true"
          button="false"
          :color="
            exercise.rest % 2 == 0 && exercise.rest < 10
              ? 'primary'
              : 'tertiary'
          "
          style="border-radius: 45px; margin-top: 0em; margin-bottom: 1em;"
        >
          <ion-item
            lines="none"
            :color="
              exercise.rest % 2 == 0 && exercise.rest < 10
                ? 'primary'
                : 'secondary'
            "
            ><ion-icon size="small" slot="start" :icon="timerOutline"></ion-icon
            ><ion-label>{{ exercise.rest + " Seconds" }}</ion-label></ion-item
          >
        </ion-card>
      </div>
    </ion-content>
    <ion-footer>
      <div style="background-color: var(--ion-color-medium)">
        <div class="rounded-container-bottom"></div>
      </div>
    </ion-footer>
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
  alertController,
  IonModal,
  IonFab,
  IonLabel,
  IonFooter,
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
  close,
  timerOutline,
  flame,
} from "ionicons/icons";
import Info from "../components/modals/Info.vue";
import Note from "../components/modals/Note.vue";
import Record from "./modals/Record.vue";
import { db, auth, alarm } from "../main";
import {
  LocalNotifications,
  ScheduleOptions,
} from "@capacitor/local-notifications";
import { App } from "@capacitor/app";
import { useBackButton } from "@ionic/vue";
import { StatusBar } from "@capacitor/status-bar";

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
    IonModal,
    IonFab,
    IonLabel,
    IonFooter,
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
      exercises.value[exercises.value.length - 1].rest = 0;
    });
    /* SETUP COMPLETED */
    const onExit = ref(false);

    function exitAndSave() {
      onExit.value = true;
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
          color: doneWorkout.color,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      StatusBar.show();
      context.emit("exitWorkout");
    }
    /* NOTE */
    const showWorkoutNote = ref(false);
    /* CARD CONTROLLER */

    function exerciseDone(index: number) {
      exercises.value[index].state = "done";
    }

    /* LOCAL NOTIFICATIONS */

    //app state
    const appActiveState = ref(true);

    App.addListener("appStateChange", ({ isActive }) => {
      appActiveState.value = isActive;
    });

    function sendNotification(index: number) {
      const exercise = exercises.value[index + 1].id;
      const options: ScheduleOptions = {
        notifications: [
          {
            title: "Rest over! Next up...",
            body: exercise,
            id: index,
          },
        ],
      };
      LocalNotifications.schedule(options);
    }

    // TIMER

    const isTimerActive = ref(false);

    function exitTimer(timer: number, index: number) {
      clearInterval(timer);
      if (!onExit.value) {
        exerciseDone(index);
        isTimerActive.value = false;
        if (appActiveState.value) {
          alarm.play();
        } else sendNotification(index);
      }
    }

    function setTimer(index: number, seconds: number) {
      if (!isTimerActive.value) {
        isTimerActive.value = true;
        exercises.value[index].timerActive = true;
        let interval = seconds;
        //timer
        const timerObject = setInterval(function() {
          interval--;
          exercises.value[index].rest = interval;
          if (interval <= 0) {
            exitTimer(timerObject, index);
          }
        }, 1000);
      }
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

    // ALERT
    const presentAlertQuit = async () => {
      const alert = await alertController.create({
        cssClass: "alert-class",
        header: "Before exit",
        message: "Save current session?",
        buttons: [
          {
            text: "Discard",
            cssClass: "discard",
            handler: () => {
              onExit.value = true;
              context.emit("exitWorkout");
            },
          },
          {
            text: "Save",
            handler: () => {
              exitAndSave();
            },
          },
        ],
      });
      return alert.present();
    };

    useBackButton(100, () => {
      console.log("Handler was called!");
      presentAlertQuit();
    });

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
      setTimer,
      close,
      timerOutline,
      presentAlertQuit,
      flame,
      showWorkoutNote,
    };
  },
});
</script>
<style scoped>
.rounded-container-bottom {
  display: block;
  background-color: var(--ion-color-light);
  height: 21px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.alert-class {
  --background: var(--ion-color-light);
}
.discard {
  color: var(--ion-color-danger);
}
</style>
