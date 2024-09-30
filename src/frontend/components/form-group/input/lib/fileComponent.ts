import { formdataMapper } from 'util/mapper/formdataMapper';
import { upload } from 'util/upload/UploadControl';
import { InputComponentLike } from './helpers';

export default class FileComponent  implements InputComponentLike{
    el: JQuery<HTMLElement>;
    fileInput: JQuery<HTMLInputElement>;
    fileName: JQuery<HTMLElement>;
    fileDelete: JQuery<HTMLElement>;
    inputFileLabel: JQuery<HTMLElement>;

    readonly type = 'file';

    constructor(el: HTMLElement | JQuery<HTMLElement>) {
        this.el = el instanceof HTMLElement ? $(el) : el;
        this.fileInput = this.el.find('.form-control-file') as JQuery<HTMLInputElement>;
        this.fileName = this.el.find('.file__name');
        this.fileDelete = this.el.find('.file__delete');
        this.inputFileLabel = this.el.find('.input__file-label');
    }

    init() {
        const dropTarget = this.el.closest('.file-upload');
        if (dropTarget) {
            const dragOptions = { allowMultiple: false };
            (dropTarget as any).filedrag(dragOptions).on('onFileDrop', (ev, file) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                this.handleFormUpload(file);
            });
        } else {
            throw new Error('Could not find file-upload element');
        }

        this.fileInput.on('change', this.changeFile);
        this.inputFileLabel.on('keyup', this.uploadFile);
        this.fileDelete.addClass('hidden');
        this.fileDelete.on('click', this.deleteFile);
    }

    // As some of these, if not all, are event handlers, scoping can get a bit wiggy; using arrow functions to keep the scope of `this` to the class
    handleFormUpload = (file: File) => {
        if (!file) throw new Error('No file provided');

        const form = this.el.closest('form');
        const action = form.attr('action') ? window.location.href + form.attr('action') : window.location.href;
        const method = (form.attr('method') || 'GET').toUpperCase();
        const tokenField = form.find('input[name="csrf_token"]');
        const csrf_token = tokenField.val() as string ?? tokenField.val()?.toString();
        const formData = formdataMapper({ file, csrf_token });
        
        if (method === 'POST') {
            upload(action, formData, 'POST').catch(console.error);
        } else {
            throw new Error('Method not supported');
        }
    };

    changeFile = (ev: JQuery.ChangeEvent<HTMLInputElement>) => {
        const [file] = ev.target.files!;
        const { name: fileName } = file;

        this.fileName.text(fileName);
        this.fileName.attr('title', fileName);
        this.fileDelete.removeClass('hidden');
    };

    uploadFile = (ev: JQuery.KeyUpEvent) => {
        if (ev.which === 32 || ev.which === 13) {
            this.fileInput.trigger('click');
        }
    };

    deleteFile = () => {
        this.fileName.text('No file chosen');
        this.fileName.attr('title', '');
        this.fileInput.val('');
        this.fileDelete.addClass('hidden');
        // TO DO: set focus back to input__file-label without triggering keyup event on it
    };
}
