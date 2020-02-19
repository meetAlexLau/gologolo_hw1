import AppsterController from '../appster/AppsterController.js'
import GoLogoLoLogo from './GoLogoLoLogo.js';

export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    processEditText() {
        this.model.updateText();
    }

    processCreateNewWork = () => {
        console.log("processCreateNewWork");

        // PROMPT FOR THE NAME OF THE NEW LIST
        
        //reset textfield and error text
        var errorReset = document.getElementById("appster_text_input_modal_section").childNodes[0];
        errorReset.innerHTML = "<strong>Enter a name for your logo: </strong>";
        var textField = document.getElementById("appster_text_input_modal_textfield");
        textField.value = "";
        //make text input modal appear
        var text = document.getElementById("appster_text_input_modal");
        text.style.opacity = "1.0";
        text.style.visibility = "visible";
        var text = document.getElementById("appster_text_input_modal_frame");
        text.style.opacity = "1.0";
        
        //cancel button listener
        var cancelButton = document.getElementById("appster_text_input_modal_cancel_button");
        cancelButton.addEventListener("click", this.cancelButton);

        //enter button listener
        var enterButton = document.getElementById("appster_text_input_modal_enter_button");
        enterButton.addEventListener("click", this.nameCheck);

        console.log(this.model);
        // MAKE A BRAND NEW LIST
        
        this.model.goList();
    }
    cancelButton() {
        var text = document.getElementById("appster_text_input_modal");
        text.style.opacity = "0.0";
        text.style.visibility = "hidden";
        var text = document.getElementById("appster_text_input_modal_frame");
        text.style.opacity = "0.0";

    }

    nameCheck= () => {
        var nameText = document.getElementById("appster_text_input_modal_textfield").value;
        var errorText = document.getElementById("appster_text_input_modal_section").childNodes[0];


        var x = this.model.recentWork;
        for(var i = 0; i < x.length; i++) {
            if(nameText == x[i].getName()) {
                errorText.innerHTML = "This logo name already exists. Please choose a different one."
                console.log("same name error");
                return;
            }
        }

        if(nameText == null || nameText.length <= 1) {
            errorText.innerHTML = "Your logo name must be 1 character or more.";
            console.log("name not long enough")
        }
        else {
            var newLogo = new GoLogoLoLogo(nameText);
            this.model.appendWork(newLogo);
            this.cancelButton();
            console.log(this);
        }

    

    }   


}