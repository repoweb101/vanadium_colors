<template>

<div class="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full mb-10">

    <div class="mb-6">

        <h2 class="text-lg font-bold text-text-light mb-2 px-4">Extract colors instantly from an image:</h2>

        <p class="text-text-dark/70 text-sm px-4">Upload an image to start picking pixel colors.</p>

    </div>

    <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 justify-center md:justify-start gap-4 w-full p-4">

        <file_uploader
            v-on:image_selected="value => getImageURL(value)"
        />

        <div class="grid grid-cols-1 place-items-center bg-background-dark/70 border-2 border-dashed border-background-light w-full max-w-[300px] h-full"
            v-if="! image_url"
        >

            <p class="text-lg font-medium text-text-dark">
                Image Preview
            </p>

            <p class="text-sm text-text-light">
                No image uploaded!
            </p>

        </div>

        <div class="p-2 max-w-[300px] overflow-auto"
            v-if="image_url"
        >

            <img class="cursor-crosshair origin-[0%_0%]" alt="Preview of the uploaded image"
                v-bind:style="image_zoom ? {transform: 'scale(' + image_zoom + ')'} : {}"
                v-bind:src="image_url"
                v-on:click="handleImageClick(color_index, $event)"
            >

        </div>

    </div>

    <div class="p-4 w-full min-w-[300px]"
        v-if="image_url"
    >
    
        <label for="hue-slider" class="flex flex-row justify-between text-md font-medium text-text-dark block">

            <span>Zoom: </span>

            <span class="text-text-light font-bold">{{ parseInt(image_zoom * 100) }}%</span>

        </label>

        <input id="hue-slider" type="range" class="w-full color-props-range" min="0.1" max="8.0" step="0.1"
            v-model="image_zoom"
        >

    </div>

    <h3 class="text-sm text-text-dark/70 mt-8 mb-4 px-4">click on the colors below to choose which color update on the image, or click on the add color button to add new one when
        clicking on the image:</h3>

    <div class="flex h-32 w-full max-w-[250px] rounded-xl overflow-hidden shadow-inner mx-4"
        v-if="color_manipulation_store.hsl_color.length === 5"
    >

        <button
            v-for="(color, i) in color_manipulation_store.hsl_color"
            v-bind:key="i"
            v-bind:className="color_index === i ? 'flex-1 transition-all duration-500 group relative border-2 border-white m-1 rounded-md' :
                'flex-1 transition-all duration-500 group relative border-l border-white/10'"
            v-bind:style="{ background: color.selected_color.hex }"
            v-on:click="setColorIndex(i)"
        >

            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/10 transition-opacity">
                <span class="text-[10px] text-white font-bold bg-slate-950/20 px-1 py-1 rounded">{{ color.selected_color.hex }}</span>
            </div>

        </button>

    </div>

    <div class="flex h-32 w-full max-w-[250px] rounded-xl overflow-hidden shadow-inner mx-4"
        v-else
    >

        <button
            v-for="(color, i) in color_manipulation_store.hsl_color"
            v-bind:key="i"
            v-bind:className="color_index === i ? 'flex-1 transition-all duration-500 group relative border-2 border-shadow-dark m-1' :
                'flex-1 transition-all duration-500 group relative border-l border-white/10'"
            v-bind:style="{ background: color.selected_color.hex }"
            v-on:click="setColorIndex(i)"
        >

            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/10 transition-opacity">
                <span class="text-[10px] text-text-light font-bold bg-background-dark/20 px-1 py-1 rounded">{{ color.selected_color.hex }}</span>
            </div>

        </button>

        <button class="'flex-1 transition-all duration-500 group relative border-2 rounded-r-xl border-accent-dark m-1'"
            v-on:click="increaseColorIndexes()"
        >
            <span class="text-[10px] text-text-light font-bold bg-background-dark/20 px-1 py-1 rounded">Add Color</span>

        </button>

    </div>

</div>

</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import file_uploader from '../forms/file_uploader.vue';
import { useColorManipulationStore } from '../../stores/use_color_manipulation_store';

const color_manipulation_store = useColorManipulationStore();

const image_url = ref('');
const image_zoom = ref(1);
const color_index = ref(0);
const color_indexes = ref(0);

onBeforeMount(() => {
    if (color_manipulation_store.hsl_color.length >= 0 && color_manipulation_store.hsl_color.length < 5) {
        color_indexes.value = color_manipulation_store.hsl_color.length + 1;
    } else {
        color_indexes.value = color_manipulation_store.hsl_color.length;
    }
});

const getHexColorFromImage = (event) => {
    try {
        if (! event.target instanceof HTMLImageElement) {
            throw new Error("Error 015");
        }

        if (! event.type === 'click') {
            throw new Error("Error 016");
        }

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = event.target.naturalWidth;
        canvas.height = event.target.naturalHeight;
        context.drawImage(event.target, 0, 0);
        const x = Math.floor(event.offsetX * (event.target.naturalWidth / event.target.clientWidth));
        const y = Math.floor(event.offsetY * (event.target.naturalHeight / event.target.clientHeight));
        const pixel = context.getImageData(x, y, 1, 1).data;
        let rr = pixel[0] >= 0 && pixel[0] < 16 ? '0' + pixel[0].toString(16) : pixel[0].toString(16);
        let gg = pixel[1] >= 0 && pixel[1] < 16 ? '0' + pixel[1].toString(16) : pixel[1].toString(16);
        let bb = pixel[2] >= 0 && pixel[2] < 16 ? '0' + pixel[2].toString(16) : pixel[2].toString(16);
        return '#' + rr + gg + bb;
    } catch (error) {
        if (error.message.includes("Error 015")) {
            console.log("Error 015:", 'The clicked element is not an image.');
        }

        if (error.message.includes("Error 016")) {
            console.log("Error 016:", 'The element was not clicked.');
        }
    }
}

const increaseColorIndexes = () => {
    if (color_manipulation_store.hsl_color.length >= 0 && color_manipulation_store.hsl_color.length < 5) {
        color_indexes.value += 1;
        color_index.value = -1;
    }
}

const getImageURL = (url) => {
    image_url.value = url;
}

const setColorIndex = (index) => {
    color_index.value = index;
}

const handleImageClick = (index, ev) => {
    let color = getHexColorFromImage(ev);

    if (index === -1) {
        color_manipulation_store.addNewColor();
        color_manipulation_store.hsl_color[color_manipulation_store.hsl_color.length - 1]['selected_color']['hex'] = color;
        color_manipulation_store.hsl_color[color_manipulation_store.hsl_color.length - 1].setHexadecimalValue(color);
        color_index.value = color_manipulation_store.hsl_color.length - 1;
    } else {
        color_manipulation_store.hsl_color[index]['selected_color']['hex'] = color;
        color_manipulation_store.hsl_color[index].setHexadecimalValue(color);
    }
}

</script>