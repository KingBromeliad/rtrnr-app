<template>
  <ion-page>
    <ion-fab vertical="top" horizontal="start" slot="fixed">
      <ion-fab-button @click="close()" color="medium">
        <ion-icon :icon="arrowBackOutline" color="light"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-content color="light" style="--padding-top: 4em">
      <ion-item lines="none" color="light">
        <ion-text color="medium">
          <h1 style="font-weight: 550; font-size: 2.8em; margin-bottom: 0px">
            Your note
          </h1>
          <h4 style="font-weight: 400; font-size: 1.2em; margin-top: 0.2em">
            {{ "On " + id }}
          </h4>
        </ion-text>
      </ion-item>
      <ion-card color="medium" style="border-radius: 20px">
        <ion-item color="medium">
          <ion-textarea
            placeholder="Leave a note..."
            rows="22"
            v-model="newNote"
            style="padding-top: 0.4em; font-weight: 400; font-size: 1.2em;"
          ></ion-textarea>
        </ion-item>
      </ion-card>
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
  IonCard,
  IonTextarea,
} from "@ionic/vue";
import { defineComponent, onMounted, ref, unref } from "@vue/runtime-core";
import { arrowBackOutline } from "ionicons/icons";

export default defineComponent({
  name: "note",
  props: {
    id: { type: String, required: true },
    note: { type: String, required: true },
  },
  emits: {
    exitNote: null,
  },
  components: {
    IonItem,
    IonContent,
    IonPage,
    IonIcon,
    IonFab,
    IonFabButton,
    IonText,
    IonCard,
    IonTextarea,
  },
  methods: {
    close() {
      const note: string = unref(this.newNote);
      this.$emit("exitNote", note);
    },
  },
  setup(props) {
    const newNote = ref("");

    onMounted(() => {
      newNote.value = props.note;
    });
    return { arrowBackOutline, newNote };
  },
});
</script>
