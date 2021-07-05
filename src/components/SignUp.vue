<template>
  <ion-page>
    <!-- TOAST -->
    <ion-toast
      :color="color"
      position="top"
      :is-open="isOpenRef"
      :message="message"
      :duration="1000"
      @didDismiss="setOpen(false)"
    >
    </ion-toast>
    <ion-content color="light" style="--padding-top: 4em">
      <ion-item lines="none" color="medium">
        <ion-text color="dark">
          <h1 style="font-weight: 550; font-size: 2.8em; margin-bottom: 0px">
            Welcome to RTRNR!
          </h1>
          <h4 style="font-weight: 400; font-size: 1.2em; margin-top: 0.2em">
            {{
              name +
                " add information to help your personal trainer create an appropriate workout for you"
            }}
          </h4>
        </ion-text>
      </ion-item>

      <ion-card style="border-radius: 20px">
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="calendarClear"></ion-icon>
          <ion-input
            required="true"
            v-model="age"
            placeholder="Age"
            type="number"
          ></ion-input>
        </ion-item>
        <ion-item size="small" lines="none">
          <ion-icon size="small" slot="start" :icon="maleFemale"></ion-icon>
          <ion-input
            required="true"
            v-model="gender"
            placeholder="Gender"
            type="text"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="arrowUp"></ion-icon>
          <ion-input
            required="true"
            v-model="height"
            placeholder="Height (Meters)"
            type="number"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="scale"></ion-icon>
          <ion-input
            required="true"
            v-model="weight"
            placeholder="Weight (Kilograms)"
            type="number"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="barbell"></ion-icon>
          <ion-input
            required="true"
            v-model="trainingfrequence"
            placeholder="Number of weekly workouts"
            type="number"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="football"></ion-icon>
          <ion-input
            required="true"
            v-model="trainingtype"
            placeholder="Sport/Exercise type"
            type="text"
          ></ion-input>
        </ion-item>
      </ion-card>
      <ion-card v-if="enterCode" style="border-radius: 20px" color="primary">
        <ion-item lines="none" color="primary">
          <ion-icon slot="start" :icon="barbell"></ion-icon>
          <ion-input
            v-model="code"
            placeholder="Enter code"
            type="password"
          ></ion-input>
          <ion-button
            slot="end"
            color="light"
            shape="round"
            @click="isTrainer()"
          >
            validate
          </ion-button>
        </ion-item>
      </ion-card>
      <!-- UPLOAD IMAGE -->

      <ion-card button="true" style="border-radius: 20px" @click="saveUser()"
        ><ion-card-header>
          <h6
            style="font-weight: 400; font-size: 1.2em; margin-top: 0.2em; margin-bottom: 0.2em; text-align: center"
          >
            Save and proceed
          </h6></ion-card-header
        ></ion-card
      >
    </ion-content>
    <ion-footer
      style="background-color: var(--ion-color-light)"
      class="ion-no-border"
    >
      <ion-button
        fill="clear"
        size="small"
        color="medium"
        @click="enterCode = !enterCode"
        >Have a personal trainer code?</ion-button
      >
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonItem,
  IonPage,
  IonContent,
  IonIcon,
  IonCard,
  IonInput,
  IonText,
  IonCardHeader,
  IonToast,
  IonFooter,
  IonButton,
} from "@ionic/vue";
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import {
  arrowBackOutline,
  calendarClear,
  maleFemale,
  football,
  barbell,
  scale,
  arrowUp,
  cloudUpload,
} from "ionicons/icons";
import { auth, db, AppUser, userConverter } from "@/main";
import { useRouter } from "vue-router";
import { useBackButton } from "@ionic/vue";

export default defineComponent({
  name: "ptform",
  props: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  components: {
    IonItem,
    IonContent,
    IonPage,
    IonIcon,
    IonCard,
    IonInput,
    IonText,
    IonCardHeader,
    IonToast,
    IonFooter,
    IonButton,
  },
  methods: {
    close() {
      this.$emit("exitVideo");
    },
  },
  setup(props) {
    useBackButton(10, () => {
      console.log("Handler was called!");
    });

    const router = useRouter();
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);
    const enterCode = ref(false);
    const color = ref<string>("danger");
    const message = ref<string>("All fields are required!");

    const image = ref<File | null>(null);
    /* INPUTS */

    const name = ref<string | null>(null);
    const email = ref<string | null>(null);
    const age = ref<number | null>(null);
    const gender = ref<string | null>(null);
    const height = ref<number | null>(null);
    const weight = ref<number | null>(null);
    const trainingfrequence = ref<number | null>(null);
    const trainingtype = ref<string | null>(null);
    const code = ref<string | null>(null);

    onMounted(() => {
      name.value = props.name;
      email.value = props.email;
    });

    const istrainer = ref(false);

    function isTrainer() {
      if (code.value == "bulgari") {
        istrainer.value = true;
        enterCode.value = false;
        color.value = "success";
        message.value = "You are now Personal Trainer!";
      } else {
        color.value = "danger";
        message.value = "This code does not exist!";
      }
      setOpen(true);
    }

    function saveUser() {
      if (
        name.value &&
        email.value &&
        age.value &&
        gender.value &&
        height.value &&
        weight.value &&
        trainingfrequence.value &&
        trainingtype.value
      ) {
        const newUser = new AppUser(
          name.value,
          email.value,
          false,
          age.value,
          gender.value,
          height.value,
          weight.value,
          trainingfrequence.value,
          trainingtype.value
        );

        if (istrainer.value) newUser.ispersonaltrainer = true;

        /* db */
        db.collection("user")
          .doc(auth.currentUser?.uid)
          .withConverter(userConverter)
          .set(newUser);

        router.push("/tabs/home");
      } else {
        color.value = "danger";
        message.value = "All fields are required!";
        setOpen(true);
      }
    }

    return {
      arrowBackOutline,
      calendarClear,
      maleFemale,
      football,
      barbell,
      scale,
      arrowUp,
      age,
      gender,
      height,
      weight,
      trainingfrequence,
      trainingtype,
      isOpenRef,
      setOpen,
      saveUser,
      enterCode,
      code,
      isTrainer,
      message,
      color,
      cloudUpload,
      image,
    };
  },
});
</script>
