import {Component} from 'component';

/**
 * Class representing a button that renames a file.
 * @extends Component
 */
class RenameFileButtonComponent extends Component {
    /**
     * Create a button that renames a file.
     * @param element {HTMLElement} - The element to create the button in.
     */
    constructor(element) {
        super(element);
        this.el = $(element);
        this.el.on('click', () => {
            if (window.test) console.log("click!!");
            this.onClick();
        });
    }

    /**
     * Handles the click event.
     */
    onClick() {
        const filename_data = this.el.data('filename');
        if (window.test) console.log('Filename:', filename_data);
        const fileId_data = this.el.data('id');
        if (window.test) console.log('File ID:', fileId_data);
        const $modal = $('#renameModal');
        const $filename = $modal.find("#new_name");
        const $file_id_field = $modal.find("#file_id");
        const $rename_button = $modal.find("#rename_button");
        $filename.val(filename_data);
        $file_id_field.val(fileId_data);
        $rename_button.on("click", () => {
            if(filename_data === $filename.val()) return;
            const hiddenRename = this.el.find("#new_name");
            if (hiddenRename && hiddenRename.length > 0) {
                const nameText = hiddenRename.val();
                let nameList = nameText.split(",");
                const idPosition = nameList.indexOf(fileId_data);
                if (idPosition > 0) nameList = nameList.splice(idPosition, 2);
                nameList.push(fileId_data, $filename.val());
                hiddenRename.val(nameList.join(","));
            } else {
                this.el.closest('button').append(`<input type="hidden" id="new_name" name="new_name" value="${fileId_data},${$filename.val()}">`);
            }
            const form = this.el.closest('form');
            const currentNameControl = form.find("#currentName")
            currentNameControl.text($filename.val() + " (renaming)");
        });
    }
}

export default RenameFileButtonComponent;
