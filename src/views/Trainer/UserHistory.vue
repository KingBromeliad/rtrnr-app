<template>
  <ion-page>
    <ion-modal :is-open="isOpenRef">
      <past @exitPast="setOpen(false)" :workout="currentWorkout"></past>
    </ion-modal>
    <ion-header class="ion-no-border">
      <ion-toolbar color="light">
        <ion-title>{{ userData.name }}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/trainer"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light" class="ion-padding-top">
      <div id="history-grid">
        <ion-card
          v-for="pastWorkout in pastWorkouts"
          :key="pastWorkout.timestamp"
          button="true"
          @click="goToWorkout(pastWorkout)"
          style="width: 46vw; margin: 0.5em"
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
          </ion-item>
        </ion-card>
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
  IonItem,
  IonModal,
} from "@ionic/vue";
import { defineComponent, onMounted, ref, onUpdated } from "vue";
import { db, AppUser, userConverter } from "@/main";
import Past from "@/components/modals/Past.vue";

export default defineComponent({
  name: "userhistory",
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
    IonModal,
    IonItem,
  },
  props: { id: String },
  setup(props) {
    const type: object[] = [];
    const pastWorkouts = ref(type);
    const selectWorkout = ref(true);
    const currentWorkout = ref<object>();

    const user = new AppUser(
      "",
      "",
      "https://firebasestorage.googleapis.com/v0/b/rtrnr-app.appspot.com/o/placeholder.png?alt=media&token=68777f82-4934-4e91-a64d-22b4b992918c",
      false,
      0,
      "",
      0,
      0,
      0,
      "",
      ""
    );
    const userData = ref(user);

    function fetchUser() {
      db.collection("user")
        .doc(props.id)
        .withConverter(userConverter)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // Convert
            const temp: AppUser | undefined = doc.data();
            if (temp) userData.value = temp;
            else console.log("Firebase support TS please");
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }

    function getWorkouts() {
      db.collection("user/" + props.id + "/history")
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
      getWorkouts();
      fetchUser();
    });

    onUpdated(() => {
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
</style>
