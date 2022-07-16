import Doms from "./doms.js";
import { randomNumber } from "./utility.js";
class App {
    types = [];
    typeSelected = "";
    vehicleSelected = "";

    /**
     *  Init method used to init
     *  all records add fill data to forms
     */
    Init() {
        let selectVehicleTypeForm = Doms.getElem("selectVehicleType");
        let count = 0;
        fetch('./records.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(arr => {
                    this.types.push(arr)

                    if (selectVehicleTypeForm != null || selectVehicleTypeForm != undefined) {
                        let optionElement = Doms.createOptions(arr.type, count);
                        count = count + 1;
                        selectVehicleTypeForm.add(optionElement);
                    }
                });

                Doms.onEvent(selectVehicleTypeForm, 'change', () => {
                    let v = selectVehicleTypeForm.value;
                    this.typeSelected = v;
                    let selectBtnElem = Doms.getElem("typeBtn");
                    Doms.setDisabledAttr(v, selectBtnElem);
                    Doms.getElem('generation').classList.add('d-none')
                });

                Doms.getElem('Plate').classList.add('d-none');
            }).catch(e => {
                alert("please, run this app on localhost or local server, هذا الموقع يحتاج الى سيرفر")
            });
    }

    /**
     * this method used to select
     * which vehicle types and its information
     */
    SelectVehicleType() {
        let formEleType = Doms.getElem("selectVehicle");
        let optionElement = null
        if (formEleType != null || formEleType != undefined) {

            Doms.removeAllOptions(formEleType);
            optionElement = Doms.createOptions("---", -1);
            formEleType.add(optionElement)

            for (const iterator of this.types[this.typeSelected].vehicles) {
                optionElement = Doms.createOptions(iterator.type, iterator.code);
                formEleType.add(optionElement);
            }

            Doms.onEvent(formEleType, 'change', (e) => {
                let v = formEleType.value;
                this.vehicleSelected = v;
                let selectBtnElem = Doms.getElem("serialBtn");
                Doms.setDisabledAttr(v, selectBtnElem);

                Doms.getElem("Plate").classList.add("d-none");
            });
        }
        Doms.getElem('generation').classList.remove('d-none');
        Doms.getElem('Plate').classList.add('d-none');
    }

    /**
     * this method will used
     * to generate new serial number
     * and create plate information
     */
    Generate() {
        let objs = this.types[this.typeSelected];
        let plate = objs.vehicles.find(a => a.code == this.vehicleSelected);
        let code = plate.code;

        if (plate.startCodeRange && plate.endCodeRange) {
            code = randomNumber(plate.startCodeRange, plate.endCodeRange);
        }

        let randNum = randomNumber(1, 99999);

        if (Doms.getElem("Plate").classList.contains("d-none"))
            Doms.getElem("Plate").classList.replace("d-none", "d-block");

        Doms.setTextContent('extraText', plate.extraText);
        Doms.setTextContent('plateCode', code);
        Doms.setTextContent('serial', randNum.toString());
        Doms.getElem("bgColorForType").className = "col border text-center p-0 " + (" bg-" + objs.bgColor) + (" text-" + objs.frontColor)
        this.Show(objs, plate, code, randNum);
    }

    Show(objs, plate, code, randNum) {
        Doms.setTextContent('tdType', objs.type);
        Doms.setTextContent('tdVehicle', plate.type);
        Doms.setTextContent('tdExtraText', (plate.extraText) ? plate.extraText : '---');
        Doms.setTextContent('tdCode', code);
        Doms.setTextContent('tdFormat', code + " - " + randNum);
    }

    Print = () => alert("تتم الطباعة");
}
// this for server
document.getElementsByClassName("disclaimer")[0].remove();

export const app = new App();
app.Init();

typeBtn.onclick = () => app.SelectVehicleType();
serialBtn.onclick = () => app.Generate();
modelPrint.onclick = () => app.Print();
