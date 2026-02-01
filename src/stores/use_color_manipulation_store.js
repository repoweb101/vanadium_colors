import { ref } from "vue";
import { defineStore } from "pinia";
import ColorManipulation from "../utilities/color_manipulation";

/**
 * Store used to manipulate the colors in the page.
 * @param {Array} hsl_color - Array with The values of the colors in HSL obtained from the range inputs.
 * @param {Array} open_dropdown - Array of booleans of the list of colors.
 * @returns {void} Returns the useColorManipulationStore object.
 */
export const useColorManipulationStore = defineStore('color_manipulation_store', () => {
    const hsl_color = ref([]);
    const selected_color_index = ref(0);
    const open_dropdown = ref([]);
    
    /**
     * Method used to add new color element to the list of colors.
     * @returns {void} Returns nothing.
     */
    function addNewColor() {
        try {
            if (hsl_color.value.length > 4) {
                throw new Error("Error 015");
            }
    
            let n1 = Math.floor(Math.random() * 256);
            let n2 = Math.floor(Math.random() * 256);
            let n3 = Math.floor(Math.random() * 256);
            let rr = n1 >= 0 && n1 < 16 ? '0' + n1.toString(16) : n1.toString(16);
            let gg = n2 >= 0 && n2 < 16 ? '0' + n2.toString(16) : n2.toString(16);
            let bb = n3 >= 0 && n3 < 16 ? '0' + n3.toString(16) : n3.toString(16);
    
            hsl_color.value.push(new ColorManipulation());
            hsl_color.value[hsl_color.value.length - 1].setHexadecimalValue('#' + rr + gg + bb);
            hsl_color.value[hsl_color.value.length - 1].index = hsl_color.value.length - 1;
            open_dropdown.value.push(false);
        } catch (error) {
            if (error.message.includes("Error 015")) {
                console.log("Error 015:", 'Maximun number of colors reached.');
            }
        }
    }

    /**
     * Method used to delete a color element to the list of colors.
     * @returns {void} Returns nothing.
     */
    function deleteColor(index) {
        try {
            if (hsl_color.value.length < 2) {
                throw new Error("Error 016");
            }

            hsl_color.value.splice(index, 1);
            open_dropdown.value.splice(index, 1);
        } catch (error) {
            if (error.message.includes("Error 016")) {
                console.log("Error 016:", 'You can not remove more colors.');
            }
        }
    }

    /**
     * Method used to select the secondary color to show.
     * @returns {void} Returns nothing.
     */
    function setSelectedColor(index) {
        try {
            if (index <= 0 ||  index >= hsl_color.value.length) {
                throw new Error("Error 017");
            }

            selected_color_index.value = index;
        } catch (error) {
            if (error.message.includes("Error 017")) {
                console.log("Error 017:", 'Index not valid.');
            }
        }
    }

    /**
     * Method used to select the secondary color to show.
     * @returns {void} Returns nothing.
     */
    function invertColors() {
        let main_color = hsl_color.value[0];
        let selected_color = hsl_color.value[selected_color_index.value];
        hsl_color.value[0] = selected_color;
        hsl_color.value[selected_color_index.value] = main_color;
    }

    /**
     * Method used to open color dropdown form with color properties.
     * @returns {void} Returns nothing.
     */
    function openColorDropdown(index) {
        try {
            if (open_dropdown.value[index] !== false && open_dropdown.value[index] !== true) {
                throw new Error("Error 018");
            }

            for (let i = 0; i < open_dropdown.value.length; i++) {
                if (i === index) {
                    if (open_dropdown.value[i] === false) {
                        open_dropdown.value[i] = true;
                    } else if (open_dropdown.value[i] === true) {
                        open_dropdown.value[i] = false;
                    } else {
                        open_dropdown.value[i] = false;
                    }
                } else {
                    open_dropdown.value[i] = false;
                }
            }
        } catch (error) {
            if (error.message.includes("Error 018")) {
                console.log("Error 018:", 'No index set.');
            }
        }
    }
    
    /**
     * Method used to change the value of the hsl parameters of the color element.
     * @returns {void} Returns nothing.
     */
    function getHslColor(element, input_index, value) {
        try {
            if (! element instanceof color_manipulation || hsl_color.value.indexOf(element) === -1 || input_index < 0 || input_index > 2) {
                throw new Error("Error 019");
            }
    
            let index = hsl_color.value.indexOf(element);
            hsl_color.value[index].selected_color.hsl_arr[input_index] = value;
    
            if (hsl_color.value[index].selected_color.hsl_arr[1] === 0) {
                hsl_color.value[index].selected_color.hsl_arr[0] = 0;
            }
    
            if (hsl_color.value[index].selected_color.hsl_arr[2] === 0) {
                hsl_color.value[index].selected_color.hsl_arr[0] = 0;
                hsl_color.value[index].selected_color.hsl_arr[1] = 0;
            }
    
            if (hsl_color.value[index].selected_color.hsl_arr[2] === 1) {
                hsl_color.value[index].selected_color.hsl_arr[0] = 0;
                hsl_color.value[index].selected_color.hsl_arr[1] = 1;
            }
    
            hsl_color.value[index].setHSLValue(transformHSLToString(hsl_color.value[index].selected_color.hsl_arr));
    
        } catch (error) {
            if (error.message.includes("Error 019")) {
                console.log("Error 019:", 'The selected HSL color is not in the correct format.');
            }
        }
    }

    /**
     * Method used to transform the array of hue color to a string notation.
     * @param {Array} color_array - The value of the color's lightness.
     * @returns {String} Returns a string with the format hsl( huedeg sat%, ligth%).
     */
    function transformHSLToString(color_array) {
        return 'hsl( ' + Math.round(color_array[0]) + ' ' + Math.round(color_array[1] * 100) + '% ' + Math.round(color_array[2] * 100) + '%)';
    }

    return {
        hsl_color,
        selected_color_index,
        open_dropdown,
        addNewColor,
        deleteColor,
        setSelectedColor,
        invertColors,
        openColorDropdown,
        getHslColor,
        transformHSLToString,
    };
});