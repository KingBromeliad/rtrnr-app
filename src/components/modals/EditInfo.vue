<template>
  <ion-page style="background-color: var(--ion-color-light)">
    <ion-toast
      :color="color"
      position="bottom"
      :is-open="isOpenRef"
      :message="message"
      :duration="1000"
      @didDismiss="setOpen(false)"
    >
    </ion-toast>
    <ion-header>
      <ion-toolbar color="light">
        <ion-title>Edit your profile</ion-title>
        <ion-buttons slot="primary">
          <ion-button color="danger" @click="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
      <ion-card>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="person"></ion-icon>
          <ion-input
            required="true"
            v-model="trainerData.name"
            placeholder="Profile name"
            type="text"
          ></ion-input>
        </ion-item>
        <ion-item size="small" lines="none">
          <ion-icon size="small" slot="start" :icon="logoInstagram"></ion-icon>
          <ion-input
            required="true"
            v-model="trainerData.instagram"
            placeholder="Instagram link"
            type="text"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="mailOutline"></ion-icon>
          <ion-input
            required="true"
            v-model="trainerData.contactemail"
            placeholder="Contact email"
            type="text"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-icon size="small" slot="start" :icon="callOutline"></ion-icon>
          <ion-input
            required="true"
            v-model="trainerData.contactnumber"
            placeholder="Contact number"
            type="number"
          ></ion-input>
        </ion-item>
      </ion-card>
      <ion-card>
        <img :src="trainerData.profilepicture" />
        <ion-card-header>
          <ion-card-title>Trainer profile picture</ion-card-title>
        </ion-card-header>
      </ion-card>

      <!-- UPLOAD IMAGE -->
      <ion-card button="true" @click="takePicture()">
        <ion-card-header>
          <ion-item lines="none">
            <ion-icon slot="start" :icon="camera"></ion-icon>
            Take a picture
          </ion-item>
        </ion-card-header>
      </ion-card>
      <ion-card button="true" @click="saveData()"
        ><ion-card-header>
          <h6
            style="font-weight: 400; font-size: 1.2em; margin-top: 0.2em; margin-bottom: 0.2em; text-align: center"
          >
            Save data
          </h6></ion-card-header
        ></ion-card
      >
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonInput,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCard,
  IonItem,
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  modalController,
  IonButton,
  IonToast,
} from "@ionic/vue";
import { defineComponent, onMounted, onUpdated, ref } from "vue";
import { Trainer, db, auth, storage } from "@/main";
import { Camera, CameraResultType } from "@capacitor/camera";
import {
  camera,
  logoInstagram,
  mailOutline,
  callOutline,
  person,
} from "ionicons/icons";

export default defineComponent({
  name: "editinfo",
  components: {
    IonInput,
    IonIcon,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonItem,
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonToast,
  },
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);

    const type = new Trainer();
    const trainerData = ref(type);
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
        trainerData.value.profilepicture = await storageRef
          .child(filePath)
          .getDownloadURL();
      }
    };

    function getData() {
      db.collection("trainer")
        .doc(auth.currentUser?.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // Convert
            const type = new Trainer();
            trainerData.value = Object.assign(type, doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
    onMounted(() => {
      getData();
    });
    onUpdated(() => {
      getData();
    });

    const color = ref("success");
    const message = ref("Data updated successfully");

    function saveData() {
      db.collection("trainer")
        .doc(auth.currentUser?.uid)
        .update({
          name: trainerData.value.name,
          instagram: trainerData.value.instagram,
          contactemail: trainerData.value.contactemail,
          contactnumber: trainerData.value.contactnumber,
          profilepicture: trainerData.value.profilepicture,
        })
        .then(() => {
          message.value = "Document successfully updated!";
          color.value = "success";
          setOpen(true);
        })
        .catch((error) => {
          // The document probably doesn't exist.
          message.value = "Error updating document: " + error;
          color.value = "danger";
          setOpen(true);
        });
    }

    const close = async () => {
      await modalController.dismiss();
    };
    return {
      camera,
      logoInstagram,
      mailOutline,
      callOutline,
      person,
      takePicture,
      saveData,
      close,
      trainerData,
      color,
      message,
      isOpenRef,
      setOpen,
    };
  },
});
</script>
