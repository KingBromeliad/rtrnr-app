<template>
  <ion-page>
    <ion-popover
      animated="false"
      :is-open="isPopOpenRef"
      :event="eventRef"
      :translucent="true"
      @didDismiss="setPopOpen(false)"
    >
      <ion-list>
        <ion-list-header>Actions</ion-list-header>
        <ion-item button="true" @click="navigateToWorkout()">
          <ion-label>Manage workouts</ion-label>
        </ion-item>
        <ion-item button="true" @click="navigateToHistory()">
          <ion-label>Past workouts</ion-label>
        </ion-item>
        <ion-item button="true" @click="navigateToData()">
          <ion-label>User data</ion-label>
        </ion-item>
      </ion-list>
    </ion-popover>
    <ion-modal :is-open="isOpenRef" @didDismiss="setOpen(false)">
      <exercise-modal :createMode="false"></exercise-modal>
    </ion-modal>
    <ion-modal :is-open="isEditOpenRef" @didDismiss="setEditOpen(false)">
      <edit-info></edit-info>
    </ion-modal>

    <!-- PAGE -->
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Personal Trainer mode</ion-title>
        <ion-buttons slot="start">
          <ion-button color="danger" @click="exit()">User</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-card button="true" color="primary" @click="setOpen(true)">
        <ion-card-header>
          <ion-card-subtitle>tap to open</ion-card-subtitle>
          <ion-card-title color="dark">Exercise library</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-card button="true" color="tertiary" @click="setEditOpen(true)">
        <ion-card-header>
          <ion-card-subtitle>tap to open</ion-card-subtitle>
          <ion-card-title color="dark">Edit trainer info</ion-card-title>
        </ion-card-header>
      </ion-card>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-list-header>User list</ion-list-header>
        <ion-item
          v-for="user in users"
          :key="user.uid"
          @click="setPopOpen(true, user.uid, $event)"
          button="true"
        >
          <ion-label>{{ user.data.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonModal,
  IonPopover,
  IonListHeader,
  IonList,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/vue";
import { db } from "@/main";
import { onMounted, ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import ExerciseModal from "@/components/ExerciseModal.vue";
import EditInfo from "@/components/modals/EditInfo.vue";

export default defineComponent({
  name: "User",
  components: {
    EditInfo,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonModal,
    ExerciseModal,
    IonPopover,
    IonListHeader,
    IonList,
    IonCardHeader,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
  },
  setup() {
    const router = useRouter();
    interface User {
      uid: string;
      data: object;
    }
    const type: User[] = [];
    const users = ref(type);

    function getUsers() {
      db.collection("user/")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const temp: User = {
              uid: doc.id,
              data: doc.data(),
            };
            users.value.push(temp);
          });
        });
    }

    onMounted(() => {
      getUsers();
    });
    /*MODALS*/
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);

    const isEditOpenRef = ref(false);
    const setEditOpen = (state: boolean) => (isEditOpenRef.value = state);

    /* POP OVER */
    const selectedUid = ref("");

    const isPopOpenRef = ref(false);
    const eventRef = ref();
    const setPopOpen = (state: boolean, id: string, event?: Event) => {
      selectedUid.value = id;
      eventRef.value = event;
      isPopOpenRef.value = state;
    };

    /* NAVIGATION */
    function navigateToWorkout() {
      isPopOpenRef.value = false;
      router.push({ name: "editor", params: { id: selectedUid.value } });
    }
    function navigateToHistory() {
      isPopOpenRef.value = false;
      router.push({ name: "userhistory", params: { id: selectedUid.value } });
    }

    function navigateToData() {
      isPopOpenRef.value = false;
      router.push({ name: "userdata", params: { id: selectedUid.value } });
    }
    function exit() {
      router.push("/tabs/user");
    }
    return {
      navigateToWorkout,
      selectedUid,
      isPopOpenRef,
      eventRef,
      setPopOpen,
      router,
      users,
      getUsers,
      setOpen,
      isOpenRef,
      navigateToHistory,
      exit,
      navigateToData,
      isEditOpenRef,
      setEditOpen,
    };
  },
});
</script>
