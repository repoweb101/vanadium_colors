<template>

<div class="p-1">
    
    <label for="hue-slider" class="flex flex-row justify-between text-xs font-medium text-text-dark block">

        <span>{{ label }}</span>

        <span class="text-text-light font-bold"
            v-if="label === 'Hue:'"
        >
                {{ Math.round(model_value) + ' deg' }}
        </span>

        <span class="text-text-light font-bold"
            v-else
        >
                {{ Math.round(100 * model_value) + '%' }}
        </span>

    </label>

    <input id="hue-slider" type="range" class="color-props-range"
        v-bind:min="min_value"
        v-bind:max="max_value"
        v-bind:step="step_value"
        v-bind:value="model_value"
        v-on:input="emit('update:modelValue', $event.target.value)"
    >

</div>

</template>

<script setup>
const props = defineProps({
    label: String,
    model_value: Number,
    min_value: Number,
    max_value: Number,
    step_value: Number,
});

const emit = defineEmits([
    'update:modelValue',
]);
</script>