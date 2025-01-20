import {validateRequiredFields} from "validation";
import { clearSavedFormValues } from "./common";

/**
 * Button to submit records
 */
export default class SubmitRecordButton {
    private requiredHiddenRecordDependentFieldsCleared: boolean = false;
    private canSubmitRecordForm: boolean = false;
    private disableButton: boolean = false;

    /**
     * Create a button to submit records
     * @param el {JQuery<HTMLElement>} Element to create as a button
     */
    constructor(private el: JQuery<HTMLElement>) {
        this.el.on("click", async (ev: JQuery.ClickEvent) => {
            const $button = $(ev.target).closest('button');
            const $form = $button.closest("form");
            const $requiredHiddenRecordDependentFields = $form.find(".form-group[data-has-dependency='1'][style*='display: none'] *[aria-required]");
            const $parent = $button.closest('.modal-body');

            if (!this.requiredHiddenRecordDependentFieldsCleared) {
                ev.preventDefault();

                // Remove the required attribute from hidden required dependent fields
                $requiredHiddenRecordDependentFields.removeAttr('required');
                this.requiredHiddenRecordDependentFieldsCleared = true;
            }

            if (!this.canSubmitRecordForm) {
                ev.preventDefault();

                const isValid = validateRequiredFields($form);

                if (isValid) {
                    this.canSubmitRecordForm = true;
                    this.disableButton = false;
                    if ($parent.hasClass('modal-body')) {
                        $form.trigger("submit");
                    } else {
                        $button.trigger('click');
                    }
                    // Prevent double-submission
                    this.disableButton = true;
                    $button.prop("disabled", true);
                    if ($button.prop("name")) {
                        $button.after(`<input type="hidden" name="${$button.prop("name")}" value="${$button.val()}" />`);
                    }
                    // Clear the saved form values from local storage as they should now be saved to the record
                    await clearSavedFormValues($form);
                } else {
                    // Re-add the required attribute to required dependent fields
                    $requiredHiddenRecordDependentFields.attr('required', '');
                    this.requiredHiddenRecordDependentFieldsCleared = false;
                }
            }
            this.disableButton && $button.prop("disabled", this.requiredHiddenRecordDependentFieldsCleared);
        });
    }
}
