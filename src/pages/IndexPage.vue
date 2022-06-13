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
                Value: <b>{{ localForageValue }}</b>
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
import Storage from '../utils/Storage';

export default defineComponent({
    name: 'IndexPage',
    components: {},

    setup() {
        // Variables
        // ---------
        const localForageValue = ref<string>('...');
        const localForageInput = ref<string>('');

        // Functions
        // ---------
        const setLocalForageValue = () => {
            if (localForageInput.value !== '') {
                const item = new Storage({ name: localForageInput.value });

                localforage
                    .setItem('key', item)
                    .then((value: Storage) => {
                        console.log('value', value, typeof value);
                        const data = value.data;
                        if (data) {
                            localForageValue.value = data.name;
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                localforage
                    .getItem('key')
                    .then((value) => {
                        const data = (value as Storage).data;

                        console.log('data', data, 'value', value, typeof value);

                        if (data) {
                            localForageValue.value = data.name;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };

        return {
            setLocalForageValue,
            localForageValue,
            localForageInput,
        };
    },
});
</script>