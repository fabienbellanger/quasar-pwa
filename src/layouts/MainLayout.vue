<template>
    <q-layout view="hHh lpr fFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title>Quasar PWA App Example</q-toolbar-title>

                <div>Quasar v{{ $q.version }}</div>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer> </q-footer>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
    name: 'MainLayout',
    components: {},

    setup() {
        // Variables
        // ---------
        const $q = useQuasar();
        const updateExists = ref(false);
        const registration = ref<ServiceWorkerRegistration>();

        console.log('Is Electron platform: ' + $q.platform.is.electron);

        // Functions
        // ---------
        const updateAvailable = (event: Event) => {
            registration.value = (event as CustomEvent).detail;
            updateExists.value = true;

            // Notify UI
            $q.notify({
                message: 'New version available',
                timeout: 30000,
                color: 'dark',
                actions: [
                    {
                        label: 'Reload',
                        color: 'primary',
                        handler: () => refreshApp(),
                    },
                ],
            });
        };

        const serviceWorkersUpdate = () => {
            document.addEventListener('swUpdated', updateAvailable, {
                once: true,
            });
        };

        const refreshApp = () => {
            if (updateExists.value) {
                updateExists.value = false;

                // Here the actual reload of the page occurs
                window.location.reload();
            }
        };

        // Run
        // ---
        serviceWorkersUpdate();

        return {};
    },
});
</script>
