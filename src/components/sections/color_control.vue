<template>

<section class="min-w-[280px] w-full bg-[conic-gradient(from_90deg_at_25%_50%,theme(colors.background-light),theme(colors.background-dark),theme(colors.background-light))]
                sm:bg-[conic-gradient(from_90deg_at_15%_50%,theme(colors.background-light),theme(colors.background-dark),theme(colors.background-light))]
                md:bg-[conic-gradient(from_90deg_at_10%_50%,theme(colors.background-light),theme(colors.background-dark),theme(colors.background-light))] p-6 rounded-2xl
                shadow-md shadow-black inset-shadow-xs inset-shadow-shadow-light"
>

    <h2 class="flex flex-row justify-between text-sm font-semibold text-text-light uppercase tracking-wider mb-4">

        <span>Primary Color:</span>

        <span class="text-text-dark font-bold">{{ hex }}</span>

    </h2>

    <p class="text-text-dark/80 text-sm leading-relaxed mb-2">Your base color defines the soul of the palette.</p>

    <div class="flex items-center gap-6">

        <div class="relative group">

            <input type="color" class="w-24 h-24 rounded-md cursor-pointer border-4 border-shadow-dark shadow-md ring-2 ring-shadow-light appearance-none"
                v-bind:value="hex"
                v-on:input="changeHex($event.target.value)"
            >

            <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">

                <span class="bg-background-dark text-text-dark text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">Change</span>

            </div>

        </div>

        <div class="flex-1">

            <form_slider
                label="Hue:"
                v-bind:min_value="Number(0)"
                v-bind:max_value="Number(360)"
                v-bind:step_value="Number(1)"
                v-bind:model_value="Number(hue)"
                v-on:update:modelValue="value => changeHue(Math.round(value))"
            />

            <form_slider
                label="Saturation:"
                v-bind:min_value="Number(0)"
                v-bind:max_value="Number(1)"
                v-bind:step_value="Number(0.01)"
                v-bind:model_value="Number(saturation)"
                v-on:update:modelValue="value => changeSaturation(value)"
            />

            <form_slider
                label="Lightness:"
                v-bind:min_value="Number(0)"
                v-bind:max_value="Number(1)"
                v-bind:step_value="Number(0.01)"
                v-bind:model_value="Number(lightness)"
                v-on:update:modelValue="value => changeLightness(value)"
            />

        </div>

    </div>

</section>

</template>

<script setup>
import form_slider from '../forms/form_slider.vue';

const hex = defineModel('hex');
const hue = defineModel('hue');
const saturation = defineModel('saturation');
const lightness = defineModel('lightness');

function changeHex(value) {
    hex.value = value;
}

function changeHue(value) {
    hue.value = value;
}

function changeSaturation(value) {
    saturation.value = value;
}

function changeLightness(value) {
    lightness.value = value;
}
</script>