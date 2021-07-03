<template>
  <ion-page style="background-color: #303136">
    <div class="box">
      <img src="./logo.svg" />
      <ion-item lines="none" color="light">
        <h1
          style="font-weight: 500; font-size: 2.8em; margin-bottom: 0px; color: #718187"
        >
          {{ mode === AuthMode.SignIn ? "Sign In" : "Sign Up" }}
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
      <form
        v-if="emailSignIn"
        style="width: 75vw"
        @submit.prevent="
          mode === AuthMode.SignIn
            ? signInWithEmailAndPassword(email, password)
            : signUpWithEmailAndPassword(name, email, password)
        "
      >
        <ion-item v-if="mode === AuthMode.SignUp" style="--background: #303136">
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="name"></ion-input>
        </ion-item>
        <ion-item style="--background: #303136">
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email"></ion-input>
        </ion-item>
        <ion-item style="--background: #303136">
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>
        <ion-button
          style="--border-radius: 20px; --padding-top: 1.6em;  --padding-bottom: 1.6em; font-size: 1em"
          expand="block"
          color="secondary"
          class="ion-margin-top"
          type="submit"
        >
          {{ mode === AuthMode.SignIn ? "Sign In" : "Sign Up" }}
        </ion-button>
        <ion-button
          style="--border-radius: 20px; --padding-top: 1.6em;  --padding-bottom: 1.6em; font-size: 1em"
          expand="block"
          color="medium"
          class="ion-margin-top"
          @click="
            mode = mode === AuthMode.SignIn ? AuthMode.SignUp : AuthMode.SignIn
          "
        >
          {{ mode === AuthMode.SignIn ? "Sign Up" : "Cancel" }}
        </ion-button>
        <ion-button
          v-if="!chooseMode && mode === AuthMode.SignIn"
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
      </form>
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
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { reactive, ref, toRefs, defineComponent } from "vue";
import { auth, db } from "../main";
import { logoGoogle, mail, arrowBack } from "ionicons/icons";



enum AuthMode {
  SignIn,
  SignUp,
}

export default defineComponent({
  name: "Login",
  components: {
    IonButton,
    IonPage,
    IonInput,
    IonItem,
    IonLabel,
    IonIcon,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      name: "",
      email: "",
      password: "",
      mode: AuthMode.SignIn,
      errorMsg: "",
    });

    const signInWithEmailAndPassword = async (
      email: string,
      password: string
    ) => {
      try {
        if (!email || !password) {
          state.errorMsg = "Email and Password required";
          return;
        }

        await auth.signInWithEmailAndPassword(email, password);
        router.push("/tabs/home");
      } catch (error) {
        state.errorMsg = error.message;
      }
    };

    const signUpWithEmailAndPassword = async (
      name: string,
      email: string,
      password: string
    ) => {
      try {
        if (!name || !email || !password) {
          state.errorMsg = "Name, email and password required!";
          return;
        }
        const authRes = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        db.collection("user")
          .doc(authRes.user?.uid)
          .set({
            name,
            email,
          });
        router.push("/tabs/home");
      } catch (error) {
        state.errorMsg = error.message;
      }
    };

    /*SIGN IN MODES */
    const emailSignIn = ref(true);
    const chooseMode = ref(false);





    function googleSignIn() {

      router.push("/tabs/home");

    }

    return {
      ...toRefs(state),
      signInWithEmailAndPassword,
      signUpWithEmailAndPassword,
      AuthMode,
      router,
      emailSignIn,
      chooseMode,
      logoGoogle,
      mail,
      arrowBack,
      googleSignIn,
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
