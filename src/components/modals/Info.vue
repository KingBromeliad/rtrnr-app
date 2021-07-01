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
          <h1 style="font-weight: 550; font-size: 2.8em; margin-bottom: 0px">{{ exercise.name }}</h1>
          <h4 style="font-weight: 400; font-size: 1.2em; margin-top: 0.2em">{{ exercise.subtitle }}</h4>
        </ion-text>
      </ion-item>
      <div style="--aspect-ratio: 16/9; margin: 1em;">
        <iframe
          :src="exercise.video"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style="border-radius: 20px"
        ></iframe>
      </div>
      <ion-item lines="none" color="medium">
        <ion-text color="dark">
          <h5 style="font-weight: 400; font-size: 1.2em;">{{ exercise.description }}</h5>
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
  name: "info",
  props: {
    exercise: { type: Object, required: true },
  },
  emits: {
    didDismiss: null,
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
      this.$emit("didDismiss");
    },
  },
  setup() {
    return { arrowBackOutline };
  },
});
</script>
<style scoped>
[style*="--aspect-ratio"] > :first-child {
  width: 100%;
}
[style*="--aspect-ratio"] > img {
  height: auto;
}
@supports (--custom: property) {
  [style*="--aspect-ratio"] {
    position: relative;
  }
  [style*="--aspect-ratio"]::before {
    content: "";
    display: block;
    padding-bottom: calc(100% / (var(--aspect-ratio)));
  }
  [style*="--aspect-ratio"] > :first-child {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
}
</style>
