<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Workout on!</ion-title>
        <ion-buttons slot="secondary">
          <ion-button color="danger" @click="presentAlertQuit()">Quit</ion-button>
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
            transform: translateY(-45px);
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
                      style="height: 5em"
                      color="light"
                      @click="openDescription(exercise.data)"
                    >
                      <ion-grid>
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
                        <ion-row class="ion-align-items-center"
                          ><h6 style="font-size: 0.8em">
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
                      style="height: 5em"
                      color="light"
                      @click="openNote(exercise)"
                    >
                      <ion-grid>
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
                        <ion-row class="ion-align-items-center"
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
                      style="height: 5em"
                      color="light"
                      @click="openRecord(exercise)"
                    >
                      <ion-grid>
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
                        <ion-row class="ion-align-items-center"
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

export default defineComponent({
  name: "workout",
  components: {
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
  },
  props: {
    workout: { type: NewWorkout, required: true },
  },
  emits: {
    'exitWorkout' : null
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
            temp.id = temp.id + " set number: " + index.toString;
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
      currentWorkout.value.exercises = exercises.value;
      const doneWorkout: PastWorkout = unref(currentWorkout);
      console.log(doneWorkout);
      context.emit('exitWorkout');
    }

    /* CARD CONTROLLER */

    function exerciseDone(data: DoneExercise, index: number) {
      data.state = "done";
      console.log(index);
    }
    return {
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
              this.$emit('exitWorkout');
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
  }
});
</script>
