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
      <ion-card color="primary" style="border-radius: 45px;">
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
                style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
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
      <ion-card color="secondary" style="border-radius: 45px;">
        <ion-item lines="none" color="secondary">
          <ion-card-header>
            <ion-text color="dark">
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
        <ion-card-content>
          <ion-item
            :color="editMode ? 'primary' : 'secondary'"
            style="border-radius: 20px"
          >
            <ion-input
              v-if="editMode"
              inputmode="numeric"
              type="number"
              placeholder="Your weight... Kg"
              v-model="userData.weight"
              style="font-weight: 300; font-size: 1.2em;"
            ></ion-input>
            <ion-text v-else color="light">
              <h6
                style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
              >
                {{ "Weight: " + userData.weight + " Kg" }}
              </h6>
            </ion-text>
          </ion-item>
          <ion-item
            :color="editMode ? 'primary' : 'secondary'"
            style="border-radius: 20px"
          >
            <ion-input
              v-if="editMode"
              inputmode="numeric"
              type="number"
              placeholder="Your height... Meters"
              v-model="userData.height"
              style="font-weight: 300; font-size: 1.2em;"
            ></ion-input>
            <ion-text v-else color="light">
              <h6
                style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
              >
                {{ "Height: " + userData.height + " m" }}
              </h6>
            </ion-text>
          </ion-item>
          <ion-item
            :color="editMode ? 'primary' : 'secondary'"
            lines="none"
            style="border-radius: 20px"
          >
            <ion-input
              v-if="editMode"
              inputmode="numeric"
              type="number"
              placeholder="Your max pull-ups..."
              v-model="userData.pullups"
              style="font-weight: 300; font-size: 1.2em;"
            ></ion-input>
            <ion-text v-else color="light">
              <h6
                style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
              >
                {{ "Max pull-ups: " + userData.pullups }}
              </h6>
            </ion-text>
          </ion-item>
        </ion-card-content>
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
  IonCardContent,
  IonInput,
  IonFooter,
} from "@ionic/vue";
import { defineComponent, ref } from "@vue/runtime-core";
import { logOut, chevronForward, pencil, checkmark } from "ionicons/icons";
import { db, auth } from "../main";
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
    IonCardContent,
    IonInput,
    IonFooter,
  },
  setup() {
    const router = useRouter();

    class User {
      name: string;
      email: string;
      ispersonaltrainer: boolean;
      weight: number;
      height: number;
      pullups: number;

      constructor(
        name: string,
        email: string,
        bool: boolean,
        weight: number,
        height: number,
        pullups: number
      ) {
        this.name = name;
        this.email = email;
        this.ispersonaltrainer = bool;
        this.weight = weight;
        this.height = height;
        this.pullups = pullups;
      }
    }

    // Firestore data converter
    const userConverter = {
      toFirestore: function(user: User) {
        return {
          name: user.name,
          email: user.email,
          ispersonaltrainer: user.ispersonaltrainer,
          weight: user.weight,
          height: user.height,
          pullups: user.height,
        };
      },
      fromFirestore: function(snapshot: any, options: any) {
        const data = snapshot.data(options);
        return new User(
          data.name,
          data.email,
          data.ispersonaltrainer,
          data.weight,
          data.height,
          data.pullups
        );
      },
    };
    //USER DATA
    const type = new User("", "", false, 0, 0, 0);
    const userData = ref(type);

    db.collection("user")
      .doc(auth.currentUser?.uid)
      .withConverter(userConverter)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Convert to City object
          const temp: User | undefined = doc.data();
          if (temp) userData.value = temp;
          else console.log("Firebase support TS please");
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    /* MODIFY DATA */
    const editMode = ref(false);

    function saveData() {
      editMode.value = false;
    }

    /* LOGOUT */

    function logout() {
      console.log("logout");
      auth
        .signOut()
        .then(() => {
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
