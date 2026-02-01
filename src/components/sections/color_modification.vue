<template>

<div class="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full p-4">

    <div class="mb-6">

        <h2 class="text-lg font-bold text-text-light mb-2">Color modification:</h2>

        <p class="text-text-dark/70 text-sm">Fine-tune each secondary color to fullfill your exact specifications.</p>

    </div>

    <div class="space-y-4"
        v-if="color_manipulation_store.hsl_color.length > 1"
    >

        <div 
            v-bind:class="i > 0 && color_manipulation_store.hsl_color.length > 1 ? 'relative flex flex-col sm:flex-row justify-center gap-2 md:gap-4 p-2 md:p-4 pt-14 md:pt-14 rounded-xl '
            + 'transition-all cursor-grab shadow-md shadow-background-dark inset-shadow-xs inset-shadow-shadow-light hover:shadow-lg hover:shadow-shadow-light'
            + ' bg-[conic-gradient(from_90deg_at_25%_65%,theme(colors.background-light),theme(colors.background-dark),theme(colors.background-light))]'
            + ' sm:bg-[conic-gradient(from_90deg_at_15%_50%,theme(colors.background-light),theme(colors.background-dark),theme(colors.background-light))]'
            + ' md:bg-[conic-gradient(from_90deg_at_10%_50%,theme(colors.background-light),theme(colors.background-dark),theme(colors.background-light))]' : ''"
            v-for="(color, i) in color_manipulation_store.hsl_color" v-bind:key="i"  
        >

            <secondary_color_control
                v-if="i > 0 && color_manipulation_store.hsl_color.length > 1"
                v-bind:hex="color_manipulation_store.hsl_color[i]['selected_color']['hex']"
                v-bind:hue="Number(color_manipulation_store.hsl_color[i]['selected_color']['hsl_arr'][0])"
                v-bind:saturation="Number(color_manipulation_store.hsl_color[i]['selected_color']['hsl_arr'][1])"
                v-bind:lightness="Number(color_manipulation_store.hsl_color[i]['selected_color']['hsl_arr'][2])"
                v-bind:element_index="i"
                v-on:update_hex="value => changeHex(i, value)"
                v-on:update_hue="value => changeHue(i, value)"
                v-on:update_saturation="value => changeSaturation(i, value)"
                v-on:update_lightness="value => changeLightness(i, value)"
            />

            <div class="flex flex-col gap-4 justify-between p-0 m-0 w-full"
                v-if="i > 0 && color_manipulation_store.hsl_color.length > 1"
            >

                <div class="px-8 py-2 h-full rounded-xl shadow-inner flex flex-col items-center justify-center text-center transition-colors"
                    v-bind:style="{ background: color_manipulation_store.hsl_color[0].selected_color.hex, color: color.selected_color.hex }"
                >

                    <span class="text-2xl font-bold mb-1">Large Text</span>
                    <span>Normal Text</span>
                    <span class="text-[10px] opacity-80 mt-2 font-mono">{{ color_manipulation_store.hsl_color[0].selected_color.hex.toUpperCase() }} BG</span>

                </div>

                <div class="px-8 py-2 h-full rounded-xl shadow-inner flex flex-col items-center justify-center text-center transition-colors"
                    v-bind:style="{ backgroundColor: color.selected_color.hex, color: color_manipulation_store.hsl_color[0].selected_color.hex }"
                >

                    <span class="text-2xl font-bold mb-1">Large Text</span>
                    <span>Normal Text</span>
                    <span class="text-[10px] opacity-80 mt-2 font-mono">{{ color.selected_color.hex.toUpperCase() }} BG</span>

                </div>

            </div>

            <button class=" absolute top-0 right-0 p-2 rounded-lg text-text-dark hover:bg-rose-100 hover:text-rose-600 transition-colors" title="Delete Color"
                aria-label="Delete Color"
                v-if="i > 0 && color_manipulation_store.hsl_color.length > 1"
                v-on:click="color_manipulation_store.deleteColor(i)"
            >

                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"
                >

                    <polyline points="3 6 5 6 21 6"></polyline>

                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>

                </svg>

            </button>

        </div>

    </div>

</div>

</template>

<script setup>
import secondary_color_control from './secondary_color_control.vue';
import { useColorManipulationStore } from '../../stores/use_color_manipulation_store';

const emit = defineEmits([
    'manual-change',
    'delete-color',
    'reorder-colors',
]);

const color_manipulation_store = useColorManipulationStore();

function changeHex(index, value) {
    color_manipulation_store.hsl_color[index].selected_color.hex = value;
    color_manipulation_store.hsl_color[index].setHexadecimalValue(value);
}

function changeHue(index, value) {
    color_manipulation_store.hsl_color[index].selected_color.hsl_arr[0] = value;
    let hsl_color = color_manipulation_store.transformHSLToString(color_manipulation_store.hsl_color[index]['selected_color']['hsl_arr']);
    color_manipulation_store.hsl_color[index].setHSLValue(hsl_color);
}

function changeSaturation(index, value) {
    color_manipulation_store.hsl_color[index].selected_color.hsl_arr[1] = value;
    let hsl_color = color_manipulation_store.transformHSLToString(color_manipulation_store.hsl_color[index]['selected_color']['hsl_arr']);
    color_manipulation_store.hsl_color[index].setHSLValue(hsl_color);
}

function changeLightness(index, value) {
    color_manipulation_store.hsl_color[index].selected_color.hsl_arr[2] = value;
    let hsl_color = color_manipulation_store.transformHSLToString(color_manipulation_store.hsl_color[index]['selected_color']['hsl_arr']);
    color_manipulation_store.hsl_color[index].setHSLValue(hsl_color);
}

</script>