<template>
  <ion-page style="background-color: var(--ion-color-medium)">
    <ion-content color="light">
      <ion-item lines="none" color="light">
        <ion-text color="medium">
          <h1 style="font-weight: 550; font-size: 2.8em; margin-bottom: 0px">
            Your account
          </h1>
        </ion-text>
      </ion-item>
      <ion-card
        v-if="userData.ispersonaltrainer"
        color="primary"
        style="border-radius: 45px;"
      >
        <ion-item lines="none" color="primary">
          <ion-card-header>
            <ion-text color="light">
              <h1
                style="font-weight: 550; font-size: 1.6em; margin-bottom: 0px; margin-top: 0px"
              >
                Personal trainer
              </h1>
              <h6
                style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
              >
                Manage your clients
              </h6>
            </ion-text>
          </ion-card-header>
          <ion-fab-button
            slot="end"
            color="light"
            @click="router.push('/trainer')"
            ><ion-icon :icon="chevronForward"></ion-icon
          ></ion-fab-button>
        </ion-item>
      </ion-card>

      <ion-card color="secondary" style="border-radius: 45px;">
        <ion-card-header style="padding: 0px">
          <div class="wrapper">
            <img id="avatar" src="https://i.pravatar.cc/300" />
            <ion-text color="medium">
              <h1
                style="font-weight: 550; font-size: 2.4em; margin-bottom: 0px; margin-top: 0px"
              >
                {{ userData.name }}
              </h1>
              <h6
                style="font-weight: 300; font-size: 1.1em; margin-top: 0.1em; margin-bottom: 0.1em"
              >
                {{ userData.email }}
              </h6>
            </ion-text>
          </div>
        </ion-card-header>
      </ion-card>
      <div class="wrapper end">
        <ion-button color="tertiary" shape="round" @click="logout()"
          ><ion-icon slot="start" :icon="logOut"></ion-icon>Logout</ion-button
        >
      </div>
      <ion-card
        :color="editMode ? 'medium' : 'secondary'"
        style="border-radius: 45px;"
      >
        <ion-item lines="none" :color="editMode ? 'medium' : 'secondary'">
          <ion-card-header>
            <ion-text :color="editMode ? 'light' : 'dark'">
              <h1
                style="font-weight: 600; font-size: 1.6em; margin-bottom: 0px; margin-top: 0px"
              >
                Your data
              </h1>
              <h6
                style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
              >
                {{ editMode ? "Tap to save" : "Tap to modify" }}
              </h6>
            </ion-text>
          </ion-card-header>
          <ion-fab-button
            v-if="editMode"
            slot="end"
            color="dark"
            @click="saveData()"
            ><ion-icon :icon="checkmark"></ion-icon
          ></ion-fab-button>
          <ion-fab-button
            v-else
            slot="end"
            color="light"
            @click="editMode = true"
            ><ion-icon :icon="pencil"></ion-icon
          ></ion-fab-button>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="calendarClear"></ion-icon>
          <ion-input
            v-if="editMode"
            required="true"
            v-model="userData.age"
            placeholder="Age"
            type="number"
            color="medium"
          ></ion-input>
          <ion-text v-else>
            <h6
              style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
            >
              {{ userData.age }}
            </h6>
          </ion-text>
        </ion-item>
        <ion-item size="small" lines="none">
          <ion-icon size="small" slot="start" :icon="maleFemale"></ion-icon>
          <ion-input
            v-if="editMode"
            required="true"
            v-model="userData.gender"
            placeholder="Gender"
            type="text"
            color="medium"
          ></ion-input>
          <ion-text v-else>
            <h6
              style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
            >
              {{ userData.gender }}
            </h6>
          </ion-text>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="arrowUp"></ion-icon>
          <ion-input
            v-if="editMode"
            required="true"
            v-model="userData.height"
            placeholder="Height (Meters)"
            type="number"
            color="medium"
          ></ion-input>
          <ion-text v-else>
            <h6
              style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
            >
              {{ userData.height }}
            </h6>
          </ion-text>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="scale"></ion-icon>
          <ion-input
            v-if="editMode"
            required="true"
            v-model="userData.weight"
            placeholder="Weight (Kilograms)"
            type="number"
            color="medium"
          ></ion-input>
          <ion-text v-else>
            <h6
              style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
            >
              {{ userData.weight }}
            </h6>
          </ion-text>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="barbell"></ion-icon>
          <ion-input
            v-if="editMode"
            required="true"
            v-model="userData.trainingfrequence"
            placeholder="Number of weekly workouts"
            type="number"
            color="medium"
          ></ion-input>
          <ion-text v-else>
            <h6
              style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
            >
              {{ userData.trainingfrequence }}
            </h6>
          </ion-text>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="football"></ion-icon>
          <ion-input
            v-if="editMode"
            required="true"
            v-model="userData.trainingtype"
            placeholder="Sport/Exercise type"
            type="text"
            color="medium"
          ></ion-input>
          <ion-text v-else>
            <h6
              style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
            >
              {{ userData.trainingtype }}
            </h6>
          </ion-text>
        </ion-item>
      </ion-card>
    </ion-content>

    <ion-footer>
      <div class="rounded-container-bottom"></div>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonFabButton,
  IonButton,
  IonIcon,
  IonItem,
  IonText,
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonInput,
  IonFooter,
} from "@ionic/vue";

import { defineComponent, onMounted, onUpdated, ref } from "@vue/runtime-core";
import {
  logOut,
  chevronForward,
  pencil,
  checkmark,
  arrowBackOutline,
  calendarClear,
  maleFemale,
  football,
  barbell,
  scale,
  arrowUp,
} from "ionicons/icons";
import { db, auth, userConverter, AppUser } from "../main";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "User",
  components: {
    IonFabButton,
    IonButton,
    IonIcon,
    IonItem,
    IonText,
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonInput,
    IonFooter,
  },
  setup() {
    const router = useRouter();

    //USER DATA

    const type = new AppUser("", "", false, 0, "", 0, 0, 0, "");
    const userData = ref(type);

    function fetchUser() {
      db.collection("user")
        .doc(auth.currentUser?.uid)
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

    onUpdated(()=> {
      fetchUser();
    })

    /* MODIFY DATA */
    const editMode = ref(false);

    function saveData() {
      editMode.value = false;
      db.collection("user")
        .doc(auth.currentUser?.uid)
        .withConverter(userConverter)
        .set(userData.value);
    }

    /* LOGOUT */

    function logout() {
      console.log("logout");
      auth
        .signOut()
        .then(() => {
          userData.value = new AppUser("", "", false, 0, "", 0, 0, 0, "");
          router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      logOut,
      userData,
      chevronForward,
      router,
      pencil,
      editMode,
      checkmark,
      saveData,
      logout,
      arrowBackOutline,
      calendarClear,
      maleFemale,
      football,
      barbell,
      scale,
      arrowUp,
    };
  },
});
</script>
<style scoped>
#avatar {
  border-radius: 50%;
  height: 7em;
  width: 7em;
  margin: 1em;
}
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.end {
  justify-content: flex-end;
  margin-inline: 16px;
}
.rounded-container-bottom {
  display: block;
  background-color: var(--ion-color-light);
  height: 21px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
