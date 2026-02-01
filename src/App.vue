<template>

<section class="flex flex-col gap-y-6 min-w-full w-full items-center">

    <header_component/>

    <main id="vanadiumapp" class="flex flex-col gap-y-2 min-w-[320px] max-w-6xl w-full items-center">

        <section class="w-full mx-auto px-4 mt-8 flex flex-col lg:flex-row content-center lg:justify-items-center gap-6">

            <section class="flex flex-col sm:flex-row lg:flex-col gap-2 md:gap-4 content-center">

                <color_control
                    v-model:hex="color_manipulation_store.hsl_color[0]['selected_color']['hex']"
                    v-model:hue="color_manipulation_store.hsl_color[0]['selected_color']['hsl_arr'][0]"
                    v-model:saturation="color_manipulation_store.hsl_color[0]['selected_color']['hsl_arr'][1]"
                    v-model:lightness="color_manipulation_store.hsl_color[0]['selected_color']['hsl_arr'][2]"
                />

                <color_palette_container
                    v-if="color_manipulation_store.hsl_color.length > 1"
                    v-bind:color_palette="color_manipulation_store.hsl_color"
                />

            </section>

            <section class="rounded-2xl rounded-md flex flex-col h-full min-h-[500px] w-full">

                <div class="flex rounded-t-md">

                    <button
                        v-for="tab in tabs" v-bind:key="tab"
                        :class="['flex-1 py-3 text-sm font-semibold capitalize rounded-t-md transition-all inset-shadow-xs inset-shadow-shadow-light', active_tab === tab ?
                                'bg-background-light text-text-light shadow-sm' : 'text-text-dark hover:bg-shadow-dark']"
                        v-on:click="active_tab = tab" 
                    >
                        {{ tab }}
                    </button>

                </div>
                    
                <div class="flex-1 bg-background-light rounded-b-md shadow-md shadow-black py-8">

                    <div class="animate-in fade-in slide-in-from-bottom-2 duration-300"
                         v-if="active_tab === 'generate'"
                    >
                        <div class="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full mb-15">

                            <div class="mb-6">

                                <h2 class="text-lg font-bold text-text-light mb-2 px-4">Palette generator:</h2>

                                <p class="text-text-dark/70 text-sm px-4">Generate a color palette from all the options below.</p>

                            </div>

                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 px-4">

                                <generate_palette_button
                                    v-for="(generator, i) in palette_generators" :key="i"
                                    v-bind:label="generator.label"
                                    v-bind:tooltip="generator.tooltip"
                                    v-on:generatePalette="generator.function(color_manipulation_store.hsl_color[0]['selected_color']['hsl_arr'])"
                                />

                            </div>

                        </div>

                        <manual_color_generator
                            v-bind:onclick_function="color_manipulation_store.addNewColor"
                        />

                    <color_modification
                        v-if="color_manipulation_store.hsl_color.length > 1"
                        v-on:manual-change="$emit('manual-change', $event)"
                        v-on:delete-color="$emit('delete-color', $event)"
                        v-on:reorder-colors="$emit('reorder-colors', $event)"
                    />

                    </div>

                    <color_accesibility_lab
                        v-if="active_tab === 'WCAG 2.1 Lab'"
                        v-bind:color_palette="color_manipulation_store.hsl_color"
                    />

                </div>

            </section>

        </section>

    </main>

    <footer_component/>

</section>

<!--<app-header :can-undo="canUndo" :can-redo="canRedo" @undo="handleUndo" @redo="handleRedo" @reset="resetState"></app-header>-->

<!--<main class="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-24">
    <div class="lg:col-span-5 space-y-6">
        <primary-color-control :primary-color="currentState.primary" @update:primary-color="setPrimaryColor"></primary-color-control>
        <active-palette-preview :primary-color="currentState.primary" :secondary-colors="currentState.secondaries"></active-palette-preview>
    </div>

    <div class="lg:col-span-7">
        <control-tabs
            :harmony-types="harmonyTypes"
            :current-state="currentState"
            :show-gradient="showGradient"
            :gradient-from="gradientFrom"
            :gradient-to="gradientTo"
            @generate="updatePalette"
            @manual-change="handleManualChange"
            @delete-color="confirmingDeleteIndex = $event"
            @reorder-colors="handleDrop"
            @update:show-gradient="showGradient = $event"
            @update:gradient-from="gradientFrom = $event"
            @update:gradient-to="gradientTo = $event"
        ></control-tabs>

        </div>

    </main>

    <app-footer :copy-success="copySuccess" @export-css="exportCss"></app-footer>
    
    <confirmation-modal
        v-if="confirmingDeleteIndex !== null"
        :color-to-delete="currentState.secondaries[confirmingDeleteIndex]"
        @cancel-delete="confirmingDeleteIndex = null"
        @confirm-delete="handleConfirmDelete"
    ></confirmation-modal>-->
    
</template>

<script setup>
import { ref, watch } from 'vue';
import header_component from './components/sections/header.vue';
import color_control from './components/sections/color_control.vue';
import color_palette_container from './components/sections/color_palette_container.vue';
import generate_palette_button from './components/buttons/generate_palette_button.vue';
import color_accesibility_lab from './components/sections/color_accesibility_lab.vue';
import manual_color_generator from './components/sections/manual_color_generator.vue';
import color_modification from './components/sections/color_modification.vue';
import footer_component from './components/sections/footer.vue';
import { useColorManipulationStore } from './stores/use_color_manipulation_store';
import { usePaletteGeneratorStore } from './stores/use_palette_generator_store';

const color_manipulation_store = useColorManipulationStore();
const palette_generator = usePaletteGeneratorStore();
const active_tab = ref('generate');
const tabs = ['generate', 'WCAG 2.1 Lab'];

const palette_generators = [
    {
        label: "Monochromatic",
        tooltip: "Shades, tones, and tints of a single hue.",
        function: (hsl_color) => {
            palette_generator.generate_monochromatic(hsl_color);
            color_manipulation_store.hsl_color = palette_generator.color_palette;
        },
    },
    {
        label: "Analogous",
        tooltip: "Colors that are adjacent on the color wheel.",
        function: (hsl_color) => {
            palette_generator.generate_analogous(hsl_color);
            color_manipulation_store.hsl_color = palette_generator.color_palette;
        },
    },
    {
        label: "Complementary",
        tooltip: "Colors directly opposite on the color wheel.",
        function: (hsl_color) => {
            palette_generator.generate_complementary(hsl_color);
            color_manipulation_store.hsl_color = palette_generator.color_palette;
        },
    },
    {
        label: "Triadic",
        tooltip: "Three colors evenly spaced on the color wheel.",
        function: (hsl_color) => {
            palette_generator.generate_triadic(hsl_color);
            color_manipulation_store.hsl_color = palette_generator.color_palette;
        },
    },
    {
        label: "Tetradic",
        tooltip: "Two pairs of complementary colors forming a rectangle.",
        function: (hsl_color) => {
            palette_generator.generate_tetradic(hsl_color);
            color_manipulation_store.hsl_color = palette_generator.color_palette;
        },
    },
    {
        label: "Square",
        tooltip: "Selects the next colors by moving every third position clockwise or counterclockwise.",
        function: (hsl_color) => {
            palette_generator.generate_square(hsl_color);
            color_manipulation_store.hsl_color = palette_generator.color_palette;
        },
    },
    {
        label: "Accent",
        tooltip: "Produces a vibrant, balanced set with analogous pairs for harmony and complements for contrast.",
        function: (hsl_color) => {
            palette_generator.generate_accent(hsl_color);
            color_manipulation_store.hsl_color = palette_generator.color_palette;
        },
    },
    {
        label: "Mono Saturated",
        tooltip: "Adaptively varies lightness and saturation based on the base color's properties for balanced tonal range.",
        function: (hsl_color) => {
            palette_generator.generate_saturated_monochromatic(hsl_color);
            color_manipulation_store.hsl_color = palette_generator.color_palette;
        },
    },
];

if (color_manipulation_store.hsl_color.length < 1) {
    color_manipulation_store.addNewColor();
}

watch(() => color_manipulation_store.hsl_color[0]['selected_color']['hex'], (new_val) => {
    let hex_color = color_manipulation_store.hsl_color[0]['selected_color']['hex'];
    color_manipulation_store.hsl_color[0].setHexadecimalValue(hex_color);
    palette_generator.resetPalette();
});

watch(() => color_manipulation_store.hsl_color[0]['selected_color']['hsl_arr'][0], (new_val) => {
    let hsl_color = color_manipulation_store.transformHSLToString(color_manipulation_store.hsl_color[0]['selected_color']['hsl_arr']);
    color_manipulation_store.hsl_color[0].setHSLValue(hsl_color);
    palette_generator.resetPalette();
});

watch(() => color_manipulation_store.hsl_color[0]['selected_color']['hsl_arr'][1], (new_val) => {
    let hsl_color = color_manipulation_store.transformHSLToString(color_manipulation_store.hsl_color[0]['selected_color']['hsl_arr']);
    color_manipulation_store.hsl_color[0].setHSLValue(hsl_color);
    palette_generator.resetPalette();
});

watch(() => color_manipulation_store.hsl_color[0]['selected_color']['hsl_arr'][2], (new_val) => {
    let hsl_color = color_manipulation_store.transformHSLToString(color_manipulation_store.hsl_color[0]['selected_color']['hsl_arr']);
    color_manipulation_store.hsl_color[0].setHSLValue(hsl_color);
    palette_generator.resetPalette();
});
</script>