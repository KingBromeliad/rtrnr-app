<template>
  <ion-page>
    <ion-content color="light">
      <ion-item lines="none" color="light">
        <ion-text color="medium">
          <h1 style="font-weight: 550; font-size: 2.8em; margin-bottom: 0px">
            Your account
          </h1>
        </ion-text>
      </ion-item>
      <ion-card color="secondary" style="border-radius: 45px;">
        <ion-card-header style="padding: 0px">
          <div class="wrapper">
            <img id="avatar" src="https://i.pravatar.cc/300" />
            <ion-text color="medium">
              <h1
                style="font-weight: 550; font-size: 2.4em; margin-bottom: 0px; margin-top: 0px"
              >
                Kate Skate
              </h1>
              <h6
                style="font-weight: 300; font-size: 1.2em; margin-top: 0.1em; margin-bottom: 0.1em"
              >
                mail@gmail.com
              </h6>
            </ion-text>
          </div>
        </ion-card-header>
      </ion-card>
      <div class="wrapper end">
        <ion-button color="tertiary" shape="round"
          ><ion-icon slot="start" :icon="logOut"></ion-icon>Logout</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonIcon,
  IonItem,
  IonText,
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
} from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { logOut } from "ionicons/icons";

export default defineComponent({
  name: "User",
  components: {
    IonButton,
    IonIcon,
    IonItem,
    IonText,
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
  },
  setup() {
    return { logOut };
  },
});
</script>
<style scoped>
#avatar {
  border-radius: 50%;
  height: 7em;
  width: 7em;
  margin: 1em;
}
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.end {
  justify-content: flex-end;
  margin-inline: 16px;
}
</style>
