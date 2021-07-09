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
      <ion-item v-if="trainerSignUp" lines="none" color="light">
        <ion-text color="primary">
          <h1 style="font-weight: 550; font-size: 2.8em; margin-bottom: 0px">
            Welcome to RTRNR!
          </h1>
          <h4 style="font-weight: 400; font-size: 1.2em; margin-top: 0.2em">
            Create your profile and personal code, users can use your code to
            became clients"
          </h4>
        </ion-text>
      </ion-item>
      <ion-item v-else lines="none" color="light">
        <ion-text color="primary">
          <h1 style="font-weight: 550; font-size: 2.8em; margin-bottom: 0px">
            Welcome to RTRNR!
          </h1>
          <h4 style="font-weight: 400; font-size: 1.2em; margin-top: 0.2em">
            Add information to help your personal trainer create an appropriate
            workout for you
          </h4>
        </ion-text>
      </ion-item>

      <ion-card style="border-radius: 20px">
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="person"></ion-icon>
          <ion-input
            required="true"
            v-model="name"
            placeholder="Name"
            type="text"
          ></ion-input>
        </ion-item>
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
      <ion-card style="border-radius: 20px" color="primary">
        <ion-item>
          <ion-label position="stacked">{{
            trainerSignUp
              ? "Create your code as: XXXX-XXXX"
              : "Personal trainer code"
          }}</ion-label>
          <ion-input
            v-model="trainer"
            placeholder="XXXX-XXXX"
            type="text"
            maxlength="9"
          ></ion-input>
        </ion-item>
      </ion-card>

      <ion-card v-if="trainerSignUp" style="border-radius: 20px">
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="person"></ion-icon>
          <ion-input
            required="true"
            v-model="profilename"
            placeholder="Profile name"
            type="text"
          ></ion-input>
        </ion-item>
        <ion-item size="small" lines="none">
          <ion-icon size="small" slot="start" :icon="logoInstagram"></ion-icon>
          <ion-input
            required="true"
            v-model="instagram"
            placeholder="Instagram link"
            type="text"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="mailOutline"></ion-icon>
          <ion-input
            required="true"
            v-model="contactemail"
            placeholder="Contact email"
            type="text"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="callOutline"></ion-icon>
          <ion-input
            required="true"
            v-model="contactnumber"
            placeholder="Contact number"
            type="number"
          ></ion-input>
        </ion-item>
      </ion-card>

      <!-- UPLOAD IMAGE -->
      <ion-card
        button="true"
        style="border-radius: 20px"
        @click="takePicture()"
      >
        <ion-card-header>
          <ion-item lines="none">
            <ion-icon slot="start" :icon="camera"></ion-icon>
            Take a picture
          </ion-item>
        </ion-card-header>
      </ion-card>

      <ion-card
        button="true"
        color="primary"
        style="border-radius: 20px"
        @click="trainerSignUp ? personalTrainerSignUp() : userSignUp()"
        ><ion-card-header>
          <h6
            style="font-weight: 400; font-size: 1.2em; margin-top: 0.2em; margin-bottom: 0.2em; text-align: center"
          >
            Save and proceed
          </h6></ion-card-header
        ></ion-card
      >
      <ion-card
        button="true"
        style="border-radius: 20px; margin-top: 0.2em"
        color="medium"
        @click="cancel()"
        ><ion-card-header>
          <h6
            style="font-weight: 400; font-size: 1.2em; margin-top: 0.2em; margin-bottom: 0.2em; text-align: center"
          >
            Cancel
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
        @click="trainerSignUp = !trainerSignUp"
        >{{
          trainerSignUp
            ? "Sign up as normal user"
            : "Sign up as personal trainer"
        }}</ion-button
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
  IonLabel,
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
  camera,
  logoInstagram,
  mailOutline,
  callOutline,
  person,
} from "ionicons/icons";
import { auth, db, AppUser, userConverter, storage } from "@/main";
import { useRouter } from "vue-router";
import { useBackButton } from "@ionic/vue";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";


export default defineComponent({
  name: "ptform",
  emits: {
    done: null,
  },
  props: {
    signUpname: { type: String, required: true },
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
    IonLabel,
  },

  setup(props, context) {
    useBackButton(10, () => {
      console.log("Handler was called!");
    });

    const router = useRouter();
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);
    const trainerSignUp = ref(false);
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
    const trainer = ref<string | null>(null);
    const picture = ref(
      "https://firebasestorage.googleapis.com/v0/b/rtrnr-app.appspot.com/o/placeholder.png?alt=media&token=68777f82-4934-4e91-a64d-22b4b992918c"
    );

    /*TRAINER */
    const profilename = ref<string | null>(null);
    const instagram = ref<string | null>(null);
    const contactemail = ref<string | null>(null);
    const contactnumber = ref<string | null>(null);

    onMounted(() => {
      if (typeof auth.currentUser?.displayName === 'string') {
        name.value = auth.currentUser?.displayName;
      } else {
        name.value = props.signUpname;
      }
      if (typeof auth.currentUser?.email === 'string') {
        email.value = auth.currentUser?.email;
      } else email.value = "guest@email.com";
    });

    /* GET AVATAR */

    const takePicture = async () => {
      const image = await Camera.getPhoto({
        source: CameraSource.Prompt,
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
        picture.value = await storageRef.child(filePath).getDownloadURL();
      }
    };

    function userSignUp() {
      if (
        name.value &&
        email.value &&
        picture.value &&
        age.value &&
        gender.value &&
        height.value &&
        weight.value &&
        trainingfrequence.value &&
        trainingtype.value &&
        trainer.value
      ) {
        const newUser = new AppUser(
          name.value,
          email.value,
          picture.value,
          false,
          age.value,
          gender.value,
          height.value,
          weight.value,
          trainingfrequence.value,
          trainingtype.value,
          trainer.value
        );

        /* db */
        db.collection("user")
          .doc(auth.currentUser?.uid)
          .withConverter(userConverter)
          .set(newUser);

        const user = auth.currentUser;
        if (user) {
          user.updateProfile({
            displayName: name.value,
          });
        }

        router.push("/tabs/home");
        context.emit("done");
      } else {
        color.value = "danger";
        message.value = "All fields are required!";
        setOpen(true);
      }
    }

    function personalTrainerSignUp() {
      if (
        name.value &&
        email.value &&
        picture.value &&
        age.value &&
        gender.value &&
        height.value &&
        weight.value &&
        trainingfrequence.value &&
        trainingtype.value &&
        trainer.value &&
        profilename.value &&
        instagram.value &&
        contactemail.value &&
        contactnumber.value
      ) {
        const newUser = new AppUser(
          name.value,
          email.value,
          picture.value,
          true,
          age.value,
          gender.value,
          height.value,
          weight.value,
          trainingfrequence.value,
          trainingtype.value,
          trainer.value
        );

        /* db */
        db.collection("user")
          .doc(auth.currentUser?.uid)
          .withConverter(userConverter)
          .set(newUser);

        db.collection("trainer")
          .doc(auth.currentUser?.uid)
          .set({
            name: profilename.value,
            code: trainer.value,
            instagram: instagram.value,
            contactemail: contactemail.value,
            contactnumber: contactnumber.value,
            profilepicture: picture.value,
          });
        const user = auth.currentUser;
        if (user) {
          user.updateProfile({
            displayName: name.value,
          });
        }

        router.push("/tabs/home");
        context.emit("done");
      } else {
        color.value = "danger";
        message.value = "All fields are required!";
        setOpen(true);
      }
    }

    function cancel() {
      name.value = null;
        email.value = null;
        picture.value ="https://firebasestorage.googleapis.com/v0/b/rtrnr-app.appspot.com/o/placeholder.png?alt=media&token=68777f82-4934-4e91-a64d-22b4b992918c";
        age.value = null;
        gender.value = null;
        height.value = null;
        weight.value = null;
        trainingfrequence.value = null;
        trainingtype.value = null;
        trainer.value = null;
        profilename.value = null;
        instagram.value = null;
        contactemail.value = null;
        contactnumber.value = null;
      context.emit("done");

      auth.signOut();
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
      userSignUp,
      trainerSignUp,
      code,
      message,
      color,
      cloudUpload,
      image,
      camera,
      takePicture,
      profilename,
      instagram,
      contactemail,
      contactnumber,
      personalTrainerSignUp,
      logoInstagram,
      mailOutline,
      callOutline,
      person,
      trainer,
      cancel,
    };
  },
});
</script>
