<script setup lang="ts">
    import { computed } from "vue";
    import { countWords } from "alfaaz";
    import { Settings } from "@/models/Settings.ts";

    const {settings, text} = defineProps<{
        settings: Settings
        text: string
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
                <span v-if="settings.goal.showWordCount">
                    <span>{{ words }} words</span>
                    <span class="mx-1">|</span>
                    <span>{{ characters }} characters</span>
                </span>
            </div>
            <div class="text-center text-primary">
                <span v-if="settings.goal.enabled">
                    {{ Math.floor(actualProgress / settings.goal.count * 100) }}%
                </span>
            </div>
            <div class="text-end">
                <span v-if="settings.goal.enabled">
                    {{ settings.goal.count }} {{ settings.goal.unit }}
                </span>
            </div>
        </div>
    </div>
</template>