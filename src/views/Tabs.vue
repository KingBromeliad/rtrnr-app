<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="History" href="/tabs/history">
          <ion-icon :icon="triangle" />
          <ion-label>History</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="Home" href="/tabs/home">
          <ion-icon :icon="ellipse" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="User" href="/tabs/user">
          <ion-icon :icon="square" />
          <ion-label>User</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
    }
  }
}
</script>