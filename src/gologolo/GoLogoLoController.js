import AppsterController from '../appster/AppsterController.js'
import GoLogoLoLogo from './GoLogoLoLogo.js';
import { GoLogoLoGUIId } from './GoLogoLoConstants.js';
import { AppsterHTML } from '../appster/AppsterConstants.js';

export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    registerGoLogoLoEventHandlers() {
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON,AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_EDIT_TEXT_BUTTON]);
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
            this.model.appendWork(newLogo);
            this.cancelButton();
            console.log(this);
        }
    }

}