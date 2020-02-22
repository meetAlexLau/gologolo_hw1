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
        var goLogoLoText = document.getElementById("gologolo_text");
        var newSize = document.getElementById("gologolo_font_size_slider").value;
        goLogoLoText.style.fontSize = newSize + "px";
        this.model.currentWork.setFontSize(parseInt(newSize));
        console.log(document.getElementById("gologolo_font_size_slider").value);
    }


    textColorChange = () => {
        var goLogoLoText = document.getElementById("gologolo_text");
        var newColor = document.getElementById("gologolo_text_color_picker").value;
        goLogoLoText.style.color = newColor;
        this.model.currentWork.setTextColor(newColor);
        console.log(newColor);
    }

    backgroundColorChange = () => {
        var goLogoLoText = document.getElementById("gologolo_text");
        var newColor = document.getElementById("gologolo_background_color_picker").value;
        goLogoLoText.style.backgroundColor = newColor;
        this.model.currentWork.setBackgroundColor(newColor); 
    }

    borderColorChange = () => {
        var goLogoLoText = document.getElementById("gologolo_text");
        var newColor = document.getElementById("gologolo_border_color_picker").value;
        goLogoLoText.style.borderColor = newColor;
        this.model.currentWork.setBorderColor(newColor);
    }

    borderRadiusSlider = () => {
        var goLogoLoText = document.getElementById("gologolo_text");
        var newRadius = document.getElementById("gologolo_border_radius_slider").value;
        goLogoLoText.style.borderRadius = newRadius + "px";
        this.model.currentWork.setBorderRadius(newRadius);
    }

    borderThicknessChange = () => {
        var goLogoLoText = document.getElementById("gologolo_text");
        var newThickness = document.getElementById("gologolo_border_thickness_slider").value;
        goLogoLoText.style.borderWidth = newThickness + "px";
        this.model.currentWork.setBorderThickness(newThickness);
    }
    paddingChange = () => {
        var goLogoLoText = document.getElementById("gologolo_text");
        var newPadding = document.getElementById("gologolo_padding_slider").value;
        goLogoLoText.style.padding = newPadding + "px";
        this.model.currentWork.setPadding(newPadding);
    }
    
    marginChange = () => {
        var goLogoLoText = document.getElementById("gologolo_text");
        var newMargin = document.getElementById("gologolo_margin_slider").value;
        goLogoLoText.style.margin = newMargin + "px";
        this.model.currentWork.setMargin(newMargin);
        console.log(newMargin);
    }
}