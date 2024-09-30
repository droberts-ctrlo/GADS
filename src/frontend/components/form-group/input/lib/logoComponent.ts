import { formdataMapper } from 'util/mapper/formdataMapper';
import { upload } from 'util/upload/UploadControl';
import { InputComponentLike } from './helpers';

export default class LogoComponent implements InputComponentLike {
    el: JQuery<HTMLElement>;
    logoDisplay: JQuery<HTMLImageElement>;
    fileInput: JQuery<HTMLInputElement>;
    readonly type = 'logo';

    constructor(element: HTMLElement | JQuery<HTMLElement>) {
        this.el = $(element);
        this.logoDisplay = this.el.parent().find('img');
        this.fileInput = this.el.find('.form-control-file') as JQuery<HTMLInputElement>;
    }

    init() {
        if (this.logoDisplay.attr('src') === '#') {
            this.logoDisplay.hide();
        }

        this.el.find('.file').hide();

        this.fileInput.on('change', this.handleFileChange);
    }

    handleFileChange = (ev: JQuery.ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault();
        const url = this.el.data('fileupload-url');
        const file = this.fileInput[0].files?.[0];
        const csrf_token = $('body').data('csrf');

        if (file) {
            const formData = formdataMapper({ file, csrf_token });

            upload<{ url: string }>(url, formData, 'POST').then((data) => {
                const version = this.logoDisplay.attr('src')!.split('?')[1];
                const newVersion = version ? parseInt(version, 10) + 1 : 1;
                this.logoDisplay.attr('src', `${data.url}?${newVersion}`).show();
            });
        }
    };
}
