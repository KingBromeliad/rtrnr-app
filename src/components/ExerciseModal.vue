<template>

  <!-- Exercises list mode */ -->
  <div v-if="listMode">
      <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ title }}</ion-title>
          <ion-buttons slot="primary">
            <ion-button @click="close()">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      </ion-content>
      <ion-footer>
        <ion-toolbar>
          <ion-button
            size="large"
            expand="block"
            color="primary"
            fill="outline"
            @click="listMode = false"
            >Add a new exercise</ion-button
          >
        </ion-toolbar>
      </ion-footer>
      </ion-page>
  </div>
  <div v-else>
      <ion-page>
    <!-- Add new exercise mode -->
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>New exercise</ion-title>
        <ion-buttons slot="primary">
          <ion-button color="success" @click="listMode = true">Save</ion-button>
        </ion-buttons>
        <ion-buttons slot="secondary">
          <ion-button color="danger" @click="presentAlertConfirm()">Cancel</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    </ion-page>
  </div> 

</template>

<script>
import {
    IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController,
  alertController,
  IonFooter,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExerciseModal",
  props: {
    title: { type: String, default: "Super Modal" },
  },
  data() {
    return {
      content: "Content",
      listMode: true,
    };
  },
  components: {
      IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonFooter,
  },
  methods: {
    async close() {
      await modalController.dismiss();
    },
        async presentAlertConfirm() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm exit",
        message: "All changes will be lost",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Exit",
            handler: () => {
              this.listMode = true;
            },
          },
        ],
      });
      return alert.present();
    }
  },
});
</script>
