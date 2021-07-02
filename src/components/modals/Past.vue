<template>
  <ion-page>
    <ion-popover
      :is-open="isOpenRef"
      :event="eventRef"
      :translucent="true"
      @didDismiss="setOpen(false)"
    >
      <ion-item>
        <ion-text>
          {{note}}
        </ion-text>
      </ion-item>
    </ion-popover>
    <ion-fab vertical="top" horizontal="start" slot="fixed">
      <ion-fab-button @click="close()" color="dark">
        <ion-icon :icon="arrowBackOutline" color="medium"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-content color="medium" style="--padding-top: 4em">
      <ion-item lines="none" color="medium">
        <ion-text color="dark">
          <h1 style="font-weight: 550; font-size: 2.8em; margin-bottom: 0px">
            {{ workout.name }}
          </h1>
          <h4 style="font-weight: 400; font-size: 1.2em; margin-top: 0.2em">
            {{ workout.timestamp }}
          </h4>
        </ion-text>
      </ion-item>

      <!-- MAIN ITEM -->
      <div v-for="exercise in workout.exercises" :key="exercise.id">
        <ion-list v-if="exercise.state == 'done'">
          <ion-list-header color="dark">
            {{ exercise.id }}
          </ion-list-header>
          <ion-item lines="none" color="dark">
            <ion-label>{{ exercise.repsDone + " Reps done" }}</ion-label>
            <ion-label>{{ exercise.weightDone + " Kg weight done" }}</ion-label>
          </ion-item>
          <ion-item
            lines="none"
            v-if="
              exercise.repsDifference != 0 || exercise.weightDifference != 0
            "
            color="dark"
          >
            <ion-label
              :color="exercise.repsDifference >= 0 ? 'success' : 'danger'"
              >{{
                (exercise.repsDifference >= 0 ? "+" : "") +
                  exercise.repsDifference +
                  " Reps"
              }}</ion-label
            >
            <ion-label
              :color="exercise.weightDifference >= 0 ? 'success' : 'danger'"
              >{{
                (exercise.weightDifference >= 0 ? "+" : "") +
                  exercise.weightDifference +
                  " Kg"
              }}</ion-label
            >
          </ion-item>
          <ion-item
            lines="none"
            v-if="exercise.note != ''"
            color="dark"
            button="true"
            @click="setOpen(true, exercise.note, $event)"
          >
            <ion-icon
              slot="start"
              :icon="documentTextOutline"
              size="small"
            ></ion-icon>
            <ion-label>Read note</ion-label>
          </ion-item>
          <ion-item
            lines="none"
            v-if="exercise.video != null"
            color="dark"
            button="true"
          >
            <ion-icon slot="start" :icon="filmOutline" size="small"></ion-icon>
            <ion-label>Download video</ion-label>
          </ion-item>
          <ion-item-divider color="medium"> </ion-item-divider>
        </ion-list>

        <ion-list v-else>
          <ion-list-header color="dark">
            {{ exercise.id }}
          </ion-list-header>
          <ion-item lines="none" color="danger">
            <ion-label>SKIPPED</ion-label>
          </ion-item>
          <ion-item-divider color="medium"> </ion-item-divider>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonList,
  IonItemDivider,
  IonLabel,
  IonListHeader,
  IonItem,
  IonPage,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
  IonText,
  IonPopover,
} from "@ionic/vue";
import { defineComponent, ref } from "@vue/runtime-core";
import {
  arrowBackOutline,
  documentTextOutline,
  filmOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "past",
  props: {
    workout: { type: Object, required: true },
  },
  emits: {
    exitPast: null,
  },
  components: {
    IonList,
    IonItemDivider,
    IonLabel,
    IonListHeader,
    IonItem,
    IonContent,
    IonPage,
    IonIcon,
    IonFab,
    IonFabButton,
    IonText,
    IonPopover,
  },
  methods: {
    close() {
      this.$emit("exitPast");
    },
  },
  setup() {
    const isOpenRef = ref(false);
    const eventRef = ref();
    const note = ref("");
    const setOpen = (state: boolean, text: string, event?: Event) => {
      note.value = text;
      eventRef.value = event;
      isOpenRef.value = state;
    };
    return {
      arrowBackOutline,
      documentTextOutline,
      filmOutline,
      eventRef,
      note,
      setOpen,
      isOpenRef
    };
  },
});
</script>
