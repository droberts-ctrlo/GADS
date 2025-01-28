import { initializeComponent } from 'component';
import AutosaveComponent from './lib/component';
import AutosaveModal from './lib/modal';
import gadsStorage from 'util/gadsStorage';

export default (scope) => {
    if (gadsStorage.enabled) {
        try {
            initializeComponent(scope, '.linkspace-field', AutosaveComponent);
            initializeComponent(scope, '#restoreValuesModal', AutosaveModal);
        } catch(e) {
            console.error(e);
            $('.content-block__main-content').prepend('<div class="alert alert-danger">Auto-recover failed to initialize. ' + e.message ? e.message : e + '</div>');
        }
    } else {
        $('.content-block__main-content').prepend('<div class="alert alert-warning">Auto-recover is disabled as your browser does not support encryption</div>');
    }
};
