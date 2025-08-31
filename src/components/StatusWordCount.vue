<script setup lang="ts">
    const {words, characters} = defineProps<{
        words: string
        characters: string
    }>();
</script>

<template>
    <span>
        <span>{{ words }} words</span>
        <span class="mx-1">|</span>
        <span>{{ characters }} characters</span>
    </span>
</template>