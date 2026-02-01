<template>

<section class="min-w-[280px] w-full bg-[conic-gradient(from_90deg_at_25%_50%,theme(colors.background-light),theme(colors.background-dark),theme(colors.background-light))] p-6 rounded-2xl
                shadow-md shadow-black inset-shadow-xs inset-shadow-shadow-light overflow-hidden"
    v-on:click="selectColorPalette()"
>

    <h2 class="text-sm font-semibold text-text-light uppercase tracking-wider mb-4">Active Palette</h2>

    <div class="flex h-32 w-full rounded-xl overflow-hidden shadow-inner bg-slate-100">

        <div v-for="(color, i) in props.color_palette" :key="i" class="flex-1 transition-all duration-500 group relative border-l border-white/10"
            v-bind:style="{ background: color.selected_color.hex }"
        >

            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/10 transition-opacity">
                <span class="text-[10px] text-white font-bold bg-slate-950/20 px-1 py-1 rounded">{{ color.selected_color.hex }}</span>
            </div>

        </div>

    </div>

</section>

</template>

<script setup>
import { useColorManipulationStore } from '../../stores/use_color_manipulation_store';

const props = defineProps({
    color_palette: Object,
});

const color_manipulation_store = useColorManipulationStore();

function selectColorPalette() {
    for (let index = 0; index < 5; index++) {
        color_manipulation_store.hsl_color[index] = props.color_palette[index];
        color_manipulation_store.open_dropdown.push('0');
    }
}
</script>