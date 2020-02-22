import {GoLogoLoGUIClass, GoLogoLoGUIId, GoLogoLoText} from './GoLogoLoConstants.js'
import {AppsterHTML, AppsterSymbols} from '../appster/AppsterConstants.js'
import AppsterView from '../appster/AppsterView.js'

export default class GoLogoLoView extends AppsterView {
    constructor() {
        super();
    }

    fillAppWorkspace(workspace) {
        let colorPickerAttributes = [];
        colorPickerAttributes[AppsterHTML.TYPE] = AppsterHTML.COLOR;
        let rangeAttributes = [];
        rangeAttributes[AppsterHTML.TYPE] = AppsterHTML.RANGE;

        // FIRST MAKE THE TOOLBAR
        let toolbar = this.buildElement(AppsterHTML.DIV, GoLogoLoGUIId.GOLOGOLO_TOOLBAR);
        let editTextButton = this.buildElement(AppsterHTML.BUTTON, GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON, [], [], GoLogoLoText.GOLOGOLO_EDIT_TEXT_TEXT);
        editTextButton.innerHTML = AppsterSymbols.EDIT;
        let fontSizeSlider = this.buildElement(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER, [], rangeAttributes);
        let textColorPicker = this.buildElement(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER, [], colorPickerAttributes);
        let backgroundColorPicker = this.buildElement(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER, [], colorPickerAttributes);
        let borderColorPicker = this.buildElement(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER, [], colorPickerAttributes);
        let borderRadiusSlider = this.buildElement(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER, [], rangeAttributes);
        let borderThicknessSlider = this.buildElement(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER, [], rangeAttributes);
        let paddingSlider = this.buildElement(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER, [], rangeAttributes);
        let marginSlider = this.buildElement(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER, [], rangeAttributes);
        let textDiv = this.buildElement(AppsterHTML.DIV, GoLogoLoGUIId.GOLOGOLO_TEXT);
        let promptClass = [GoLogoLoGUIClass.GOLOGOLO_CONTROL_PROMPT];
        toolbar.appendChild(editTextButton);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_FONT_SIZE_TEXT));
        toolbar.appendChild(fontSizeSlider);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_TEXT_COLOR_TEXT));
        toolbar.appendChild(textColorPicker);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_BACKGROUND_COLOR_TEXT));
        toolbar.appendChild(backgroundColorPicker);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_BORDER_COLOR_TEXT));
        toolbar.appendChild(borderColorPicker);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_BORDER_RADIUS_TEXT));
        toolbar.appendChild(borderRadiusSlider);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_BORDER_THICKNESS_TEXT));
        toolbar.appendChild(borderThicknessSlider);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_PADDING_TEXT));
        toolbar.appendChild(paddingSlider);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_MARGIN_TEXT));
        toolbar.appendChild(marginSlider);

        workspace.appendChild(toolbar);
        workspace.appendChild(textDiv);
        return workspace;
    }

    loadWork(work) {
        let editText = document.getElementById(GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON);
        editText.onclick = this.goToEditTextLogo;
        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        textDiv.innerHTML = work.getText();
        let fontSizeSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER);
        fontSizeSlider.value = work.getFontSize();
        fontSizeSlider.min = 1; //smallest font size = 1 and not 0
        fontSizeSlider.oninput = this.goToSizeSliderFunc;
        let textColorPicker = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER);
        textColorPicker.value = work.getTextColor();
        textColorPicker.onchange = this.goToTextColorChange;
        let backgroundColorPicker = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER);
        backgroundColorPicker.value = work.getBackgroundColor();
        backgroundColorPicker.onchange = this.goToBackgroundColorChange;
        let borderColorPicker = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER);
        borderColorPicker.value = work.getBorderColor();
        borderColorPicker.onchange = this.goToBorderColorChange;
        let borderRadiusSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER);
        borderRadiusSlider.value = work.getBorderRadius();
        borderRadiusSlider.oninput = this.goToBorderRadiusSlider;
        let borderThicknessSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER);
        borderThicknessSlider.value = work.setBorderThickness();
        borderThicknessSlider.oninput = this.goToBorderThicknessChange;
        let paddingSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER);
        paddingSlider.value = work.getPadding();
        paddingSlider.oninput = this.goToPaddingChange;
        let marginSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER);
        marginSlider.value = work.getMargin();
        document.getElementById("gologolo_text").style.borderStyle = "solid";
        this.loadWorkStyle(work);
    }

    loadWorkStyle(work) {
        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        textDiv.style.fontSize = work.getFontSize() +"px";
        textDiv.style.color = work.getTextColor();
        textDiv.style.backgroundColor = work.getBackgroundColor();
        textDiv.style.borderColor = work.getBorderColor();
        textDiv.style.borderRadius = work.getBorderRadius() +"px";
        textDiv.style.borderWidth = work.getBorderThickness() + "px";
        textDiv.style.padding = work.getPadding() + "px";
    }

    addListItem(initText) {
        let textList = document.getElementById(RTA_GUIId.RTA_TEXT_LIST);
        let listItemCount = textList.childNodes.length;
        let newListItem = this.buildElement(AppsterHTML.LI, RTA_GUIId.RTA_TEXT_LIST_ITEM 
            + listItemCount);
        newListItem.innerHTML = initText;
        textList.appendChild(newListItem);
    }

    appendLetter(listItemId, letterToAppend) {
        let textList = document.getElementById(listItemId);
        textList.innerHTML += textList.innerHTML + letterToAppend;
    }

    goToEditTextLogo= () => {
        this.controller.editTextLogo();
    }

    goToSizeSliderFunc = () => {
        this.controller.sizeSliderFunc();
    }

    goToTextColorChange = () => {
        this.controller.textColorChange();
    }

    goToBackgroundColorChange = () => {
        this.controller.backgroundColorChange();
    }

    goToBorderColorChange = () => {
        this.controller.borderColorChange();
    }

    goToBorderRadiusSlider = () => {
        this.controller.borderRadiusSlider();
    }

    goToBorderThicknessChange = () => {
        this.controller.borderThicknessChange();
    }

    goToPaddingChange = () => {
        this.controller.paddingChange();
    }
    //updates text from modal to logo
    updateText = () => {
        console.log(this);
        var newText = this.obtainTextField();
        var logoText = document.getElementById("gologolo_text");
        this.controller.model.currentWork.setText(newText);
        logoText.innerHTML = newText;
        console.log(this);
        this.controller.cancelButton();
        this.idResetEnterCancel();
    }

}