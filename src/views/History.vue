<template>
  <ion-page>
    <ion-modal :is-open="isOpenRef">
      <past @exitPast="setOpen(false)" :workout="currentWorkout"></past>
    </ion-modal>
    <div style="justify-content: flex-start; height: 100vh">
      <ion-item lines="none" >
        <ion-text color="dark">
          <h1 style="font-weight: 550; font-size: 2.8em; margin-bottom: 0px">
            Workout history
          </h1>
          <h4 style="font-weight: 400; font-size: 1.2em; margin-top: 0.2em">
            Tap to view report
          </h4>
        </ion-text>
      </ion-item>
      <div id="history-grid">
        <ion-card
          v-for="pastWorkout in pastWorkouts"
          :key="pastWorkout.timestamp"
          button="true"
          @click="goToWorkout(pastWorkout)"
        >
          <ion-card-header>
            <ion-card-subtitle>{{ pastWorkout.timestamp }}</ion-card-subtitle>
            <ion-card-title>{{ pastWorkout.name }}</ion-card-title>
          </ion-card-header>
        </ion-card>
      </div>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  IonItem,
  IonPage,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonModal,
} from "@ionic/vue";
import { defineComponent, onMounted, ref, reactive } from "vue";
import { auth, db } from "../main";
import Past from "../components/modals/Past.vue";

export default defineComponent({
  name: "History",
  components: {
    Past,
    IonItem,
    IonPage,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonModal,
  },
  setup() {
    const type: object[] = [];
    const pastWorkouts = ref(type);
    const selectWorkout = ref(true);
    const currentWorkout = reactive({});

    function getWorkouts() {
      db.collection("user/" + auth.currentUser?.uid + "/history")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            pastWorkouts.value.push(doc.data());
          });
        });
    }

    onMounted(() => {
      getWorkouts();
      console.log(pastWorkouts.value);
    });
    /* MODAL CONTROLLER */
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);

    return {
      isOpenRef,
      setOpen,
      getWorkouts,
      pastWorkouts,
      selectWorkout,
      currentWorkout,
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
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  display: grid;
  width: 100vw;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 0rem;
  justify-items: center;
}
.title {
  background-color: var(--ion-color-primary-contrast);
  color: var(--ion-color-primary);
  padding-left: 1vh;
}
</style>
