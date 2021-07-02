<template>
  <ion-page>
    <ion-fab vertical="top" horizontal="start" slot="fixed">
      <ion-fab-button @click="close()" color="dark">
        <ion-icon :icon="arrowBackOutline" color="medium"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-content color="medium" style="--padding-top: 4em">
      <ion-item lines="none" color="medium">
        <ion-text color="dark">
          <h1 style="font-weight: 550; font-size: 2.8em; margin-bottom: 0px">
            Record execution
          </h1>
          <h4 style="font-weight: 400; font-size: 1.2em; margin-top: 0.2em">
            {{ "On " + id }}
          </h4>
        </ion-text>
      </ion-item>
      <ion-item lines="none" color="medium">
        <ion-text color="dark">
          <h5 style="font-weight: 400; font-size: 1.2em;">
            Your personal trainer will evaluate the recording of this exercise
            and particular set. <br /><br />
            Please try to record your full body during the execution.
          </h5>
        </ion-text>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonItem,
  IonPage,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
  IonText,
} from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { arrowBackOutline } from "ionicons/icons";

export default defineComponent({
  name: "record",
  props: {
    id: { type: String, required: true },
  },
  emits: {
    exitVideo: null,
  },
  components: {
    IonItem,
    IonContent,
    IonPage,
    IonIcon,
    IonFab,
    IonFabButton,
    IonText,
  },
  methods: {
    close() {
      this.$emit("exitVideo");
    },
  },
  setup() {
    return { arrowBackOutline };
  },
});
</script>
