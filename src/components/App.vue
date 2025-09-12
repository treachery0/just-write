<script setup lang="ts">
    import { useLocalStorage } from "@vueuse/core";
    import { getDefaultSettings } from "@/functions/utils.ts";
    import { Settings } from "@/models/Settings.ts";
    import AppStart from "@/components/AppStart.vue";
    import AppMain from "@/components/AppMain.vue";

    const settings = useLocalStorage<Settings>(
        'jw-settings',
        getDefaultSettings
    );
</script>

<template>
    <app-start
        v-if="settings.showStartScreen"
        v-model="settings.showStartScreen"
        data-theme="dark"
    />
    <app-main
        v-model="settings"
        v-else
    />
</template>