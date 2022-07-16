/**
 * this blueprint will define
 * all document manipulation functions
 * that will be used in application
 */
export default class Doms {
    static getElem(id) { return document.getElementById(id); }
    static createOptions(textContent, value) {
        let optionElement = document.createElement("OPTION");
        optionElement.textContent = textContent;
        optionElement.value = value;
        return optionElement;
    }
    static removeAllOptions(form) {
        while (form.options.length > 0)
            form.remove(0);
    }
    static setTextContent(elementId, text) {
        this.getElem(elementId).textContent = text;
    }

    static setDisabledAttr(v, element) {
        if (v > -1)
            if (element.hasAttribute("disabled"))
                element.removeAttribute("disabled", "false");
        if (v == -1)
            element.setAttribute("disabled", "");
    }
    static onEvent(element, type, action, eventFlow = false) {
        element.addEventListener(type, action, eventFlow);
    }
}
