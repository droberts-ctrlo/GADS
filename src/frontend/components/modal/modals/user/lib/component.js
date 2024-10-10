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

import { modal } from '../../../lib/modal';
import ModalComponent from '../../../lib/component';

// noinspection JSClosureCompilerSyntax
/**
 * User Modal Component
 * @extends ModalComponent
 * @class UserModalComponent
 * @param {HTMLElement} element The element to attach the component to
 * @property {JQueryOrElement} el The jQuery element
 * @property {JQueryOrElement} emailField The email field
 * @property {JQueryOrElement} emailText The email text container
 */
class UserModalComponent extends ModalComponent {
  /**
   * Create a new UserModalComponent
   * @param {HTMLElement} element The element to attach the component to
   */
  constructor(element) {
    super(element);
    this.el = $(this.element);
    this.emailField = this.el.find('input[name="email"]');
    this.emailText = this.el.find('.js-email');

    this.initUserModal();
  }

  /**
   * Initialize the user modal
   */
  initUserModal() {
    this.on('show.bs.modal', (ev) => {
      this.toggleContent(ev);
      modal.validate();
      this.updateEmail();
      this.emailField.on('keyup', () => {
        this.updateEmail();
      });
    });
  }

  /**
   * Toggle the right content (add user or approve account)
   * @param {TriggeredEvent & {relatedTarget: HTMLElement}} ev the Event that triggered the function
   */
  toggleContent(ev) {
    if ($(ev.relatedTarget).hasClass('btn-add')) {
      modal.clear();
      this.el.find('.js-approve-account').hide();
      this.el.find('.js-add-user').show();
      this.el.find('.btn-js-reject-request').hide();
      this.el.find('.btn-js-save .btn__title').html('Create account');
      this.el.find('input[name="approve-account"]').val('false');
    } else {
      this.el.find('.js-add-user').hide();
      this.el.find('.js-approve-account').show();
      this.el.find('.btn-js-reject-request').show();
      this.el.find('.btn-js-save .btn__title').html('Approve account');
      this.el.find('input[name="approve-account"]').val('true');
    }
  }

  /**
   * Update the text container for the email address
   */
  updateEmail() {
    this.emailText.html(this.emailField.val());
  }

  /**
   * Get all data from all fields in the modal
   * @returns {{permissions: *[], view_limits: *[], groups: *[]}}
   */
  getData() {
    const data = {
      view_limits: [],
      permissions: [],
      groups: [],
    };

    this.el.find('input, textarea').each((i, field) => {
      if (($(field).prop('type') === 'radio' || $(field).prop('type') === 'checkbox')) {
        if ($(field).prop('checked')) {
          const fieldValue = isNaN($(field).val()) ? $(field).val() : parseInt($(field).val());
          if (Array.isArray(data[$(field).attr('name')])) {
            data[$(field).attr('name')].push(fieldValue);
          } else {
            data[$(field).attr('name')] = fieldValue;
          }
        }
      } else if ($(field).val() !== '') {
        const fieldValue = $(field).val();
        const fieldParsedValue = isNaN(fieldValue) ? this.parseValue(fieldValue) : parseInt(fieldValue);
        if (Array.isArray(data[$(field).attr('name')])) {
          data[$(field).attr('name')].push(fieldParsedValue);
        } else {
          data[$(field).attr('name')] = fieldParsedValue;
        }
      }
    });

    return data;
  }

  /**
   * Parse the value to a boolean if it's a string
   * @param {string} val The value to parse
   * @returns {boolean} The parsed value
   * @todo: Wouldn't this just work if we did Boolean.parse() (or whatever it is) instead?
   */
  parseValue(val) {
    return val === 'true' ? true : val === 'false' ? false : val;
  }

  /**
   * Handle save
   */
  handleSave() {
    modal.upload(this.getData());
  }

  /**
   * Handle close
   */
  handleClose() {
    super.handleClose();
    this.emailText.html('USER');
  }
}

export default UserModalComponent;
