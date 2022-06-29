<template>
    <q-page class="row items-center justify-evenly">
        <!-- LocalForage -->
        <q-card>
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
            <q-card-section>
                <div class="text-h6">IP</div>
                <div>{{ ip }}</div>
            </q-card-section>

            <q-separator v-if="servers !== undefined && servers.length !== 0" />
            <q-card-section
                v-if="servers !== undefined && servers.length !== 0"
            >
                <div class="text-h6">Servers list</div>
                <q-list bordered separator>
                    <q-item v-for="server in servers" :key="server.ip">
                        <q-item-section>
                            <q-item-label
                                >{{ server.name }} ({{
                                    server.type
                                }})</q-item-label
                            >
                            <q-item-label caption>
                                {{ server.ip }}:{{ server.port }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>

            <q-separator />
            <q-card-actions>
                <q-btn
                    color="secondary"
                    label="Set value with localForage"
                    @click="setLocalForageValue"
                ></q-btn>
                <q-btn
                    color="primary"
                    @click="ipc_test"
                    label="Test IPC"
                ></q-btn>
            </q-card-actions>
        </q-card>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import localforage from 'localforage';
import Storage from '../utils/Storage';
import { Client } from '../../src-electron/sockets/socket';

export default defineComponent({
    name: 'IndexPage',
    components: {},

    setup() {
        // Variables
        // ---------
        const localForageValue = ref<string>('...');
        const localForageInput = ref<string>('');
        const ip = ref<string>('');
        const servers = ref<Client[]>([]);

        // Functions
        // ---------
        const setLocalForageValue = () => {
            if (localForageInput.value !== '') {
                const item = new Storage({ name: localForageInput.value });
                localforage
                    .setItem('key', item)
                    .then((value: Storage) => {
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
                        // const value1 = Object.assign(new Storage(), value);
                        const value1 = Storage.from(value);
                        const data = value1.data;
                        console.log(value1);
                        console.log(data);
                        if (data) {
                            localForageValue.value = data.name;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };

        const ipc_test = () => {
            console.log('Test IPC');

            getIP();
            connectedServers();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).printAPI.test();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).saleAPI.test();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).appAPI
                .connectedServers()
                .then((list: Client[]) => {
                    console.log(list);
                })
                .catch((error: Error) => {
                    console.error(error);
                });
        };

        const getIP = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).appAPI
                .ip()
                .then((_ip: string | undefined) => {
                    if (_ip !== undefined) {
                        ip.value = _ip;
                    } else {
                        console.error('Undefined IP address');
                    }
                })
                .catch((error: Error) => {
                    console.error(error);
                });
        };

        const connectedServers = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).appAPI
                .connectedServers()
                .then((_servers: Client[]) => {
                    servers.value = _servers;
                })
                .catch((error: Error) => {
                    console.error(error);
                });
        };

        // Startup
        // -------
        getIP();
        connectedServers();

        return {
            setLocalForageValue,
            localForageValue,
            localForageInput,
            ipc_test,
            ip,
            servers,
        };
    },
});
</script>
