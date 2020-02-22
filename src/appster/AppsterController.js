import {AppsterCallback, AppsterGUIId, AppsterHTML} from './AppsterConstants.js'
import GoLogoLoController from '../gologolo/GoLogoLoController.js';
import GoLogoLoLogo from '../gologolo/GoLogoLoLogo.js';
import GoLogoLoView from '../gologolo/GoLogoLoView.js';

export default class AppsterController {
    constructor() {
        this.model = null;
    }

    setModel(initModel) {
        this.model = initModel;
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {AppsterGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {AppsterHTML} eventName The type of control for which to respond.
     * @param {AppsterCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        if (control)
            control.addEventListener(eventName, callback);
    }

    registerAppsterEventHandlers() {
        // FIRST THE NEW WORK BUTTON ON THE HOME SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_HOME_NEW_WORK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CREATE_NEW_WORK]);

        // THEN THE CONTROLS ON THE EDIT SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_HOME_LINK, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_GO_HOME]);
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_TRASH, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_DELETE_WORK]);

        // AND THE MODAL BUTTONS
        this.registerEventHandler(AppsterGUIId.DIALOG_YES_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CONFIRM_DELETE_WORK]);
        this.registerEventHandler(AppsterGUIId.DIALOG_NO_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_DELETE_WORK]);
    }

    /**
    * This method sets up a callback method for an element, registering the
    * elementCallbackName (e.g. click) function for the element control in the DOM, specifying
    * callbackFunctionName as the method to be called when that event occurs. The
    * args array is used to pass needed data to the callback.
    * 
    * @param {Element} element 
    * @param {String} elementCallbackName 
    * @param {String} callbackFunctionName 
    * @param {String[]} args 
    */
    setupCallback(element, elementCallbackName, callbackFunctionName, args) {
        let functionCallText = "this." + callbackFunctionName + "(";
        for (let i = 0; i < args.length; i++) {
            functionCallText += "'" + args[i] + "'";
            if (i < (args.length - 1)) {
                functionCallText += ", ";
            }
        }
        functionCallText += ")";
        element.setAttribute(elementCallbackName, functionCallText);
        return functionCallText;
    }

    registerRecentWorkEventHandler(element) {
        element.addEventListener(AppsterHTML.CLICK, this.processEditWork);
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome = () => {
        console.log("processGoHome");
        this.model.currentWork = null;
        this.model.goHome();
    }

    processGoEdit(workToEdit) {
        console.log("processGoEdit");
        this.model.goEdit(workToEdit);
    }


    /**
     * This function responds to when the user clicks on a link
     * for recent work on the home screen.
     * 
     * @param {String} workName The name of the work to load into
     * the controls on the edit screen.
     */
    processEditWork = (event) => {
        console.log("processEditWork");
        console.log(this.model.currentWork);
        // GET THE WORK THAT THE USER WANTS TO LOAD
        let clickedElement = event.target;
        let workName = clickedElement.workId;
        //this.model.currentWork = workName;

        console.log(workName + " clicked");
        console.log(this.model.currentWork);
        console.log(this);
        // START EDITING THE SELECTED WORK
        this.model.editWork(workName);
        
    }

    createNewWork = () => {
        console.log("processCreateNewWork");
        console.log(this);
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
        enterButton.addEventListener("click", this.nameChecker);

        
    }
    cancelButton = () => {
        var text = document.getElementById("appster_text_input_modal");
        text.style.opacity = "0.0";
        text.style.visibility = "hidden";
        var text = document.getElementById("appster_text_input_modal_frame");
        text.style.opacity = "0.0";
        this.model.view.idResetEnterCancel();
    }

    nameCheck = () =>{
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
            return nameText;
        }
    } 

    /**
     * This function responds to when the user clicks the No
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processCancelDeleteWork() {
        // JUST HIDE THE DIALOG

    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * This function responds to when the user clicks the Yes
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processConfirmDeleteWork() {
        // DELETE THE WORK
        this.model.removeWork(this.model.getWorkToEdit());

        // GO BACK TO THE HOME SCREEN
        this.model.goHome();
    }

    /**
     * This function responds to when the user clicks the trash
     * button, i.e. the delete button, in order to delete the
     * list being edited.
     */
    processDeleteWork = () =>{
        // VERIFY VIA A DIALOG BOX
        var deleteBox = document.getElementById("appster_yes_no_modal");
        deleteBox.style.visibility = "visible";
        deleteBox.style.opacity = "1.0";
        var deleteBox2 = document.getElementById("appster_yes_no_modal_frame");
        deleteBox2.style.visibility = "visible";
        deleteBox2.style.opacity = "1.0";
        var deleteBox3 = document.getElementById("appster_yes_no_modal_section");
        deleteBox3.style.visibility = "visible";
        deleteBox3.style.opacity = "1.0";

        var noButton = document.getElementById("appster_yes_no_modal_no_button");
        noButton.onclick = function() {
            var deleteBox = document.getElementById("appster_yes_no_modal");
            deleteBox.style.visibility = "hidden";
            deleteBox.style.opacity = "0.0";
            var deleteBox2 = document.getElementById("appster_yes_no_modal_frame");
            deleteBox2.style.visibility = "hidden";
            deleteBox2.style.opacity = "0.0";
            var deleteBox3 = document.getElementById("appster_yes_no_modal_section");
            deleteBox3.style.visibility = "hidden";
            deleteBox3.style.opacity = "0.0";
        }
        console.log(this);
        var yesButton = document.getElementById("appster_yes_no_modal_yes_button");
        yesButton.addEventListener("click", this.yesButtonFunction);


        //window.todo.model.view.showDialog();
        console.log("delete");

    }
    yesButtonFunction = () => {
        console.log(this);
        let current = this.model.currentWork;
        let index = -1;
        for(var i =0; i< this.model.recentWork.length; i++) {
            console.log(this.model.recentWork[i].name);
            if(this.model.recentWork[i].name == current.name) {
                index = i;
                break;
            }
        }

        if(index >= 0) {
            this.model.recentWork.splice(index, 1);
        }
        
        this.model.view.reloadRecentWorkLinks(this.model.recentWork);
        console.log(this);
        console.log(this.model.recentWork);

        var deleteBox = document.getElementById("appster_yes_no_modal");
        deleteBox.style.visibility = "hidden";
        deleteBox.style.opacity = "0.0";
        var deleteBox2 = document.getElementById("appster_yes_no_modal_frame");
        deleteBox2.style.visibility = "hidden";
        deleteBox2.style.opacity = "0.0";
        var deleteBox3 = document.getElementById("appster_yes_no_modal_section");
        deleteBox3.style.visibility = "hidden";
        deleteBox3.style.opacity = "0.0";
        this.processGoHome();
    }
}