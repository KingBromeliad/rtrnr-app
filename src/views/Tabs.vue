<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom" style="--border: none;" color="medium">
        <ion-tab-button tab="History" href="/tabs/history">
          <ion-icon :icon="albums" />
        </ion-tab-button>
          
        <ion-tab-button tab="Home" href="/tabs/home">
          <ion-icon :icon="home" />
        </ion-tab-button>
        
        <ion-tab-button tab="User" href="/tabs/user">
          <ion-icon :icon="person" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage } from '@ionic/vue';
import { home, person, albums } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      home, 
      person, 
      albums,
    }
  }
}
</script>