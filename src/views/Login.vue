<template>
  <ion-page v-if="completeSignUp">
    <PTform :name="name" :email="email"></PTform>
  </ion-page>
  <ion-page v-else style="background-color: #303136">
    <ion-toast
      color="danger"
      position="top"
      :is-open="isOpenRef"
      :message="errorMsg"
      :duration="1000"
      @didDismiss="setOpen(false)"
    >
    </ion-toast>
    <div class="box">
      <img src="./logo.svg" />
      <ion-item lines="none" color="light">
        <h1
          style="font-weight: 500; font-size: 2.8em; margin-bottom: 0px; color: #718187"
        >
          {{ existingUser ? "Sign In" : "Sign Up" }}
        </h1>
      </ion-item>
      <div v-if="chooseMode" style="width: 90vw">
        <div style="margin-bottom: 2em; margin-top: 2em;">
          <ion-button
            expand="block"
            color="medium"
            style="--border-radius: 30px; --padding-top: 1.8em;  --padding-bottom: 1.8em; font-size: 1.2em"
            @click="googleSignIn()"
            ><ion-icon
              style="color: #303136;"
              slot="start"
              :icon="logoGoogle"
            ></ion-icon>
            Sign in with Google</ion-button
          >
        </div>

        <div>
          <ion-button
            expand="block"
            color="medium"
            style="--border-radius: 30px; --padding-top: 1.8em;  --padding-bottom: 1.8em; font-size: 1.2em"
            @click="
              chooseMode = false;
              emailSignIn = true;
            "
            ><ion-icon
              style="color: #303136;"
              slot="start"
              :icon="mail"
            ></ion-icon>
            Sign in with Email</ion-button
          >
        </div>
      </div>

      <!-- EMAIL SIGN IN -->
      <div v-if="emailSignIn" style="width: 75vw">
        <ion-item color="light" lines="inset" v-if="!existingUser">
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="name"></ion-input>
        </ion-item>
        <ion-item color="light" lines="inset">
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email"></ion-input>
        </ion-item>
        <ion-item color="light" lines="inset">
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>
        <ion-button
          style="--border-radius: 20px; --padding-top: 1.6em;  --padding-bottom: 1.6em; font-size: 1em"
          expand="block"
          color="secondary"
          class="ion-margin-top"
          @click="
            existingUser
              ? signInWithEmailAndPassword()
              : signUpWithEmailAndPassword()
          "
        >
          {{ existingUser ? "Sign In" : "Sign Up" }}
        </ion-button>
        <ion-button
          style="--border-radius: 20px; --padding-top: 1.6em;  --padding-bottom: 1.6em; font-size: 1em"
          expand="block"
          color="medium"
          class="ion-margin-top"
          @click="existingUser = !existingUser"
        >
          {{ existingUser ? "Sign Up" : "Cancel" }}
        </ion-button>
        <ion-button
          v-if="!chooseMode && existingUser"
          style="--border-radius: 20px; --padding-top: 1.6em; --padding-bottom: 1.6em; font-size: 1em;"
          expand="block"
          color="tertiary"
          class="ion-margin-top"
          @click="
            emailSignIn = false;
            chooseMode = true;
          "
          ><ion-icon slot="start" :icon="arrowBack"></ion-icon>
          Go back
        </ion-button>
      </div>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonIcon,
  IonToast,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { ref, defineComponent } from "vue";
import { auth } from "../main";
import { logoGoogle, mail, arrowBack } from "ionicons/icons";
import PTform from "@/components/PTform.vue";

export default defineComponent({
  name: "Login",
  components: {
    PTform,
    IonButton,
    IonPage,
    IonInput,
    IonItem,
    IonLabel,
    IonIcon,
    IonToast,
  },
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);

    const router = useRouter();
    const completeSignUp = ref(false);

    const existingUser = ref(true);
    const email = ref("");
    const password = ref("");
    const name = ref("");
    const errorMsg = ref("");

    function signInWithEmailAndPassword() {
      auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
          // Signed in
          router.push("/tabs/home");
        })
        .catch((error) => {
          errorMsg.value = error.message;
          setOpen(true);
        });
    }

    function signUpWithEmailAndPassword() {
      if (email.value != "" && name.value != "" && password.value != "") {
        auth
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(() => {
            completeSignUp.value = true;
          })
          .catch((error) => {
            errorMsg.value = error.message;
            setOpen(true);
          });
      } else {
        errorMsg.value = "All fields are required!";
        setOpen(true);
      }
    }

    /*SIGN IN MODES */
    const emailSignIn = ref(true);
    const chooseMode = ref(false);

    function googleSignIn() {
      router.push("/tabs/home");
    }

    return {
      signInWithEmailAndPassword,
      signUpWithEmailAndPassword,
      router,
      emailSignIn,
      chooseMode,
      logoGoogle,
      mail,
      arrowBack,
      googleSignIn,
      completeSignUp,
      name,
      email,
      password,
      existingUser,
      isOpenRef,
      errorMsg,
      setOpen
    };
  },
});
</script>
<style scoped>
.box {
  height: 100vh;
  display: flex;
  padding-top: 6em;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
