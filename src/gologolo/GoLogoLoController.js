import AppsterController from '../appster/AppsterController.js'
import GoLogoLoLogo from './GoLogoLoLogo.js';
import { GoLogoLoGUIId } from './GoLogoLoConstants.js';
import { AppsterHTML } from '../appster/AppsterConstants.js';

export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }


    processEditText() {
        this.model.updateText();
    }

    createNewWork(workName) {
        console.log(workName);
    }
    processCreateNewWork = () => {
        var text = this.createNewWork();
        console.log(text);
    } 

    nameChecker= () => {
        console.log("nameChecker");
        var logoName =this.nameCheck();
        if(logoName != (null || undefined)) {
            var newLogo = new GoLogoLoLogo(logoName);
            this.model.prependWork(newLogo);
            this.model.editWork(newLogo.name);
            this.cancelButton();
            console.log(this);

        }
    }

    //edit text button
    editTextLogo = () => {
        this.model.view.editTextAppster();
    }

    sizeSliderFunc = () => {
        console.log("beans");
        var goLogoLoText = document.getElementById("gologolo_text");
        goLogoLoText.style.fontSize = document.getElementById("gologolo_font_size_slider").value + "px";
        this.model.currentWork.setFontSize(parseInt(document.getElementById("gologolo_font_size_slider").value));
        console.log(document.getElementById("gologolo_font_size_slider").value);
    }

}