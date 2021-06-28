<template>
  <ion-page>
    <ion-modal :is-open="isOpenRef" @didDismiss="setOpen(false)">
      <exercise-modal :createMode="false"></exercise-modal>
    </ion-modal>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Personal Trainer mode</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="router.push('/tabs/home')">User</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-title color="primary">Select user</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item
        v-for="user in users"
        :key="user.uid"
        @click="router.push({ name: 'editor', params: { id: user.uid } })"
      >
        <ion-avatar slot="start">
          <img
            src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
          />
        </ion-avatar>
        <ion-label>{{ user.data.name }}</ion-label>
      </ion-item>
      <ion-content class="ion-padding">
        <ion-button @click="setOpen(true)" expand="block">Exercises</ion-button>
      </ion-content>
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
  IonAvatar,
  IonLabel,
  IonModal,
} from "@ionic/vue";
import { db } from "../main";
import { onMounted, ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import ExerciseModal from "../components/ExerciseModal.vue";

export default defineComponent ({
  name: "User",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonButton,
    IonItem,
    IonAvatar,
    IonLabel,
    IonModal,
    ExerciseModal,
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

    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);

    return {
      router,
      users,
      getUsers,
      setOpen,
      isOpenRef,
    };
  },
});
</script>
