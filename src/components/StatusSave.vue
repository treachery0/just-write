<script setup lang="ts">
    import { SaveState } from "@/composables/useAutosave.ts";

    const {state} = defineProps<{
        state: SaveState
    }>();
</script>

<template>
    <span>
        <span v-if="state === SaveState.resolved" class="text-success">Saved</span>
        <span v-else-if="state === SaveState.waiting" class="text-warning">Not saved</span>
        <span v-else-if="state === SaveState.pending" class="opacity-60">Saving</span>
    </span>
</template>