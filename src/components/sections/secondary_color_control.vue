<template>

<article class="min-w-[220px] w-full rounded-xl p-2">

    <h2 class="flex flex-row justify-between text-sm font-semibold text-text-light uppercase tracking-wider mb-4">

        <span>Generated Color {{ props.element_index + 1 }}:</span>

        <span class="text-text-dark font-bold">{{ props.hex }}</span>

    </h2>

    <div class="flex items-center gap-6">

        <div class="relative group">

            <input type="color" class="w-24 h-24 rounded-md cursor-pointer border-4 border-shadow-dark shadow-md ring-2 ring-shadow-light appearance-none"
                v-bind:value="props.hex"
                v-on:input="changeHex($event.target.value)"
            >

            <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">

                <span class="bg-background-dark/50 text-text-light text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">Change</span>

            </div>

        </div>

        <div class="flex-1">

            <form_slider
                label="Hue:"
                v-bind:min_value="Number(0)"
                v-bind:max_value="Number(360)"
                v-bind:step_value="Number(1)"
                v-bind:model_value="Number(props.hue)"
                v-on:update:modelValue="value => changeHue(Math.round(value))"
            />

            <form_slider
                label="Saturation:"
                v-bind:min_value="Number(0)"
                v-bind:max_value="Number(1)"
                v-bind:step_value="Number(0.01)"
                v-bind:model_value="Number(props.saturation)"
                v-on:update:modelValue="value => changeSaturation(value)"
            />

            <form_slider
                label="Lightness:"
                v-bind:min_value="Number(0)"
                v-bind:max_value="Number(1)"
                v-bind:step_value="Number(0.01)"
                v-bind:model_value="Number(props.lightness)"
                v-on:update:modelValue="value => changeLightness(value)"
            />

        </div>

    </div>

</article>

</template>

<script setup>
import form_slider from '../forms/form_slider.vue';

const props = defineProps({
    element_index: Number,
    hex: String,
    hue: Number,
    saturation: Number,
    lightness: Number,
});

const emit = defineEmits([
    'update_hex',
    'update_hue',
    'update_saturation',
    'update_lightness',
]);

function changeHex(value) {
    emit('update_hex', value)
}

function changeHue(value) {
    emit('update_hue', value)
}

function changeSaturation(value) {
    emit('update_saturation', value)
}

function changeLightness(value) {
    emit('update_lightness', value)
}
</script>