<template>
  <ion-page style="background-color: var(--ion-color-light)">
    <ion-header class="ion-no-border">
      <ion-toolbar color="light">
        <ion-title>{{ userData.name }}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button color="primary" default-href="/trainer"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
      <ion-card button="true" color="secondary">
        <img id="avatar" :src="userData.picture" />
        <ion-card-header style="padding: 0px">
          <div style="padding: 1em">
            <ion-text color="dark">
              <h1
                style="font-weight: 550; font-size: 2.4em; margin-bottom: 0px; margin-top: 0px"
              >
                {{ userData.name }}
              </h1>
              <h6
                style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
              >
                {{ userData.email }}
              </h6>
            </ion-text>
          </div>
        </ion-card-header>
      </ion-card>

      <ion-card color="medium">
        <ion-item lines="none" color="medium">
          <ion-card-header>
            <ion-text color="light">
              <h1
                style="font-weight: 600; font-size: 1.6em; margin-bottom: 0px; margin-top: 0px"
              >
                User data
              </h1>
            </ion-text>
          </ion-card-header>
        </ion-item>
        <ion-item lines="none">
          <ion-icon
            style="color: var(--ion-color-light);"
            size="small"
            slot="start"
            :icon="calendarClear"
          ></ion-icon>

          <ion-text>
            <h6
              style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
            >
              {{ userData.age }}
            </h6>
          </ion-text>
        </ion-item>
        <ion-item size="small" lines="none">
          <ion-icon
            style="color: var(--ion-color-light);"
            size="small"
            slot="start"
            :icon="maleFemale"
          ></ion-icon>

          <ion-text>
            <h6
              style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
            >
              {{ userData.gender }}
            </h6>
          </ion-text>
        </ion-item>
        <ion-item lines="none">
          <ion-icon
            style="color: var(--ion-color-light);"
            size="small"
            slot="start"
            :icon="arrowUp"
          ></ion-icon>

          <ion-text>
            <h6
              style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
            >
              {{ userData.height }}
            </h6>
          </ion-text>
        </ion-item>
        <ion-item lines="none">
          <ion-icon
            style="color: var(--ion-color-light);"
            size="small"
            slot="start"
            :icon="scale"
          ></ion-icon>

          <ion-text>
            <h6
              style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
            >
              {{ userData.weight }}
            </h6>
          </ion-text>
        </ion-item>
        <ion-item lines="none">
          <ion-icon
            style="color: var(--ion-color-light);"
            size="small"
            slot="start"
            :icon="barbell"
          ></ion-icon>

          <ion-text>
            <h6
              style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
            >
              {{ userData.trainingfrequence }}
            </h6>
          </ion-text>
        </ion-item>
        <ion-item lines="none">
          <ion-icon
            style="color: var(--ion-color-light);"
            size="small"
            slot="start"
            :icon="football"
          ></ion-icon>
          <ion-text>
            <h6
              style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
            >
              {{ userData.trainingtype }}
            </h6>
          </ion-text>
        </ion-item>
      </ion-card>
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
  IonItem,
  IonIcon,
  IonText,
} from "@ionic/vue";
import { defineComponent, onMounted, onUpdated, ref } from "vue";
import { db, userConverter, AppUser } from "@/main";
import {
  arrowBackOutline,
  calendarClear,
  maleFemale,
  football,
  barbell,
  scale,
  arrowUp,
  logoInstagram,
  mailOutline,
  callOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "userdata",
  components: {
    IonContent,
    IonPage,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonHeader,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonItem,
    IonIcon,
    IonText,
  },
  props: { id: String },
  setup(props) {
    const type = new AppUser(
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
    const userData = ref(type);

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
    onMounted(() => {
      fetchUser();
    });

    onUpdated(() => {
      fetchUser();
    });
    return {
      arrowBackOutline,
      calendarClear,
      maleFemale,
      football,
      barbell,
      scale,
      arrowUp,
      logoInstagram,
      mailOutline,
      callOutline,
      userData,
    };
  },
});
</script>
