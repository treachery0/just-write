<script setup lang="ts">
    import { computed } from "vue";
    import { countWords } from "alfaaz";
    import { Settings } from "@/models/Settings.ts";
    import { SaveState } from "@/composables/useAutosave.ts";
    import StatusSave from "@/components/StatusSave.vue";
    import StatusWordCount from "@/components/StatusWordCount.vue";

    const {settings, text, state} = defineProps<{
        settings: Settings
        text: string
        state: SaveState
    }>();

    const characterCount = computed(() => text.length);
    const characters = computed(() => formatNumber(characterCount.value));

    const wordCount = computed(() => countWords(text));
    const words = computed(() => formatNumber(wordCount.value));

    const actualProgress = computed(() => {
        switch(settings.goal.unit) {
            case 'words':
                return wordCount.value;
            case 'characters':
                return characterCount.value;
            default:
                return -1;
        }
    });

    function formatNumber(value: number) {
        return new Intl.NumberFormat().format(value);
    }
</script>

<template>
    <div>
        <div v-if="settings.goal.enabled">
            <progress class="progress progress-primary" :value="actualProgress" :max="settings.goal.count">70%</progress>
        </div>

        <div class="grid grid-cols-3 text-sm px-1">
            <div class="text-start">
                <status-word-count v-if="settings.showWordCount" :words :characters/>
            </div>
            <div class="text-center text-primary">
                <span v-if="settings.goal.enabled">
                    {{ Math.floor(actualProgress / settings.goal.count * 100) }}%
                </span>
            </div>
            <div class="text-end">
                <status-save v-if="settings.showSaveStatus" :state/>
            </div>
        </div>
    </div>
</template>