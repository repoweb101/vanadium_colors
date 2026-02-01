/**
 * Represents a class to represent and manipulate a given color.
 * @class
 */
export default class ColorManipulation
 {
    /**
     * Properties of the instance instance.
     * @param {RegExp} hex_regex - The expression to detect a color in hexadecimal notation.
     * @param {RegExp} rgb_regex - The expression to detect a color in RGB notation.
     * @param {RegExp} hsl_regex - The expression to detect a color in HSL notation.
     * @param {Array} hex_to_RGB - Array containing the transformation from hexagonal to RGB with the key -> value of the form: 'hexadecimal': Decimal.
     * @param {Array} RGB_to_hex - Array containing the transformation from RGB to hexagonal with the key -> value of the form: Decimal: 'hexadecimal'.
     * @param {Array} selected_color - Array containing the current color in HEX, RGB and HSL format, including RGB max, RGB min, and HSL chroma.
     */

    hex_regex = /^#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})$/i;
    rgb_regex = /^rgba?\((\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\s*,){2}\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\s*(\s*,\s*(0|1|0?\.\d+)\s*)?\)$/i;
    hsl_regex = /hsl\(\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%\s*\)/i;
    hex_to_RGB = new Map();
    RGB_to_hex = new Map();
    selected_color = {
        hex: '',
        rgb_arr: [],
        rgb_str: '',
        rgb_min: 0,
        rgb_max: 0,
        rgb_luminance: 0,
        hsl_arr: [],
        hsl_str: '',
        hsl_chroma: 0,
    };

    /**
     * Creates a new Color Manipulation instance.
     * @constructor
     */
    constructor() {
        /**
         * initialize the values of hex_to_RGB and RGB_to_hex.
         * @public
         */
        this.hex_to_RGB.set('0', 0);
        this.hex_to_RGB.set('1', 1);
        this.hex_to_RGB.set('2', 2);
        this.hex_to_RGB.set('3', 3);
        this.hex_to_RGB.set('4', 4);
        this.hex_to_RGB.set('5', 5);
        this.hex_to_RGB.set('6', 6);
        this.hex_to_RGB.set('7', 7);
        this.hex_to_RGB.set('8', 8);
        this.hex_to_RGB.set('9', 9);
        this.hex_to_RGB.set('A', 10);
        this.hex_to_RGB.set('B', 11);
        this.hex_to_RGB.set('C', 12);
        this.hex_to_RGB.set('D', 13);
        this.hex_to_RGB.set('E', 14);
        this.hex_to_RGB.set('F', 15);

        this.RGB_to_hex.set(0, '0');
        this.RGB_to_hex.set(1, '1');
        this.RGB_to_hex.set(2, '2');
        this.RGB_to_hex.set(3, '3');
        this.RGB_to_hex.set(4, '4');
        this.RGB_to_hex.set(5, '5');
        this.RGB_to_hex.set(6, '6');
        this.RGB_to_hex.set(7, '7');
        this.RGB_to_hex.set(8, '8');
        this.RGB_to_hex.set(9, '9');
        this.RGB_to_hex.set(10, 'A');
        this.RGB_to_hex.set(11, 'B');
        this.RGB_to_hex.set(12, 'C');
        this.RGB_to_hex.set(13, 'D');
        this.RGB_to_hex.set(14, 'E');
        this.RGB_to_hex.set(15, 'F');
    }

    /**
     * ######################## BEGIN OF TRANSFORMATION OF COLOR FORMATS ########################################################################################################
     */

    /**
     * Transforms the selected color in hexadecimal form to RGB on selected_color.rgb_arr as an array and selected_color.rgb_str as a string of the form rgb( rrr, ggg, bbb).
     * @returns {ColorManipulation} Returns the current instance updated.
     */
    transformHexToRGB() {
        try {
            if (! this.hex_regex.test(this.selected_color.hex)) {
                throw new Error("Error 001");
            }

            let red = this.selected_color.hex.slice(1,3);
            let green = this.selected_color.hex.slice(3,5);
            let blue = this.selected_color.hex.length === 7 ? this.selected_color.hex.slice(5) : this.selected_color.hex.slice(5,7);
            this.selected_color.rgb_arr = [ parseInt(red,16), parseInt(green,16), parseInt(blue,16) ];
            this.selected_color.rgb_str = 'rgb( ' + this.selected_color.rgb_arr[0] + ' ' + this.selected_color.rgb_arr[1] + ' ' + this.selected_color.rgb_arr[2] + ')';
            return this;

        } catch (error) {
            if (error.message.includes("Error 001")) {
                console.log("Error 001:", 'The selected HEX color is not in hexadecimal notation.');
            }
        }
    }

    /**
     * Transforms the selected color in RGB with the form rgb( rrr, ggg, bbb) to an array form in selected_color.rgb_arr.
     * @returns {ColorManipulation} Returns the current instance updated.
     */
    transformRGBStrToRGBArray() {
        try {
            if (! this.rgb_regex.test(this.selected_color.rgb_str)) {
                throw new Error("Error 002");
            }

            let the_color = [];
            let input_arr = this.selected_color.rgb_str.match(/\d+/g);

            if (input_arr.length > 0) {
                the_color = input_arr.map(Number);
            }

            this.selected_color.rgb_arr = the_color;
            return this;

        } catch (error) {
            if (error.message.includes("Error 002")) {
                console.log("Error 002:", 'The selected RGB color string is not in the correct format.');
            }
        }
    }

    /**
     * Transforms the selected color in RGB array form to a string in hexadecimal notation in selected_color.hex.
     * @returns {ColorManipulation} Returns the current instance updated.
     */
    transformRGBArrayToHex() {
        try {
            if (! this.selected_color.rgb_arr instanceof Array || this.selected_color.rgb_arr.length === 0) {
                throw new Error("Error 003");
            }

            let rgb_color = this.selected_color.rgb_arr;
            let rr = rgb_color[0] >= 0 && rgb_color[0] < 16 ? '0' + rgb_color[0].toString(16) : rgb_color[0].toString(16);
            let gg = rgb_color[1] >= 0 && rgb_color[1] < 16 ? '0' + rgb_color[1].toString(16) : rgb_color[1].toString(16);
            let bb = rgb_color[2] >= 0 && rgb_color[2] < 16 ? '0' + rgb_color[2].toString(16) : rgb_color[2].toString(16);
            this.selected_color.hex = '#' + rr + gg + bb;
            return this;

        } catch (error) {
            if (error.message.includes("Error 003")) {
                console.log("Error 003:", 'The selected RGB color array is not in the correct format.');
            }
        }
    }

    /**
     * Transforms the selected color in RGB array form to an array of HSL color and a string in HSL notation of the form hsl( huedeg sat%, ligth%) in selected_color.hsl_arr and selected_color.hsl_str.
     * @returns {ColorManipulation} Returns the current instance updated.
     */
    transformRGBToHSL() {
        try {
            if (! this.selected_color.rgb_arr instanceof Array || this.selected_color.rgb_arr.length === 0) {
                throw new Error("Error 004");
            }

            let rr = this.selected_color.rgb_arr[0] / 255;
            let gg = this.selected_color.rgb_arr[1] / 255;
            let bb = this.selected_color.rgb_arr[2] / 255;

            /* CALCULATE THE HSL HUE OF THE SELECTED COLOR WITH VALUES FROM 0 TO 1 */
            let hue = 0;

            if (this.selected_color.hsl_chroma === 0) {
                hue = 0;
            } else if (this.selected_color.rgb_max === rr) {
                hue = ((gg - bb) / this.selected_color.hsl_chroma) % 6;
            } else if (this.selected_color.rgb_max === gg) {
                hue = ((bb - rr) / this.selected_color.hsl_chroma) + 2;
            } else if (this.selected_color.rgb_max === bb) {
                hue = ((rr - gg) / this.selected_color.hsl_chroma) + 4;
            }

            let result = 60 * hue;
            this.selected_color.hsl_arr[0] = result >= 0 ? result : 360 + result;

            /* CALCULATE THE HSL LIGHTNESS OF THE SELECTED COLOR WITH VALUES FROM 0 TO 1 */
            this.selected_color.hsl_arr[2] = (this.selected_color.rgb_max + this.selected_color.rgb_min) * 0.5;

            /* CALCULATE THE HSL SATURATION OF THE SELECTED COLOR WITH VALUES FROM 0 TO 1 */
            let saturation = 0;

            if (this.selected_color.hsl_arr[2] <= 50) {
                saturation = this.selected_color.hsl_chroma / ( 2 * this.selected_color.hsl_arr[2]);
            } else if (this.selected_color.hsl_arr[2] > 50) {
                saturation = this.selected_color.hsl_chroma / (2 - ( 2 * this.selected_color.hsl_arr[2]));
            }

            this.selected_color.hsl_arr[1] = this.selected_color.hsl_chroma === 0 ? 0 : this.selected_color.hsl_chroma / (1 - Math.abs((2 * this.selected_color.hsl_arr[2]) - 1));
            this.selected_color.hsl_str = 'hsl( ' + Math.round(this.selected_color.hsl_arr[0]) + ' ' + Math.round(this.selected_color.hsl_arr[1] * 100) + '% '
                + Math.round(this.selected_color.hsl_arr[2] * 100) + '%)';
            return this;

        } catch (error) {
            if (error.message.includes("Error 004")) {
                console.log("Error 004:", 'The selected RGB color array is not in the correct format.');
            }
        }
    }

    /**
     * Transforms the selected color in HSL form to a string form hsl( huedeg sat%, ligth%) to an array of HSL color in selected_color.hsl_arr.
     * @returns {ColorManipulation} Returns the current instance updated.
     */
    transformHSLStrToHSLArray() {
        try {
            if (! this.hsl_regex.test(this.selected_color.hsl_str)) {
                throw new Error("Error 005");
            }

            let the_color = [0, 0, 0];
            let input_arr = this.selected_color.hsl_str.match(/\d+/g);

            if (input_arr.length > 0) {
                the_color = input_arr.map(Number);
            }

            the_color[1] = the_color[1] / 100;
            the_color[2] = the_color[2] / 100;
            this.selected_color.hsl_arr = the_color;
            return this;

        } catch (error) {
            if (error.message.includes("Error 005")) {
                console.log("Error 005:", 'The selected HSL color is not in the correct format.');
            }
        }
    }

    /**
     * Transforms the selected color array of HSL to RGB on selected_color.rgb_arr as an array and selected_color.rgb_str as a string of the form rgb( rrr, ggg, bbb).
     * @returns {ColorManipulation} Returns the current instance updated.
     */
    transformHSLToRGB() {
        try {
            if (! this.selected_color.hsl_arr instanceof Array || this.selected_color.hsl_arr.length === 0) {
                throw new Error("Error 006");
            }

            let k_rr = (this.selected_color.hsl_arr[0] / 30) % 12;
            let k_gg = (8 + (this.selected_color.hsl_arr[0] / 30)) % 12;
            let k_bb = (4 + (this.selected_color.hsl_arr[0] / 30)) % 12;
            let a = this.selected_color.hsl_arr[1] * Math.min(this.selected_color.hsl_arr[2], 1 - this.selected_color.hsl_arr[2]);
            let f_rr = this.selected_color.hsl_arr[2] - (a * Math.max(-1, Math.min(k_rr - 3, 9 - k_rr, 1)));
            let f_gg = this.selected_color.hsl_arr[2] - (a * Math.max(-1, Math.min(k_gg - 3, 9 - k_gg, 1)));
            let f_bb = this.selected_color.hsl_arr[2] - (a * Math.max(-1, Math.min(k_bb - 3, 9 - k_bb, 1)));
            this.selected_color.rgb_arr =  [Math.round(f_rr * 255), Math.round(f_gg * 255), Math.round(f_bb *255)];
            this.selected_color.rgb_str = 'rgb( ' + this.selected_color.rgb_arr[0] + ' ' + this.selected_color.rgb_arr[1] + ' ' + this.selected_color.rgb_arr[2] + ')';
            return this;

        } catch (error) {
            if (error.message.includes("Error 006")) {
                console.log("Error 006:", 'The selected HSL color is not in the correct format.');
            }
        }
    }

    /**
     * ######################## END OF TRANSFORMATION OF COLOR FORMATS #########################################################################################################
     */

    /**
     * ######################## BEGIN OF CALCULATION OF COLOR PROPERTIES #######################################################################################################
     */

    /**
     * Calculates the maximun value of the RGB numbers and stores it in selected_color.rgb_max.
     * @returns {ColorManipulation} Returns the current instance updated.
     */
    calculateRGBMax() {
        try {
            if (! this.selected_color.rgb_arr instanceof Array || this.selected_color.rgb_arr.length === 0) {
                throw new Error("Error 007");
            }

            this.selected_color.rgb_max = Math.max(this.selected_color.rgb_arr[0] / 255, this.selected_color.rgb_arr[1] / 255, this.selected_color.rgb_arr[2] / 255);
            return this;

        } catch (error) {
            if (error.message.includes("Error 007")) {
                console.log("Error 007:", 'The selected RGB color is not in the correct format.');
            }
        }
    }

    /**
     * Calculates the minimun value of the RGB numbers and stores it in selected_color.rgb_min.
     * @returns {ColorManipulation} Returns the current instance updated.
     */
    calculateRGBMin() {
        try {
            if (! this.selected_color.rgb_arr instanceof Array || this.selected_color.rgb_arr.length === 0) {
                throw new Error("Error 008");
            }

            this.selected_color.rgb_min = Math.min(this.selected_color.rgb_arr[0] / 255, this.selected_color.rgb_arr[1] / 255, this.selected_color.rgb_arr[2] / 255);
            return this;

        } catch (error) {
            if (error.message.includes("Error 008")) {
                console.log("Error 008:", 'The selected RGB color is not in the correct format.');
            }
        }
    }

    /**
     * Calculates the HSL chroma variable and stores it in selected_color.hsl_chroma.
     * @returns {ColorManipulation} Returns the current instance updated.
     */
    calculateHSLChroma() {
        try {
            if (this.selected_color.rgb_max === null && this.selected_color.rgb_min === null) {
                throw new Error("Error 009");
            }

            this.selected_color.hsl_chroma = this.selected_color.rgb_max - this.selected_color.rgb_min;
            return this;

        } catch (error) {
            if (error.message.includes("Error 009")) {
                console.log("Error 009:", 'The selected RGB color is not in the correct format.');
            }
        }
    }

    /**
     * Calculates the RGB luminance and stores it in selected_color.rgb_luminance.
     * @returns {ColorManipulation} Returns the current instance updated.
     */
    calculateLuminanceRGB() {
        try {
            if (! this.selected_color.rgb_arr instanceof Array || this.selected_color.rgb_arr.length === 0) {
                throw new Error("Error 010");
            }

            let srgb_color = [this.selected_color.rgb_arr[0] / 255, this.selected_color.rgb_arr[1] / 255, this.selected_color.rgb_arr[2] / 255];
            let rgb_color = [];

            rgb_color[0] = srgb_color[0] <= 0.04045 ? srgb_color[0] / 12.92 : ((srgb_color[0] + 0.055) / 1.055) ** 2.4;
            rgb_color[1] = srgb_color[1] <= 0.04045 ? srgb_color[1] / 12.92 : ((srgb_color[1] + 0.055) / 1.055) ** 2.4;
            rgb_color[2] = srgb_color[2] <= 0.04045 ? srgb_color[2] / 12.92 : ((srgb_color[2] + 0.055) / 1.055) ** 2.4;

            this.selected_color.rgb_luminance =  (0.2126 * rgb_color[0]) + (0.7152 * rgb_color[1]) + (0.0722 * rgb_color[2]);
            return this;

        } catch (error) {
            if (error.message.includes("Error 010")) {
                console.log("Error 010:", 'The selected RGB color is not in the correct format.');
            }
        }
    }

    /**
     * Calculates the contrast ratio based on the RGB luminance of two values. The fisrt is the main color and the second is the color that wants to be compared.
     * @param {Number} comparison_color_luminosity - The comparison color.
     * @returns {ColorManipulation} Returns the current instance updated.
     */
    calculateRGBContrastRatio(comparison_color_luminosity) {
        try {
            if (this.selected_color.rgb_luminance === null && comparison_color_luminosity === null) {
                throw new Error("Error 011");
            }

            let result = (Math.max(this.selected_color.rgb_luminance, comparison_color_luminosity) + 0.05) / (Math.min(this.selected_color.rgb_luminance, comparison_color_luminosity) + 0.05)
            return parseFloat(result.toFixed(4));
        } catch (error) {
            if (error.message.includes("Error 011")) {
                console.log("Error 011:", 'The selected RGB color is not in the correct format.');
            }
        }
    }

    /**
     * ######################## END OF CALCULATION OF COLOR PROPERTIES ##########################################################################################################
     */

    /**
     * ######################## BEGIN OF SETTERS ################################################################################################################################
     */

    /**
     * Set the value of the selected color as a string in hexadecimal format.
     * @param {String} color - The selected color.
     * @returns {Void} Returns nothing.
     */
    setHexadecimalValue(color) {
        try {
            if (! this.hex_regex.test(color)) {
                throw new Error("Error 012");
            }

            this.selected_color.hex = color;
            this.transformHexToRGB().calculateRGBMax().calculateRGBMin().calculateHSLChroma().transformRGBToHSL().calculateLuminanceRGB();
        } catch (error) {
            if (error.message.includes("Error 012")) {
                console.log("Error 012:", 'The selected Hexadecimal color is not in the correct format.');
            }
        }
    }

    /**
     * Set the value of the selected color as a string in rgb format.
     * @param {String} color - The selected color.
     * @returns {Void} Returns nothing.
     */
    setRGBValue(color) {
        try {
            if (! this.rgb_regex.test(color)) {
                throw new Error("Error 013");
            }

            this.selected_color.rgb_str = color;
            this.transformRGBStrToRGBArray().transformRGBArrayToHex().calculateRGBMax().calculateRGBMin().calculateHSLChroma().transformRGBToHSL().calculateLuminanceRGB();
        } catch (error) {
            if (error.message.includes("Error 013")) {
                console.log("Error 013:", 'The selected RGB color is not in the correct format.');
            }
        }
    }

    /**
     * Set the value of the selected color as a string in hsl format.
     * @param {String} color - The selected color.
     * @returns {Void} Returns nothing.
     */
    setHSLValue(color) {
        try {
            if (! this.hsl_regex.test(color)) {
                throw new Error("Error 014");
            }

            this.selected_color.hsl_str = color;
            this.transformHSLStrToHSLArray().transformHSLToRGB().calculateRGBMax().calculateRGBMin().calculateHSLChroma().transformRGBArrayToHex().calculateLuminanceRGB();
        } catch (error) {
            if (error.message.includes("Error 014")) {
                console.log("Error 014:", 'The selected HSL color is not in the correct format.');
            }
        }
    }

    /**
     * ######################## END OF SETTERS ###################################################################################################################################
     */
}