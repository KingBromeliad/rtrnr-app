<template>
  <ion-page style="background-color: var(--ion-color-light)">
    <ion-toast
      :is-open="isOpenRef"
      message="Copied to clipboard!"
      :duration="1000"
      color="primary"
      @didDismiss="setOpen(false)"
    >
    </ion-toast>
    <ion-content
      fullscreen="true"
      style="z-index: 20; --background: transparent;"
    >
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
        button="true"
        style="border-radius: 45px;"
        @click="router.push('/trainer')"
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
          <ion-fab-button slot="end" color="light"
            ><ion-icon :icon="chevronForward"></ion-icon
          ></ion-fab-button>
        </ion-item>
      </ion-card>

      <ion-card
        button="true"
        @click="toggle()"
        color="secondary"
        style="border-radius: 45px; margin-bottom: 1em; margin-top: 0px; z-index: 10"
      >
        <ion-card-header style="padding: 0px">
          <div class="wrapper">
            <div v-if="editMode" id="camera">
              <ion-fab-button color="medium" @click="takePicture()">
                <ion-icon
                  :icon="camera"
                  style="color: var(--ion-color-light); font-size: 3em;"
                ></ion-icon>
              </ion-fab-button>
            </div>
            <img v-else id="avatar" :src="userData.picture" />

            <ion-text color="light">
              <h1
                style="font-weight: 550; font-size: 2.4em; margin-bottom: 0px; margin-top: 0px"
              >
                {{ userData.name }}
              </h1>
              <h6
                style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
              >
                {{ showData ? userData.email : "Tap to view your data" }}
              </h6>
            </ion-text>
          </div>
        </ion-card-header>
      </ion-card>

      <ion-card
        v-show="showData"
        color="medium"
        style="
            border-radius: 0px 0px 45px 45px;
            transform: translateY(-55px);
            margin-top: 0px;
            padding-top: 40px;
            padding-bottom: 0.3em;
          "
      >
        <ion-item lines="none" color="medium">
          <ion-card-header>
            <ion-text :color="editMode ? 'secondary' : 'light'">
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
          <ion-icon
            style="color: var(--ion-color-light);"
            size="small"
            slot="start"
            :icon="calendarClear"
          ></ion-icon>
          <ion-input
            v-if="editMode"
            required="true"
            v-model="userData.age"
            placeholder="Age"
            type="number"
            color="secondary"
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
          <ion-icon
            style="color: var(--ion-color-light);"
            size="small"
            slot="start"
            :icon="maleFemale"
          ></ion-icon>
          <ion-input
            v-if="editMode"
            required="true"
            v-model="userData.gender"
            placeholder="Gender"
            type="text"
            color="secondary"
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
          <ion-icon
            style="color: var(--ion-color-light);"
            size="small"
            slot="start"
            :icon="arrowUp"
          ></ion-icon>
          <ion-input
            v-if="editMode"
            required="true"
            v-model="userData.height"
            placeholder="Height (Meters)"
            type="number"
            color="secondary"
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
          <ion-icon
            style="color: var(--ion-color-light);"
            size="small"
            slot="start"
            :icon="scale"
          ></ion-icon>
          <ion-input
            v-if="editMode"
            required="true"
            v-model="userData.weight"
            placeholder="Weight (Kilograms)"
            type="number"
            color="secondary"
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
          <ion-icon
            style="color: var(--ion-color-light);"
            size="small"
            slot="start"
            :icon="barbell"
          ></ion-icon>
          <ion-input
            v-if="editMode"
            required="true"
            v-model="userData.trainingfrequence"
            placeholder="Number of weekly workouts"
            type="number"
            color="secondary"
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
          <ion-icon
            style="color: var(--ion-color-light);"
            size="small"
            slot="start"
            :icon="football"
          ></ion-icon>
          <ion-input
            v-if="editMode"
            required="true"
            v-model="userData.trainingtype"
            placeholder="Sport/Exercise type"
            type="text"
            color="secondary"
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

      <div class="wrapper end">
        <ion-button color="tertiary" shape="round" @click="logout()"
          ><ion-icon slot="start" :icon="logOut"></ion-icon>Logout</ion-button
        >
      </div>
      <!-- PERSONAL TRAINER CARD -->
      <ion-item lines="none" color="light">
        <ion-text color="medium">
          <h1 style="font-weight: 550; font-size: 2.8em; margin-bottom: 0.3em">
            Personal trainer
          </h1>
        </ion-text>
      </ion-item>
      <div>
        <ion-card
          color="primary"
          style="border-radius: 45px; margin-bottom: 1em; margin-top: 0px; z-index: 10"
        >
          <ion-card-header style="padding: 0px">
            <div class="wrapper">
              <img id="avatar" :src="trainerData.profilepicture" />
              <ion-text color="light">
                <h1
                  style="font-weight: 550; font-size: 2.4em; margin-bottom: 0px; margin-top: 0px"
                >
                  {{ trainerData.name }}
                </h1>
              </ion-text>
            </div>
          </ion-card-header>
        </ion-card>
        <ion-card
          color="secondary"
          style="
            border-radius: 0px 0px 45px 45px;
            transform: translateY(-55px);
            margin-top: 0px;
            padding-top: 40px;
            padding-bottom: 0.3em;
          "
        >
          <ion-card-content>
            <ion-item
              button="true"
              lines="none"
              color="light"
              style="--border-radius: 20px; margin-bottom: 0.5em"
              :href="trainerData.instagram"
            >
              <ion-icon slot="start" :icon="logoInstagram"></ion-icon>
              <ion-label>{{ trainerData.name }}</ion-label>
            </ion-item>
            <ion-item
              button="true"
              lines="none"
              color="light"
              style="--border-radius: 20px; margin-bottom: 0.5em"
              @click="writeToClipboard(trainerData.contactemail)"
            >
              <ion-icon slot="start" :icon="mailOutline"></ion-icon>
              <ion-label>{{ trainerData.contactemail }}</ion-label>
            </ion-item>
            <ion-item
              button="true"
              lines="none"
              color="light"
              style="--border-radius: 20px; margin-bottom: 0.5em"
              @click="writeToClipboard(trainerData.contactnumber)"
            >
              <ion-icon slot="start" :icon="callOutline"></ion-icon>
              <ion-label>{{ trainerData.contactnumber }}</ion-label>
            </ion-item>
          </ion-card-content>
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
  IonLabel,
  IonCardContent,
  IonToast,
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
  logoInstagram,
  mailOutline,
  callOutline,
  camera,
} from "ionicons/icons";
import { db, auth, userConverter, AppUser, Trainer, storage } from "../main";
import { useRouter } from "vue-router";
import { Clipboard } from "@capacitor/clipboard";
import { Camera, CameraResultType } from "@capacitor/camera";
import { cfaSignOut } from "capacitor-firebase-auth";

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
    IonLabel,
    IonCardContent,
    IonToast,
  },
  setup() {
    const router = useRouter();
    const showData = ref(false);
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);

    //USER DATA

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
      "SSSS-PPPP"
    );
    const userData = ref(type);
    const trainertype = new Trainer();
    const trainerData = ref(trainertype);

    function fetchUser() {
      db.collection("user")
        .doc(auth.currentUser?.uid)
        .withConverter(userConverter)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // Convert
            const temp: AppUser | undefined = doc.data();
            if (temp) {
              userData.value = temp;
              db.collection("trainer")
                .where("code", "==", temp.trainer)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    const type = new Trainer();
                    trainerData.value = Object.assign(type, doc.data());
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            } else console.log("Firebase support TS please");
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

    /* MODIFY DATA */
    const editMode = ref(false);

    /* PICTURE */
    function toggle() {
      if (!editMode.value) showData.value = !showData.value;
    }

    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });

      if (image?.base64String) {
        const user = auth.currentUser;

        const filePath = `${user?.uid}/profile/avatar.${image.format}`;

        const storageRef = storage.ref();

        await storageRef
          .child(filePath)
          .putString(image.base64String, "base64");
        userData.value.picture = await storageRef
          .child(filePath)
          .getDownloadURL();
      }
    };

    function saveData() {
      editMode.value = false;
      db.collection("user")
        .doc(auth.currentUser?.uid)
        .withConverter(userConverter)
        .set(userData.value);
    }

    /* LOGOUT */

    function logout() {
      cfaSignOut().subscribe();
      auth
        .signOut()
        .then(() => {
          userData.value = new AppUser(
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
          router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const writeToClipboard = async (text: string) => {
      await Clipboard.write({
        string: text,
      });
      setOpen(true);
    };

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
      logoInstagram,
      mailOutline,
      callOutline,
      trainerData,
      writeToClipboard,
      isOpenRef,
      setOpen,
      showData,
      camera,
      toggle,
      takePicture,
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
#camera {
  border-radius: 50%;
  height: 7em;
  width: 7em;
  margin: 1em;
  display: grid;
  place-content: center;
  border: 3px solid;
  border-color: var(--ion-color-medium);
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
