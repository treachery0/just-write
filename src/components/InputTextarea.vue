<script setup lang="ts">
    import { computed } from "vue";
    import { useTextareaAutosize } from "@vueuse/core";
    import { FontOptions } from "@/models/FontOptions.ts";

    const {font, rows} = defineProps<{
        font: FontOptions,
        rows?: number
    }>();

    const value = defineModel<string>({
        required: true
    });

    const style = computed(() => ({
        fontSize: `${font.size}px`,
        fontFamily: font.name
    }));

    const {textarea} = useTextareaAutosize({
        input: value,
        styleProp: 'minHeight'
    });
</script>

<template>
    <textarea
        v-model="value"
        :style="style"
        :rows="rows"
        ref="textarea"
        class="textarea overflow-hidden w-full resize-none bg-base-100 pt-1.5"
    />
</template>