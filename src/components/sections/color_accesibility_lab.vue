<template>

<section class="flex flex-col content-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 w-full p-4">

    <div class="p-2 mb-6">

        <h3 class="text-lg font-bold text-text-light mb-2">Accessibility Lab:</h3>

        <p class="text-text-dark text-sm"
            v-if="color_palette.length < 2"
        >
            First generate at least one color.
        </p>

        <p class="text-text-dark text-sm"
            v-else
        >
            Check readability between your primary color and secondary selections.
        </p>

    </div>

    <div class="flex flex-col content-center gap-2 md:gap-4 p-2 md:p-4"
        v-if="color_palette.length > 1"
    >

        <div class="p-2 min-w-[260px] w-full bg-[conic-gradient(from_90deg_at_25%_50%,theme(colors.background-light),theme(colors.background-dark),theme(colors.background-light))]
                    rounded-xl shadow-md shadow-background-dark inset-shadow-xs inset-shadow-shadow-light"
            v-for="(color, i) in props.color_palette.filter((element, index) => index !== 0)"
            v-bind:key="i"
        >

            <div class="flex justify-between items-center mb-6">

                <div class="flex items-center gap-3 p-2">

                    <div class="w-8 h-8 rounded-full shadow-md shadow-shadow-light ring-1 ring-background-dark"
                        v-bind:style="{ backgroundColor: props.color_palette[0].selected_color.hex }"
                    ></div>

                    <div class="w-8 h-8 rounded-full shadow-md shadow-shadow-light ring-1 ring-background-dark"
                        v-bind:style="{ backgroundColor: color.selected_color.hex }"
                    ></div>

                    <span class="text-sm font-semibold text-text-dark">Pair {{ i + 1 }}</span>

                </div>

            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                <div class="space-y-4">

                    <div class="p-2 rounded-lg flex flex-col items-center justify-center text-center transition-colors"
                        v-bind:style="{ background: props.color_palette[0].selected_color.hex, color: color.selected_color.hex }"
                    >

                        <span class="text-2xl font-bold mb-1">Large Text</span>
                        <span>Normal Text</span>
                        <span class="text-[10px] opacity-80 mt-2 font-mono">{{ props.color_palette[0].selected_color.hex.toUpperCase() }} BG</span>

                    </div>

                    <div class="p-2 rounded-lg flex flex-col items-center justify-center text-center transition-colors"
                        v-bind:style="{ backgroundColor: color.selected_color.hex, color: props.color_palette[0].selected_color.hex }"
                    >

                        <span class="text-2xl font-bold mb-1">Large Text</span>
                        <span>Normal Text</span>
                        <span class="text-[10px] opacity-80 mt-2 font-mono">{{ color.selected_color.hex.toUpperCase() }} BG</span>

                    </div>

                </div>

                <div class="bg-background-dark p-2 rounded-lg inset-shadow-sm inset-shadow-shadow-dark h-full">

                    <div class="flex justify-between items-center mb-4">

                        <h3 class="text-sm font-bold text-text-dark">WCAG 2.1 Compliance</h3>

                        <span :class="['text-base font-bold font-mono px-3 py-1 rounded-lg',
                            props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 4.5 ? 'bg-emerald-100 text-emerald-800' :
                            'bg-rose-100 text-rose-800']"
                        >
                            {{ props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) }}:1
                        </span>

                    </div>

                    <div class="grid grid-cols-2 gap-3">

                        <div>

                            <h4 class="text-xs font-semibold text-text-light/80 uppercase tracking-wider mb-2 text-center">Normal Text</h4>

                            <div class="space-y-2">

                                <div :class="['flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
                                    props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 4.5 ? 'bg-emerald-50 text-emerald-900' :
                                    'bg-rose-50 text-rose-900']"
                                >

                                    <span class="text-xs font-bold tracking-wider">AA</span>

                                    <div class="flex items-center gap-1.5">

                                        <span class="text-xs font-semibold">
                                            {{ props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 4.5 ? 'Pass' : 'Fail' }}
                                        </span>

                                        <span :class="['font-bold',
                                            props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 4.5 ? 'text-emerald-500' : 'text-rose-500']"
                                        >
                                            {{ props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 4.5 ? '✓' : '✗' }}
                                        </span>

                                    </div>

                                </div>

                                <div :class="['flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
                                    props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 7 ? 'bg-emerald-50 text-emerald-900' :
                                    'bg-rose-50 text-rose-900']"
                                >

                                    <span class="text-xs font-bold tracking-wider">AAA</span>

                                    <div class="flex items-center gap-1.5">

                                        <span class="text-xs font-semibold">
                                            {{ props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 7 ? 'Pass' : 'Fail' }}
                                        </span>

                                        <span :class="['font-bold', props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 7 ? 'text-emerald-500' :
                                            'text-rose-500']"
                                        >
                                            {{ props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 7 ? '✓' : '✗' }}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div>

                            <h4 class="text-xs font-semibold text-text-light/80 uppercase tracking-wider mb-2 text-center">Large Text</h4>

                            <div class="space-y-2">

                                <div :class="['flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
                                    props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 3 ? 'bg-emerald-50 text-emerald-900' :
                                    'bg-rose-50 text-rose-900']"
                                >

                                    <span class="text-xs font-bold tracking-wider">AA</span>

                                    <div class="flex items-center gap-1.5">

                                        <span class="text-xs font-semibold">
                                            {{ props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 3 ? 'Pass' : 'Fail' }}
                                        </span>

                                        <span :class="['font-bold', props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) > 3 ? 'text-emerald-500' :
                                            'text-rose-500']"
                                        >
                                            {{ props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 3 ? '✓' : '✗' }}
                                        </span>

                                    </div>

                                </div>

                                <div :class="['flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
                                    props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 4.5 ? 'bg-emerald-50 text-emerald-900' :
                                    'bg-rose-50 text-rose-900']"
                                >

                                    <span class="text-xs font-bold tracking-wider">AAA</span>

                                    <div class="flex items-center gap-1.5">

                                        <span class="text-xs font-semibold">
                                            {{ props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 4.5 ? 'Pass' : 'Fail' }}
                                        </span>

                                        <span :class="['font-bold', props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 4.5 ? 'text-emerald-500' :
                                            'text-rose-500']"
                                        >
                                            {{ props.color_palette[0].calculateRGBContrastRatio(color.selected_color.rgb_luminance) >= 4.5 ? '✓' : '✗' }}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</section>

</template>

<script setup>
const props = defineProps({
    color_palette: Array,
});
</script>