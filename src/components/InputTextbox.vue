<script setup lang="ts">
    import { computed } from "vue";
    import { useRepeatingAudio } from "@/composables/useRepeatingAudio.ts";
    import { Settings } from "@/models/Settings.ts";

    const {settings} = defineProps<{
        settings: Settings
    }>();

    const text = defineModel<string>({
        required: true
    });

    const textareaStyle = computed(() => ({
        fontSize: settings.font.size + 'px',
        fontFamily: settings.font.name
    }));

    const inputAudio = useRepeatingAudio(computed(() => {
        return settings.typingSound;
    }));
</script>

<template>
    <textarea
        class="textarea textarea-primary w-full resize-none h-96 bg-base-100"
        v-model="text"
        :style="textareaStyle"
        @input="inputAudio.play()"
    />
</template>