<template>
  <ion-page style="background-color: var(--ion-color-light)">
    <ion-modal :is-open="isOpenRef">
      <past @exitPast="setOpen(false)" :workout="currentWorkout"></past>
    </ion-modal>
    <ion-header style="z-index: 30" color="light">
      <ion-item lines="none" color="light">
        <ion-text color="primary">
          <h1 style="font-weight: 500; font-size: 2.8em; margin-bottom: 0px">
            Workout history
          </h1>
          <h4 style="font-weight: 400; font-size: 1.5em; margin-top: 0.2em">
            Tap to view report
          </h4>
        </ion-text>
      </ion-item>
    </ion-header>
    <ion-content
      fullscreen="true"
      style="z-index: 20; --background: transparent;"
    >
      <div style="justify-content: flex-start">
        <ion-item v-if="pastWorkouts.length == 0" lines="none" color="light">
          <ion-text color="medium">
            <h4
              style="font-weight: 300; font-size: 1.4em; margin-top: 0.4em; line-height: 1.3em"
            >
              Completed workouts will be shown here
            </h4>
          </ion-text>
        </ion-item>
        <div id="history-grid">
          <ion-card
            v-for="pastWorkout in pastWorkouts"
            :key="pastWorkout.timestamp"
            button="true"
            @click="goToWorkout(pastWorkout)"
            style="border-radius: 28px; width: 46vw; margin: 0.5em"
            v-bind:style="{ '--background': pastWorkout.color }"
          >
            <ion-item
              lines="none"
              v-bind:style="{ '--background': pastWorkout.color }"
            >
              <div class="info-box">
                <h1
                  style="font-weight: 550; font-size: 1.8em; margin-bottom: 0.1em; margin-top: 0.1em; color: var(--ion-color-light);"
                >
                  {{ pastWorkout.name }}
                </h1>
                <h6
                  style="font-weight: 300; font-size: 1em; margin-top: 0.1em; margin-bottom: 0.5em; color: var(--ion-color-light);"
                >
                  {{ pastWorkout.timestamp }}
                </h6>
              </div>
              <ion-icon
                style="color: var(--ion-color-light)"
                :icon="chevronForward"
              ></ion-icon>
            </ion-item>
          </ion-card>
        </div>
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
  IonHeader,
  IonItem,
  IonPage,
  IonText,
  IonCard,
  IonModal,
  IonIcon,
  IonContent,
  IonFooter,
} from "@ionic/vue";
import { defineComponent, onMounted, ref, reactive, onUpdated } from "vue";
import { auth, db } from "../main";
import Past from "../components/modals/Past.vue";
import { chevronForward } from "ionicons/icons";

export default defineComponent({
  name: "History",
  components: {
    IonHeader,
    Past,
    IonItem,
    IonPage,
    IonText,
    IonCard,
    IonModal,
    IonIcon,
    IonContent,
    IonFooter,
  },
  setup() {
    const type: object[] = [];
    const pastWorkouts = ref(type);
    const selectWorkout = ref(true);
    const currentWorkout = reactive({});

    function getWorkoutsOnce() {
      db.collection("user/" + auth.currentUser?.uid + "/history")
        .get()
        .then((querySnapshot) => {
          const temp: object[] = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const item = doc.data();
            temp.push(item);
          });
          pastWorkouts.value = temp;
        });
    }

    onMounted(() => {
      getWorkoutsOnce();
    });

    onUpdated(() => {
      getWorkoutsOnce();
    });

    /* MODAL CONTROLLER */
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);

    return {
      isOpenRef,
      setOpen,
      pastWorkouts,
      selectWorkout,
      currentWorkout,
      chevronForward,
    };
  },
  methods: {
    goToWorkout(selection: object) {
      this.currentWorkout = selection;
      this.setOpen(true);
    },
  },
});
</script>
<style scoped>
#history-grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--ion-color-light);
}
.title {
  background-color: var(--ion-color-primary-contrast);
  color: var(--ion-color-primary);
  padding-left: 1vh;
}
.rounded-container-bottom {
  display: block;
  background-color: var(--ion-color-light);
  height: 21px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.info-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-right: 0.1em;
  margin-left: 1em;
}
</style>
