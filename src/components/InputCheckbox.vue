<script setup lang="ts">
    const value = defineModel<boolean>();
</script>

<template>
    <label class="label">
        <input type="checkbox" class="checkbox checkbox-secondary checkbox-xs" v-model="value"/>
        <span class="select-none">
            <slot/>
        </span>
    </label>
</template>