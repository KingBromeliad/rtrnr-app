<template>
  <ion-page>
    <ion-modal :is-open="isOpenRef">
      <past @exitPast="setOpen(false)" :workout="currentWorkout"></past>
    </ion-modal>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>{{ userData.name }}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/trainer"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
    <div style="justify-content: flex-start; height: 100vh">
      <div id="history-grid">
        <ion-card
          color="tertiary"
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
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonHeader,
  IonTitle,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonModal,
} from "@ionic/vue";
import { defineComponent, onMounted, ref, reactive } from "vue";
import { db } from "@/main";
import Past from "@/components/modals/Past.vue";

export default defineComponent({
  name: "History",
  components: {
    IonContent,
    Past,
    IonPage,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonHeader,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonModal,
  },
  props: { id: String },
  setup(props) {
    const type: object[] = [];
    const pastWorkouts = ref(type);
    const selectWorkout = ref(true);
    const currentWorkout = reactive({});

    function getWorkouts() {
      db.collection("user/" + props.id + "/history").onSnapshot(
        (querySnapshot) => {
          const temp: object[] = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const item = doc.data();
            temp.push(item);
          });
          pastWorkouts.value = temp;
        }
      );
    }


    const userData = ref({});

    function getUserData() {
      const docRef = db.collection("user").doc(props.id);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const temp: object | undefined = doc.data();
            if (temp) userData.value = temp;
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
      getUserData();
      getWorkouts();
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
      getUserData,
      userData,
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
