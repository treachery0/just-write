<script setup lang="ts">
    const value = defineModel<boolean>();
</script>

<template>
    <label class="label">
        <input type="checkbox" class="toggle toggle-secondary toggle-sm" v-model="value"/>
        <span class="select-none text-sm">
            <slot/>
        </span>
    </label>
</template>