<template>
    <q-page class="row items-center justify-evenly">
        <!-- LocalForage -->
        <q-card class="localForage-card">
            <q-card-section>
                <div class="text-h6">LocalForage</div>
            </q-card-section>
            <q-card-section>
                <q-input
                    v-model="localForageInput"
                    label="Enter a text..."
                    clearable
                />
                <br />
                {{ localForageValue }}
            </q-card-section>

            <q-separator />

            <q-card-actions>
                <q-btn
                    color="secondary"
                    label="Set value with localForage"
                    @click="setLocalForageValue"
                ></q-btn>
            </q-card-actions>
        </q-card>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import localforage from 'localforage';

export default defineComponent({
    name: 'IndexPage',
    components: {},

    setup() {
        const localForageValue = ref<string>('...');
        const localForageInput = ref<string>('');

        const setLocalForageValue = () => {
            localforage
                .setItem('key', { name: localForageInput.value })
                .then((value) => {
                    localForageValue.value = value.name;
                    console.log(`localforage setItem OK => ${value.name}`);
                })
                .catch((err) => {
                    console.error(err);
                });
            localforage
                .getItem('key')
                .then((value) => {
                    /*eslint-disable @typescript-eslint/no-explicit-any*/
                    localForageValue.value = (value as any).name as string;
                    console.log(value);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        return {
            setLocalForageValue,
            localForageValue,
            localForageInput,
        };
    },
});
</script>
