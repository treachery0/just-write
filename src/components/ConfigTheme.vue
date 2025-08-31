<script setup lang="ts">
    import themes from "@/assets/themes.json";

    const currentTheme = defineModel<string | undefined>({
        required: true
    });

    function capitalizeFirstLetter(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
</script>

<template>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Theme</legend>
        <select v-model="currentTheme" class="select select-secondary w-full">
            <option v-for="theme in themes" :value="theme.id">
                {{ theme.light ? '🔆' : '🌑' }} {{ capitalizeFirstLetter(theme.id) }}
            </option>
        </select>
    </fieldset>
</template>