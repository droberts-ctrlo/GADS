import { Component } from 'component';
import { logging } from 'logging';
import { setFieldValues } from 'set-field-values';

class AutosaveModal extends Component {
  constructor(element) {
    super(element);
    this.table_key = `linkspace-record-change-${$('body').data('layout-identifier')}`;
    this.initAutosaveModal();
  }

  async initAutosaveModal() {
    const $modal = $(this.element);

    $modal.find('.btn-js-restore-values').on('click', async (e) => {
      e.preventDefault();
      const $form = $('.form-edit');

      let $list = $('<ul></ul>');
      const $body = $modal.find('.modal-body');
      $body.html('<p>Restoring values...</p>').append($list);
      for (const element of $form.find('.linkspace-field')) {
        try {
          const $field = $(element);
          const json = localStorage.getItem(`linkspace-column-${$field.data('column-id')}`);
          let name = $field.data('name');
          $list.append(`<li class="loading" id="${name}">Restoring ${name}...</li>`);
          let setValues;
          if (json) {
            const values = JSON.parse(json);
            if (Array.isArray(values)) {
              console.log('values', values);
              setValues = setFieldValues($field, values);
            } else {
              $list.children().remove('li');
              $list.append(`<li>Error: Invalid Data</li>`);
              logging.error('Invalid Data');
            }
          }
          if (setValues) {
            if (location.hostname === 'localhost') {
              await new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              });
            }
            await setValues;
            $(`#${name}`)
              .removeClass('loading')
              .addClass('complete')
              .text(`${name} restored.`);
          }
        } catch (error) {
          $list.children().remove('li');
          $list.append(`<li>Error: ${error}</li>`);
          logging.error(error);
        }
      }
      $body.append('<p>All values restored.</p>');
      $modal.find('.modal-footer').find('button:not(.btn-cancel)').hide();
      $modal.find('.modal-footer').find('.btn-cancel').text('Close');
    });

    if (localStorage.getItem(this.table_key))
      $modal.modal('show');
  }
}

export default AutosaveModal;
