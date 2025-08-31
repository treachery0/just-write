<script setup lang="ts">
    import { computed } from "vue";
    import { useLocalstorageAutosave } from "@/composables/useLocalstorageAutosave.ts";
    import { Settings } from "@/models/Settings.ts";
    import InputTextbox from "@/components/InputTextbox.vue";
    import PageSplash from "@/components/PageSplash.vue";
    import Config from "@/components/Config.vue";
    import Status from "@/components/Status.vue";

    const {reference: settings} = useLocalstorageAutosave<Settings>('jw-settings', () => ({
        theme: 'dark',
        background: undefined,
        font: {
            size: 16
        },
        typingSound: {
            path: undefined,
            volume: 100,
            muted: false
        },
        ambientSound: {
            path: undefined,
            volume: 100,
            muted: false
        },
        goal: {
            enabled: true,
            count: 200,
            unit: 'words'
        },
        showSplash: true,
        showWordCount: true,
        showSaveStatus: true
    }));

    const {reference: text, state} = useLocalstorageAutosave<string>('jw-text', () => '', computed(() => 5000));
</script>

<template>
    <page-splash
        v-if="settings.showSplash"
        v-model="settings.showSplash"
        data-theme="dark"
    />

    <main v-else class="h-full relative overflow-y-auto bg-base-300" :data-theme="settings.theme">
        <div class="p-8">
            <input-textbox v-model="text" :settings class="mb-2"/>
            <status :settings :text :state/>
        </div>

        <config
            class="absolute right-4 bottom-4"
            v-model="settings"
        />
    </main>
</template>