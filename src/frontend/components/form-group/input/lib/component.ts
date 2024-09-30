import { Component } from "component";
import { initValidationOnField } from "validation";
import PasswordComponent from "./passwordComponent";
import LogoComponent from "./logoComponent";
import DocumentComponent from "./documentComponent";
import FileComponent from "./fileComponent";
import DateComponent from "./dateComponent";
import AutocompleteComponent from "./autocompleteComponent";
import { initComponent } from "./helpers";

class InputComponent extends Component {
    private static componentMap = {
        'input--password': PasswordComponent,
        'input--logo': LogoComponent,
        'input--document': DocumentComponent,
        'input--file': FileComponent,
        'input--datepicker': DateComponent,
        'input--autocomplete': AutocompleteComponent
    };

    constructor(element: HTMLElement | JQuery<HTMLElement>) {
        super(element);
        this.initializeComponent();
        this.initializeValidation();
    }

    private initializeComponent() {
        const $el = $(this.element);

        for (const [className, ComponentClass] of Object.entries(InputComponent.componentMap)) {
            if ($el.hasClass(className)) {
                if (!this.wasInitialized) initComponent(ComponentClass, this.element);
                break; // Assuming only one component type per element
            }
        }
    }

    private initializeValidation() {
        const $el = $(this.element);

        if ($el.hasClass('input--required')) {
            initValidationOnField($el);
        }
    }
}

export default InputComponent;
