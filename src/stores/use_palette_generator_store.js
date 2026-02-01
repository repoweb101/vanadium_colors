import { ref } from "vue";
import { defineStore } from "pinia";
import color_manipulation from "../utilities/color_manipulation";

/**
 * Store used to manipulate the colors in the page.
 * @param {Array} color_palette - Array containing the different palette colors.
 * @returns {void} Returns the usePaletteGeneratorStore object.
 */
export const usePaletteGeneratorStore = defineStore('palette_generator_store', () => {
    const color_palette = ref([]);

    /**
     * Method used to create the monochromatic palette.
     * @param {Array} hsl_color - Array that contains the components of the color in HSL notation [0: hue, 1: saturation, 2: lightness].
     * @returns {void} Returns nothing.
     */
    function generate_monochromatic(hsl_color) {
        resetPalette();
        let color_base = [];
        let color_1 = [];
        let color_2 = [];
        let color_3 =[];
        let color_4 = [];

        if (hsl_color[2] <= 0.4) {
            color_base.push(hsl_color[0], hsl_color[1], hsl_color[2]);
            color_1.push(hsl_color[0], hsl_color[1], hsl_color[2] + 0.1);
            color_2.push(hsl_color[0], hsl_color[1], hsl_color[2] + 0.2);
            color_3.push(hsl_color[0], hsl_color[1], hsl_color[2] + 0.3);
            color_4.push(hsl_color[0], hsl_color[1], hsl_color[2] + 0.4);
        } else if (hsl_color[2] >= 0.6) {
            color_base.push(hsl_color[0], hsl_color[1], hsl_color[2]);
            color_1.push(hsl_color[0], hsl_color[1], hsl_color[2] - 0.1);
            color_2.push(hsl_color[0], hsl_color[1], hsl_color[2] - 0.2);
            color_3.push(hsl_color[0], hsl_color[1], hsl_color[2] - 0.3);
            color_4.push(hsl_color[0], hsl_color[1], hsl_color[2] - 0.4);
        } else {
            color_base.push(hsl_color[0], hsl_color[1], hsl_color[2]);
            color_1.push(hsl_color[0], hsl_color[1], hsl_color[2] - 0.2);
            color_2.push(hsl_color[0], hsl_color[1], hsl_color[2] - 0.1);
            color_3.push(hsl_color[0], hsl_color[1], hsl_color[2] + 0.1);
            color_4.push(hsl_color[0], hsl_color[1], hsl_color[2] + 0.2);
        }

        for (let index = 0; index < 5; index++) {
            color_palette.value.push(new color_manipulation());
        }

        color_palette.value[0].setHSLValue(transformHSLToString(color_base));
        color_palette.value[1].setHSLValue(transformHSLToString(color_1));
        color_palette.value[2].setHSLValue(transformHSLToString(color_2));
        color_palette.value[3].setHSLValue(transformHSLToString(color_3));
        color_palette.value[4].setHSLValue(transformHSLToString(color_4));
    }

    /**
     * Method used to create the analogous palette.
     * @param {Array} hsl_color - Array that contains the components of the color in HSL notation [0: hue, 1: saturation, 2: lightness].
     * @returns {void} Returns nothing.
     */
    function generate_analogous(hsl_color) {
        resetPalette();
        let color_base = hsl_color;
        let color_p30 = [hsl_color[0] + 30, hsl_color[1], hsl_color[2]];
        let color_m30 = [hsl_color[0] - 30, hsl_color[1], hsl_color[2]];
        let color_p60 = [hsl_color[0] + 60, hsl_color[1], hsl_color[2]];
        let color_m60 = [hsl_color[0] - 60, hsl_color[1], hsl_color[2]];

        if (color_p30[0] > 360) {
            color_p30[0] = color_p30[0] - 360;
        }

        if (color_p60[0] > 360) {
            color_p60[0] = color_p60[0] - 360;
        }

        if (color_m30[0] < 0) {
            color_m30[0] = color_m30[0] + 360;
        }

        if (color_m60[0] < 0) {
            color_m60[0] = color_m60[0] + 360;
        }

        for (let index = 0; index < 5; index++) {
            color_palette.value.push(new color_manipulation());
        }

        color_palette.value[0].setHSLValue(transformHSLToString(color_base));
        color_palette.value[1].setHSLValue(transformHSLToString(color_p30));
        color_palette.value[2].setHSLValue(transformHSLToString(color_m30));
        color_palette.value[3].setHSLValue(transformHSLToString(color_p60));
        color_palette.value[4].setHSLValue(transformHSLToString(color_m60));
    }

    /**
     * Method used to create the complementary palette.
     * @param {Array} hsl_color - Array that contains the components of the color in HSL notation [0: hue, 1: saturation, 2: lightness].
     * @returns {void} Returns nothing.
     */
    function generate_complementary(hsl_color) {
        resetPalette();
        let color_base = hsl_color;
        let color_p180 = [hsl_color[0] + 180, hsl_color[1], hsl_color[2]];
        let color_p150 = [hsl_color[0] + 150, hsl_color[1], hsl_color[2]];
        let color_p210 = [hsl_color[0] + 210, hsl_color[1], hsl_color[2]];
        let color_p180light = [hsl_color[0] + 180, hsl_color[1] + 0.3, hsl_color[2] + 0.3];

        if (color_p180[0] > 360) {
            color_p180[0] = color_p180[0] - 360;
        }

        if (color_p150[0] > 360) {
            color_p150[0] = color_p150[0] - 360;
        }

        if (color_p210[0] > 360) {
            color_p210[0] = color_p210[0] - 360;
        }

        if (color_p180light[0] > 360) {
            color_p180light[0] = color_p180light[0] - 360;
        }

        if (color_p180light[1] > 1) {
            color_p180light[1] = hsl_color[1] - 0.3;
        }

        if (color_p180light[2] > 1) {
            color_p180light[2] = hsl_color[2] - 0.3;
        }

        for (let index = 0; index < 5; index++) {
            color_palette.value.push(new color_manipulation());
        }

        color_palette.value[0].setHSLValue(transformHSLToString(color_base));
        color_palette.value[1].setHSLValue(transformHSLToString(color_p180));
        color_palette.value[2].setHSLValue(transformHSLToString(color_p150));
        color_palette.value[3].setHSLValue(transformHSLToString(color_p210));
        color_palette.value[4].setHSLValue(transformHSLToString(color_p180light));
    }

    /**
     * Method used to create the triadic palette.
     * @param {Array} hsl_color - Array that contains the components of the color in HSL notation [0: hue, 1: saturation, 2: lightness].
     * @returns {void} Returns nothing.
     */
    function generate_triadic(hsl_color) {
        resetPalette();
        let color_base = hsl_color;
        let color_p120 = [hsl_color[0] + 120, hsl_color[1], hsl_color[2]];
        let color_p240 = [hsl_color[0] + 240, hsl_color[1], hsl_color[2]];
        let color_l40 = [hsl_color[0], hsl_color[1], hsl_color[2] + 0.2];
        let color_p120l40 = [color_p120[0], hsl_color[1], hsl_color[2] + 0.2];

        if (color_p120[0] > 360) {
            color_p120[0] = color_p120[0] - 360;
        }

        if (color_p240[0] > 360) {
            color_p240[0] = color_p240[0] - 360;
        }

        if (color_l40[2] > 1) {
            color_l40[2] = hsl_color[2] - 0.2;
        }

        if (color_p120l40[2] > 1) {
            color_p120l40[2] = hsl_color[2] - 0.2;
        }

        for (let index = 0; index < 5; index++) {
            color_palette.value.push(new color_manipulation());
        }

        color_palette.value[0].setHSLValue(transformHSLToString(color_base));
        color_palette.value[1].setHSLValue(transformHSLToString(color_p120));
        color_palette.value[2].setHSLValue(transformHSLToString(color_p240));
        color_palette.value[3].setHSLValue(transformHSLToString(color_l40));
        color_palette.value[4].setHSLValue(transformHSLToString(color_p120l40));
    }

    /**
     * Method used to create the tetradic palette.
     * @param {Array} hsl_color - Array that contains the components of the color in HSL notation [0: hue, 1: saturation, 2: lightness].
     * @returns {void} Returns nothing.
     */
    function generate_tetradic(hsl_color) {
        resetPalette();
        let color_base = hsl_color;
        let color_p60 = [hsl_color[0] + 60, hsl_color[1], hsl_color[2]];
        let color_p180 = [hsl_color[0] + 180, hsl_color[1], hsl_color[2]];
        let color_p240 = [hsl_color[0] + 240, hsl_color[1], hsl_color[2]];
        let color_base_light = [hsl_color[0], hsl_color[1], hsl_color[2] + 0.2];

        if (color_p60[0] > 360) {
            color_p60[0] = color_p60[0] - 360;
        }

        if (color_p180[0] > 360) {
            color_p180[0] = color_p180[0] - 360;
        }

        if (color_p240[0] > 360) {
            color_p240[0] = color_p240[0] - 360;
        }

        if (color_base_light[2] > 1) {
            color_base_light[2] = hsl_color[2] - 0.2;
        }

        for (let index = 0; index < 5; index++) {
            color_palette.value.push(new color_manipulation());
        }

        color_palette.value[0].setHSLValue(transformHSLToString(color_base));
        color_palette.value[1].setHSLValue(transformHSLToString(color_p60));
        color_palette.value[2].setHSLValue(transformHSLToString(color_p180));
        color_palette.value[3].setHSLValue(transformHSLToString(color_p240));
        color_palette.value[4].setHSLValue(transformHSLToString(color_base_light));
    }

    /**
     * Method used to create the square palette.
     * @param {Array} hsl_color - Array that contains the components of the color in HSL notation [0: hue, 1: saturation, 2: lightness].
     * @returns {void} Returns nothing.
     */
    function generate_square(hsl_color) {
        resetPalette();
        let color_base = hsl_color;
        let color_p90 = [hsl_color[0] + 90, hsl_color[1], hsl_color[2]];
        let color_p180 = [hsl_color[0] + 180, hsl_color[1], hsl_color[2]];
        let color_p270 = [hsl_color[0] + 270, hsl_color[1], hsl_color[2]];
        let color_base_light = [hsl_color[0], hsl_color[1], hsl_color[2] + 0.2];

        if (color_p90[0] > 360) {
            color_p90[0] = color_p90[0] - 360;
        }

        if (color_p180[0] > 360) {
            color_p180[0] = color_p180[0] - 360;
        }

        if (color_p270[0] > 360) {
            color_p270[0] = color_p270[0] - 360;
        }

        if (color_base_light[2] > 1) {
            color_base_light[2] = hsl_color[2] - 0.2;
        }

        for (let index = 0; index < 5; index++) {
            color_palette.value.push(new color_manipulation());
        }

        color_palette.value[0].setHSLValue(transformHSLToString(color_base));
        color_palette.value[1].setHSLValue(transformHSLToString(color_p90));
        color_palette.value[2].setHSLValue(transformHSLToString(color_p180));
        color_palette.value[3].setHSLValue(transformHSLToString(color_p270));
        color_palette.value[4].setHSLValue(transformHSLToString(color_base_light));
    }

    /**
     * Method used to create the accent-analogous palette.
     * @param {Array} hsl_color - Array that contains the components of the color in HSL notation [0: hue, 1: saturation, 2: lightness].
     * @returns {void} Returns nothing.
     */
    function generate_accent(hsl_color) {
        resetPalette();
        let color_base = hsl_color;
        let color_p30 = [hsl_color[0] + 30, hsl_color[1], hsl_color[2]];
        let color_m30 = [hsl_color[0] - 30, hsl_color[1], hsl_color[2]];
        let color_p180 = [hsl_color[0] + 180, hsl_color[1], hsl_color[2]];
        let color_p180_sat = [hsl_color[0] + 180, hsl_color[1], hsl_color[2] + 0.2];

        if (color_p30[0] > 360) {
            color_p30[0] = color_p30[0] - 360;
        }

        if (color_m30[0] < 0) {
            color_m30[0] = color_m30[0] + 360;
        }

        if (color_p180[0] > 360) {
            color_p180[0] = color_p180[0] - 360;
        }

        if (color_p180_sat[0] > 360) {
            color_p180_sat[0] = color_p180_sat[0] - 360;
        }

        if (color_p180_sat[2] > 1) {
            color_p180_sat[2] = hsl_color[2] - 0.2;
        }

        for (let index = 0; index < 5; index++) {
            color_palette.value.push(new color_manipulation());
        }

        color_palette.value[0].setHSLValue(transformHSLToString(color_base));
        color_palette.value[1].setHSLValue(transformHSLToString(color_p30));
        color_palette.value[2].setHSLValue(transformHSLToString(color_m30));
        color_palette.value[3].setHSLValue(transformHSLToString(color_p180));
        color_palette.value[4].setHSLValue(transformHSLToString(color_p180_sat));
    }

    /**
     * Method used to create the saturated monochromatic palette.
     * @param {Array} hsl_color - Array that contains the components of the color in HSL notation [0: hue, 1: saturation, 2: lightness].
     * @returns {void} Returns nothing.
     */
    function generate_saturated_monochromatic(hsl_color) {
        resetPalette();
        let color_base = [];
        let color_1 = [];
        let color_2 = [];
        let color_3 =[];
        let color_4 = [];

        if (hsl_color[2] <= 0.4) {
            color_base.push(hsl_color[0], hsl_color[1], hsl_color[2]);
            color_1.push(hsl_color[0], hsl_color[1], hsl_color[2] + 0.15);
            color_2.push(hsl_color[0], hsl_color[1], hsl_color[2] + 0.30);
        } else if (hsl_color[2] >= 0.6) {
            color_base.push(hsl_color[0], hsl_color[1], hsl_color[2]);
            color_1.push(hsl_color[0], hsl_color[1], hsl_color[2] - 0.15);
            color_2.push(hsl_color[0], hsl_color[1], hsl_color[2] - 0.30);
        } else {
            color_base.push(hsl_color[0], hsl_color[1], hsl_color[2]);
            color_1.push(hsl_color[0], hsl_color[1], hsl_color[2] - 0.15);
            color_2.push(hsl_color[0], hsl_color[1], hsl_color[2] + 0.15);
        }

        if (hsl_color[1] < 0.4) {
            color_3.push(hsl_color[0], hsl_color[1] + 0.15, hsl_color[2]);
            color_4.push(hsl_color[0], hsl_color[1] + 0.38, hsl_color[2]);
        } else if (hsl_color[1] > 0.6) {
            color_3.push(hsl_color[0], hsl_color[1] - 0.15, hsl_color[2]);
            color_4.push(hsl_color[0], hsl_color[1] - 0.38, hsl_color[2]);
        } else {
            color_3.push(hsl_color[0], hsl_color[1] - 0.25, hsl_color[2]);
            color_4.push(hsl_color[0], hsl_color[1] + 0.25, hsl_color[2]);
        }

        for (let index = 0; index < 5; index++) {
            color_palette.value.push(new color_manipulation());
        }

        color_palette.value[0].setHSLValue(transformHSLToString(color_base));
        color_palette.value[1].setHSLValue(transformHSLToString(color_1));
        color_palette.value[2].setHSLValue(transformHSLToString(color_2));
        color_palette.value[3].setHSLValue(transformHSLToString(color_3));
        color_palette.value[4].setHSLValue(transformHSLToString(color_4));
    }

    /**
     * Method used to generate all the different palettes.
     * @param {Array} hsl_color - Array that contains the components of the color in HSL notation [0: hue, 1: saturation, 2: lightness].
     * @returns {void} Returns nothing.
     */
    function generateAllPalettes(hsl_color) {
        generate_monochromatic(hsl_color);
        generate_analogous(hsl_color);
        generate_complementary(hsl_color);
        generate_triadic(hsl_color);
        generate_tetradic(hsl_color);
        generate_square(hsl_color);
        generate_accent(hsl_color);
        generate_saturated_monochromatic(hsl_color);
    }

    /**
     * Method used to transform the array of hue color to a string notation.
     * @param {Array} color_array - The value of the color's lightness.
     * @returns {String} Returns a string with the format hsl( huedeg sat%, ligth%).
     */
    function transformHSLToString(color_array) {
        return 'hsl( ' + Math.round(color_array[0]) + ' ' + Math.round(color_array[1] * 100) + '% ' + Math.round(color_array[2] * 100) + '%)';
    }

    /**
     * Method used to reset the palette.
     * @returns {Void} Returns nothing.
     */
    function resetPalette() {
        color_palette.value = [];
    }

    return {
        color_palette,
        generate_monochromatic,
        generate_analogous,
        generate_complementary,
        generate_triadic,
        generate_tetradic,
        generate_square,
        generate_accent,
        generate_saturated_monochromatic,
        generateAllPalettes,
        resetPalette,
    };
});