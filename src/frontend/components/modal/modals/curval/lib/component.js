/*
 * GADS - Globally Accessible Data Store
 * Copyright (C) 2015-2024 Ctrl O Ltd
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import ModalComponent from '../../../lib/component';
import { getFieldValues } from 'get-field-values';
import { initializeRegisteredComponents } from 'component';
import { validateCheckboxGroup, validateRadioGroup } from 'validation';

// noinspection JSClosureCompilerSyntax
/**
 * Curval Modal Component
 * @extends ModalComponent
 * @class CurvalModalComponent
 * @param {HTMLElement} element The element to attach the component to
 * @property {HTMLElement} element The element the component is attached to
 * @property {HTMLElement?} context The context of the component
 * @property {JQuery<HTMLElement>} el The jQuery wrapped element
 * @property {boolean} allowReinitialization Whether the component can be reinitialized
 */
class CurvalModalComponent extends ModalComponent {
  /**
   * Create a Curval Modal Component
   * @param {HTMLElement} element The element to attach the component to
   */
  constructor(element) {
    super(element);
    this.context = undefined; // Populated on modal show
    if (!this.wasInitialized) this.initCurvalModal();
  }

  /**
   * Whether the component can be reinitialized
   * @returns {boolean} True if the component can be reinitialized
   */
  static get allowReinitialization() {
    return true;
  }

  /**
   * Initialize the Curval Modal Component
   */
  initCurvalModal() {
    this.setupModal();
    this.setupSubmit();
  }

  /**
   * Triggered when the Curval Modal validation has succeeded
   * @param {JQueryOrT<HTMLFormElement>} form The form element
   * @param {any[]} values The values from the form
   */
  curvalModalValidationSucceeded(form, values) {
    const form_data = form.serialize();
    const modal_field_ids = form.data('modal-field-ids');
    const col_id = form.data('curval-id');
    const current_id = form.data('current-id');
    const instance_name = form.data('instance-name');
    let guid = form.data('guid');
    const hidden_input = $('<input>').attr({
      type: 'hidden',
      name: 'field' + col_id,
      value: form_data,
    });
    const $formGroup = $('div[data-column-id=' + col_id + ']');
    const valueSelector = $formGroup.data('value-selector');

    if (valueSelector === 'noshow') {
      // No strict requirement for alias here, but it is needed below, so for the sake of consistency
      const row_cells = $('<tr class="table-curval-item">', self.context);

      jQuery.map(modal_field_ids, (element) => {
        const control = form.find('[data-column-id="' + element + '"]');
        // TODO: What's going on here?
        let value = getFieldValues(control);
        value = values['field' + element];
        value = $('<div />', self.context).text(value).html();
        row_cells.append(
          $('<td class="curval-inner-text">', self.context).append(value),
        );
      });

      const editButton = $(
        `<td>
          <button type="button" class="btn btn-small btn-link btn-js-curval-modal" data-toggle="modal" data-target="#curvalModal" data-layout-id="${col_id}"
                data-instance-name="${instance_name}" data-current-id="${current_id}">
            <span class="btn__title">Edit</span>
          </button>
          </td>`,
        this.context,
      );

      const removeButton = $(
        `<td>
          <button type="button" class="btn btn-small btn-delete btn-js-curval-remove">
            <span class="btn__title">Remove</span>
          </button>
        </td>`,
        this.context,
      );

      row_cells.append(editButton.append(hidden_input)).append(removeButton);

      /* Activate remove button in new row */
      initializeRegisteredComponents(row_cells[0]);

      if (guid) {
        const hidden = $('input[data-guid="' + guid + '"]', this.context).val(form_data);
        hidden.closest('.table-curval-item').replaceWith(row_cells);
      } else {
        const col = $(`#curval_list_${col_id}`);
        col.find('tbody').prepend(row_cells);
        col.find('.dataTables_empty').hide();
      }
    } else {
      const $widget = $formGroup.find('.select-widget').first();
      const multi = $widget.hasClass('multi');
      const required = $widget.hasClass('select-widget--required');
      const $current = $formGroup.find('.current');
      const $currentItems = $current.find('[data-list-item]');

      const $search = $current.find('.search');
      const $answersList = $formGroup.find('.available');

      if (!multi) {
        /* Deselect current selected value */
        $currentItems.attr('hidden', '');
        $answersList.find('li input').prop('checked', false);
      }

      const textValue = jQuery
        .map(modal_field_ids, function (element) {
          const value = values['field' + element];
          return $('<div />')
            .text(value)
            .html();
        })
        .join(', ');

      guid = crypto.randomUUID();
      const id = `field${col_id}_${guid}`;
      const deleteButton = multi
        ? '<button class="close select-widget-value__delete" aria-hidden="true" aria-label="delete" title="delete" tabindex="-1">&times;</button>'
        : '';

      $search.before(
        `<li data-list-item="${id}"><span class="widget-value__value">${textValue}</span>${deleteButton}</li>`,
      ).before(' '); // Ensure space between elements in widget

      const inputType = multi ? 'checkbox' : 'radio';
      const strRequired = required
        ? `required="required" aria-required="true" aria-errormessage="${$widget.attr('id')}-err"`
        : ``;

      $answersList.append(`<li class="answer" role="option">
        <div class="control">
          <div class="${multi ? 'checkbox' : 'radio-group__option'}">
            <input ${strRequired} id="${id}" name="field${col_id}" type="${inputType}" value="${form_data}" class="${multi ? '' : 'radio-group__input'}" checked aria-labelledby="${id}_label">
            <label id="${id}_label" for="${id}" class="${multi ? '' : 'radio-group__label'}">
              <span>${textValue}</span>
            </label>
          </div>
        </div>
        <div class="details">
          <button type="button" class="btn btn-small btn-danger btn-js-curval-remove">
            <span class="btn__title">Remove</span>
          </button>
        </div>
      </li>`);

      this.updateWidgetState($widget, multi, required);

      /* Reinitialize widget */
      initializeRegisteredComponents($formGroup[0]);
      import(/* webpackChunkName: "select-widget" */ '../../../../form-group/select-widget/lib/component')
        .then(({ default: SelectWidgetComponent }) => {
          new SelectWidgetComponent($widget[0]);
        });
    }

    $(this.element).modal('hide');
  }

  /**
   * Update the state of the widget
   * @param {JQueryOrElement} $widget The widget element to update the state of
   * @param {boolean} multi True if the input is multivalue
   * @param {boolean} required True of the input is required
   */
  updateWidgetState($widget, multi, required) {
    const $current = $widget.find('.current');
    const $visible = $current.children('[data-list-item]:not([hidden])');

    $current.toggleClass('empty', $visible.length === 0);

    if (required) {
      if (multi) {
        validateCheckboxGroup($widget);
      } else {
        validateRadioGroup($widget);
      }
    }
  }

  /**
   * Fired when the Curval Modal's validation has failed
   * @param {JQueryOrT<HTMLFormElement>} form The form that has failed validation
   * @param {string} errorMessage The error message to display
   */
  curvalModalValidationFailed(form, errorMessage) {
    form
      .find('.alert')
      .text(errorMessage)
      .removeAttr('hidden');
    form
      .parents('.modal-content')
      .get(0)
      .scrollIntoView();
    form.find('button[type=submit]').prop('disabled', false);
  }

  /**
   * Setup the Curval Modal
   */
  setupModal() {
    this.on('show.bs.modal', this.showModal);
  }

  showModal(ev) {
    const button = ev.relatedTarget;
    const layout_id = $(button).data('layout-id');
    const instance_name = $(button).data('instance-name');
    const current_id = $(button).data('current-id');
    const hidden = $(button)
      .closest('.table-curval-item')
      .find(`input[name=field${layout_id}]`);
    const form_data = hidden.val();
    const mode = hidden.length ? 'edit' : 'add';
    const $formGroup = $(button).closest('.form-group');
    let guid;

    if ($formGroup.find('.table-curval-group').length) {
      this.context = $formGroup.find('.table-curval-group');
    } else if ($formGroup.find('.select-widget').length) {
      this.context = $formGroup.find('.select-widget');
    }

    if (mode === 'edit') {
      guid = hidden.data('guid');
      if (!guid) {
        guid = crypto.randomUUID();
        hidden.attr('data-guid', guid);
      }
    }

    const $m = $(this.element);
    $m.find('.modal-body').text('Loading...');

    const url = current_id
      ? `/record/${current_id}`
      : `/${instance_name}/record/`;

    // TODO: Load needs replacing
    $m.find('.modal-body').load(
      this.getURL(url, layout_id, form_data, $formGroup),
      function () {
        if (mode === 'edit') {
          $m.find('form').data('guid', guid);
        }
        initializeRegisteredComponents(this.element);
      },
    );

    $m.on('focus', '.datepicker', (e) => {
      $(e.target).datepicker({
        format: $m.attr('data-dateformat-datepicker'),
        autoclose: true,
      });
    });

    this.off('hide.bs.modal', this.hideModal);
    this.on('hide.bs.modal', this.hideModal);
  }

  hideModal() {
    return confirm('Closing this dialogue will cancel any work. Are you sure you want to do so?');
  }

  getURL(url, layout_id, form_data, $formGroup) {
    const devURLs = window.siteConfig && window.siteConfig.urls.curvalTableForm && window.siteConfig.urls.curvalSelectWidgetForm;

    if (devURLs) {
      if ($formGroup.data('value-selector') === 'noshow') {
        return window.siteConfig.urls.curvalTableForm;
      } else {
        return window.siteConfig.urls.curvalSelectWidgetForm;
      }
    } else {
      return `${url}?include_draft&modal=${layout_id}&${form_data}`;
    }
  }

  setupSubmit() {
    $(this.element).on('submit', '.curval-edit-form', (e) => {
      // Don't show close warning when user clicks submit button
      self.el.off('hide.bs.modal');

      e.preventDefault();
      const $form = $(e.target);
      const form_data = $form.serialize();

      $form.addClass('edit-form--validating');
      $form.find('.alert').attr('hidden', '');

      const devData = window.siteConfig && window.siteConfig.curvalData;

      if (devData) {
        self.curvalModalValidationSucceeded($form, devData.values);
      } else {
        // TODO: Use the new upload component
        // noinspection JSIgnoredPromiseFromCall
        $.post(
          $form.attr('action') + '?validate&include_draft&source=' + $form.data('curval-id'),
          form_data,
          (data) => {
            if (data.error === 0) {
              self.curvalModalValidationSucceeded($form, data.values);
            } else {
              const errorMessage
                = data.error === 1 ? data.message : 'Oops! Something went wrong.';
              self.curvalModalValidationFailed($form, errorMessage);
            }
          },
          'json',
        )
          .fail(function (_, textStatus, errorThrown) {
            const errorMessage = `Oops! Something went wrong: ${textStatus}: ${errorThrown}`;
            self.curvalModalValidationFailed($form, errorMessage);
          })
          .always(function () {
            $form.removeClass('edit-form--validating');
          });
      }
    });
  }
}

export default CurvalModalComponent;
