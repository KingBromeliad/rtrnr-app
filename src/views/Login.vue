<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <div class="box">
      <form
        @submit.prevent="
          mode === AuthMode.SignIn
            ? signInWithEmailAndPassword(email, password)
            : signUpWithEmailAndPassword(name, email, password)
        "
      >
        <ion-item v-if="mode === AuthMode.SignUp">
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>
        <ion-button
          expand="block"
          color="primary"
          class="ion-margin-top"
          type="submit"
        >
          {{ mode === AuthMode.SignIn ? "Sign In" : "Sign Up" }}
        </ion-button>
        <ion-button
          expand="block"
          color="secondary"
          class="ion-margin-top"
          @click="
            mode = mode === AuthMode.SignIn ? AuthMode.SignUp : AuthMode.SignIn
          "
        >
          {{ mode === AuthMode.SignIn ? "Sign Up" : "Cancel" }}
        </ion-button>
      </form>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonButton,
  IonToolbar,
  IonTitle,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { auth, db } from "../main";

enum AuthMode {
  SignIn,
  SignUp,
}

export default {
  name: "Login",
  components: {
    IonHeader,
    IonButton,
    IonToolbar,
    IonTitle,
    IonPage,
    IonInput,
    IonItem,
    IonLabel,
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

        db.collection("user").doc(authRes.user?.uid).set({
          name,
          email,
        });
        router.push("/tabs/home");
      } catch (error) {
        state.errorMsg = error.message;
      }
    };

    return {
      ...toRefs(state),
      signInWithEmailAndPassword,
      signUpWithEmailAndPassword,
      AuthMode,
      router,
    };
  },
};
</script>
<style scoped>
.box {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>