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

import { Component } from 'component';
import { modal } from './modal';
import { Frame } from './frame';
import { logging } from 'logging';

/**
 * Subscriber to the modal
 * @typedef {{handleActivate?: (frameNr: number, clearFields: boolean, id: string) => void; handleAdd?: (frame: JQueryOrElement) => void; handleBack?: (frame: JQueryOrElement) => void; handleNext?: (frame: JQueryOrElement) => void; handleShow?: (modal: JQuery<HTMLElement>) => void; handleSave?: () => void; handleUpload?: (data: any) => void; handleClear?: (arr: number[]) => void; handleClose?: () => void; handleSkip?: (frameNr: number) => void; handleValidate?: () => void; handleUpdate?: (frame: JQueryOrElement) => void; }} Subscriber
 */

/**
 * Strongly typed JQuery or Element
 * @template {HTMLElement} T The type of the element
 * @typedef {JQuery<T> | T} JQueryOrT
 */

/**
 * JQuery or HTMLElement
 * @typedef {JQueryOrT<HTMLElement>} JQueryOrElement
 */

/**
 * Short version of TriggeredEvent
 * @typedef {JQuery.TriggeredEvent<HTMLElement, HTMLElement, HTMLElement, HTMLElement>} TriggeredEvent
 */

// noinspection JSClosureCompilerSyntax
/**
 * Base class for ModalComponent
 * @extends Component
 * @implements Subscriber
 * @class ModalComponent
 * @param {HTMLElement} element The element representing the modal
 * @property {boolean} isWizzard True if the modal is a wizard
 * @property {boolean} isForm True if the modal is a form
 * @property {JQuery<HTMLElement>} el The modal element as a jQuery object
 * @property {JQuery<HTMLElement>} frames The frames of the modal
 * @property {Frame} frame The current frame
 * @property {any} typingTimer Timer for typing
 * @property {boolean} wasInitialized True if the modal was initialized
 */
class ModalComponent extends Component {
  constructor(element) {
    super(element);
    this.el = $(this.element);
    this.isWizzard = this.el.hasClass('modal--wizzard');
    this.isForm = this.el.hasClass('modal--form');
    this.frames = this.el.find('.modal-frame');
    this.typingTimer = null;
    if (!this.wasInitialized) this.initModal();
  }

  /**
   * Get the allowReinitialization property
   * @returns {boolean} True if reinitialization is allowed
   */
  static get allowReinitialization() {
    return true;
  }

  /**
   * Helper function for on '*.bs.modal' events
   * @param { 'show.bs.modal' | 'hide.bs.modal' | 'hidden.bs.modal' } name event descriptor
   * @param { (e?:any)=>void } handler event handler
   */
  on(name, handler) {
    if (!name) throw new Error('Event name is required');
    if (!handler) throw new Error('Event handler is required');
    if (!(name.endsWith('.bs.modal'))) {
      this.el.on(name, handler);
    } else {
      this.element.addEventListener(name, handler);
    }
  }

  /**
   * Helper function for off '*.bs.modal' events
   * @param { 'show.bs.modal' | 'hide.bs.modal' | 'hidden.bs.modal' } name event descriptor
   * @param { (e?:any)=>void } handler event handler
   */
  off(name, handler) {
    if (!name) throw new Error('Event name is required');
    if (!(name.endsWith('.bs.modal'))) {
      if (handler) {
        this.el.off(name, handler);
      } else {
        this.el.off(name);
      }
    } else {
      if (!handler) throw new Error('Event handler is required');
      this.element.removeEventListener(name, handler);
    }
  }

  /**
   * Initialize the modal
   */
  initModal() {
    this.on('show.bs.modal', this.modalShow);
  }

  /**
   * Prevent hiding the modal if the close button is pressed in error
   * @param e event
   */
  modalHide(e) {
    if (this.dataHasChanged()) {
      if (!confirm('Are you sure you want to close this popup? Any unsaved data will be lost.')) {
        e.preventDefault();
      }
    }
  }

  /**
   * Event for when the modal is hidden - removes the close confirmation event listener and closes the modal
   */
  modalHidden() {
    this.off('hide.bs.modal', this.modalHide);
    modal.close();
  }

  /**
   * Event for when the modal is shown - adds the modal subscriber and activates the first frame
   */
  modalShow() {
    // noinspection JSCheckFunctionSignatures
    modal.addSubscriber(this);

    if (this.isWizzard) {
      try {
        this.activateFrame(1, 0);
      } catch (e) {
        logging.error(e);
        this.preventModalToOpen();
      }

      this.on('hide.bs.modal', this.modalHide);
    }

    if ((this.isWizzard) || (this.isForm)) {
      this.on('hidden.bs.modal', this.modalHidden);
    }

    this.hideContent(true);
  }

  /**
   * Check if the data has changed
   * @returns {boolean} True if the data has changed
   */
  dataHasChanged() {
    const fields = $(this.el).find('input, textarea');
    let hasChanged = false;

    fields.each((_, field) => {
      if ($(field).val()) {
        if (($(field).attr('type') !== 'hidden' && $(field).attr('type') !== 'checkbox' && $(field).attr('type') !== 'radio')
          || ($(field).attr('type') === 'hidden' && $(field).parents('.select').length)) {
          if (($(field).data('original-value') && $(field).val().toString() !== $(field).data('original-value').toString())
            || !$(field).data('original-value')) {
            hasChanged = true;
            return false;
          }
        } else if ($(field).attr('type') !== 'hidden' && (($(field).data('original-value') && $(field).prop('checked') && $(field).val() !== $(field).data('original-value').toString())
          || (!$(field).data('original-value') && $(field).prop('checked')))) {
          hasChanged = true;
          return false;
        }
      }
    });

    return hasChanged;
  }

  /**
   * Hide or show the content of the body
   * @param bHide True to hide the content, false to show it
   */
  hideContent(bHide) {
    if (bHide) {
      $('body').children().attr('aria-hidden', 'true');
    } else {
      $('body').children().removeAttr('aria-hidden');
    }
  }

  /**
   * Prevent the modal from opening if the button is disabled
   */
  preventModalToOpen() {
    const modalId = this.el.attr('id') || '';
    $(`.btn[data-target="#${modalId}"]`).on('click', function (e) {
      e.stopPropagation();
    });
  }

  /**
   * Clear all fields in a frame
   * @param {JQueryOrElement} frame The frame to clear
   */
  clearFields(frame) {
    const fields = $(frame).find('input, textarea');

    fields.each((_, field) => {
      const $field = $(field);

      if ($field.attr('type') === 'radio') {
        // Simple removal of checked property will suffice
        $field.prop('checked', false);
      } else if ($field.attr('type') === 'checkbox') {
        // Need to trigger click event to ensure widget is updated
        if ($field.is(':checked')) $field.trigger('click');
      } else {
        if ($field.data('restore-value')) {
          $field.val($field.data('restore-value'));
        } else {
          $field.val('');
        }
        $(field).removeData('original-value');
        $field.trigger('change');
      }

      if ($field.is(':invalid')) {
        $field.attr('aria-invalid', 'false');
        $field.closest('.input').removeClass('input--invalid');
      }
    });
  }

  /**
   * Clear frames by frame numbers
   * @param {number[]?} arrFrameNumbers Array of frame numbers to clear or null to clear all frames
   */
  clearFrames(arrFrameNumbers) {
    if (arrFrameNumbers) {
      arrFrameNumbers.forEach((frameNr) => {
        const frame = this.getFrameByNumber(frameNr);
        frame && this.clearFields(frame);
      });
    } else {
      this.frames.each((_, frame) => {
        this.clearFields(frame);
      });
    }
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Get the frame number of a frame
   * @param {JQueryOrElement} frame The frame to get the number of
   * @returns {number | undefined} The frame number if it exists, otherwise undefined
   */
  getFrameNumber(frame) {
    const config = $(frame).data('config');

    if (!config.frame || isNaN(config.frame)) {
      return;
    }

    return config.frame;
  }

  /**
   * Get a frame by its number
   * @param {number} frameNr The frame number to get
   * @returns {HTMLElement | null} The frame if it exists, otherwise null
   */
  getFrameByNumber(frameNr) {
    let selectedFrame = null;

    this.frames.each((_, frame) => {
      const config = $(frame).data('config');

      if (config.frame === frameNr) {
        selectedFrame = frame;
        return false;
      }
    });

    return selectedFrame;
  }

  /**
   * Activate a frame by its number
   * @param {number} frameNumber The frame number to activate
   * @param {number} previousFrameNumber The previous frame number
   * @param {boolean} clearFields True to clear the fields of the frame
   */
  activateFrame(frameNumber, previousFrameNumber, clearFields = false) {
    this.frames.each((_, frame) => {
      const config = $(frame).data('config');

      if (!config.frame || isNaN(config.frame)) {
        throw 'activateFrame: frame is not a number!';
      }

      this.unbindEventHandlers($(frame));

      if (config.frame === frameNumber) {
        try {
          this.frame = this.createFrame(frame, previousFrameNumber);
        } catch (e) {
          logging.error(e);
        }

        this.frame.object.removeClass('invisible');
        this.frame.object.find('.alert').hide();
        this.activateStep(this.frame.step);
        this.bindEventHandlers();

        if (this.frame.requiredFields.length) {
          this.frame.buttons.next && this.setNextButtonState(false);
          this.frame.buttons.invisible && this.setInvisibleButtonState(false);
        }

        if (clearFields) {
          this.clearFields(frame);
          this.validateFrame();
        }
      } else {
        $(frame).addClass('invisible');
      }
    });
  }

  /**
   * Create a new frame object
   * @param { JQueryOrElement } frame The frame to create the object from
   * @param { number } previousFrameNumber The previous frame number
   * @returns {Frame} The created frame object
   */
  createFrame(frame, previousFrameNumber) {
    if (isNaN($(frame).data('config').step) || (isNaN($(frame).data('config').frame))) {
      throw 'createFrame: Parameter is not a number!';
    }
    if ($(frame).data('config').skip && isNaN($(frame).data('config').skip)) {
      throw 'createFrame: Skip parameter is not a number!';
    }
    return new Frame($(frame), previousFrameNumber);
  }

  /**
   * Bind event handlers to the frame
   */
  bindEventHandlers() {
    this.frame.buttons.next.on('click', () => {
      modal.next(this.frame.object);
    });
    this.frame.buttons.back.on('click', () => {
      modal.back(this.frame.object);
    });
    this.frame.buttons.skip.on('click', () => {
      this.frame.skip && modal.skip(this.frame.skip);
    });
    this.frame.buttons.addNext.on('click', () => {
      modal.add(this.frame.object);
    });
    this.frame.buttons.save.on('click', () => {
      modal.save();
    });
    this.frame.requiredFields.on('keyup.modalEvent', (ev) => {
      this.handleKeyup(ev);
    });
    this.frame.requiredFields.on('keydown.modalEvent', () => {
      this.handleKeydown();
    });
    this.frame.requiredFields.on('blur.modalEvent', (ev) => {
      this.handleBlur(ev);
    });
  }

  /**
   * Handle keyup event
   * @param {TriggeredEvent} ev The keyup event
   */
  handleKeyup(ev) {
    const doneTypingInterval = 1000;
    const field = ev.target;
    clearTimeout(this.typingTimer);

    this.typingTimer = setTimeout(() => {
      if ($(field).val())
        this.validateField(field);
    },
    doneTypingInterval);
  }

  /**
   * Handle keydown event
   */
  handleKeydown() {
    clearTimeout(this.typingTimer);
  }

  /**
   * Handle blur event
   * @param {TriggeredEvent} ev The blur event
   */
  handleBlur(ev) {
    const field = ev.target;
    clearTimeout(this.typingTimer);

    if ($(field).val())
      this.validateField(field);
  }

  /**
   * Check if a field is valid
   * @param {JQueryOrT<HTMLInputElement>} field The field to check
   * @returns {boolean} True if the field is valid
   */
  isValidField(field) {
    return !(($(field).is(':invalid')) || ($(field).val() === ''));
  }

  /**
   * Validate a single field
   * @param {JQueryOrT<HTMLInputElement>} field The field to validate
   */
  validateField(field) {
    const isValid = this.isValidField(field);
    this.frame.error = [];

    if (!isValid) {
      const fieldLabel = $(field).closest('.input').find('label').html();
      this.frame.error.push(`${fieldLabel} is invalid`);
    }

    this.setInputState($(field));
    this.validateFrame();
  }

  /**
   * Validate all fields in the frame
   */
  validateFrame() {
    this.frame.isValid = true;

    this.frame.requiredFields.each((_, field) => {
      if (!this.isValidField($(field))) {
        this.frame.isValid = false;
      }
    });

    this.setFrameState();
  }

  /**
   * Set the input state
   * @param {JQueryOrT<HTMLInputElement>} $field The field to set the state of
   */
  setInputState($field) {
    if ($field.is(':invalid')) {
      $field.attr('aria-invalid', 'true');
      $field.closest('.input').addClass('input--invalid');
    } else {
      $field.attr('aria-invalid', 'false');
      $field.closest('.input').removeClass('input--invalid');
    }
  }

  /**
   * Set the state of the frame
   */
  setFrameState() {
    const alert = this.frame.object.find('.alert');

    this.frame.buttons.next && this.setNextButtonState(this.frame.isValid);
    this.frame.buttons.invisible && this.setInvisibleButtonState(this.frame.isValid);

    if ((!this.frame.isValid) && (this.frame.error.length > 0)) {
      const errorIntro = '<p>There were problems with the following fields:</p>';
      let errorList = '';

      $.each(this.frame.error, (_, errorMsg) => {
        const errorMsgHtml = $('<span>').text(errorMsg).html();
        errorList += `<li>${errorMsgHtml}</li>`;
      });

      alert.html(`<div>${errorIntro}<ul>${errorList}</ul></div>`);
      alert.show();
      this.el.animate({ scrollTop: alert.offset().top }, 500);
    } else {
      alert.hide();
    }
  }

  /**
   * Unbind event handlers from the frame
   * @param {JQueryOrElement} frame The frame to unbind the event handlers from
   */
  unbindEventHandlers(frame) {
    frame.find('.modal-footer .btn').off();
    frame.find('input[required]').off('.modalEvent');
  }

  /**
   * Set the state of the next button
   * @param {boolean} valid True if the frame is valid
   */
  setNextButtonState(valid) {
    if (valid) {
      this.frame.buttons.next.removeAttr('disabled');
      this.frame.buttons.next.removeClass('btn-disabled');
      this.frame.buttons.next.addClass('btn-default');
    } else {
      this.frame.buttons.next.attr('disabled', 'disabled');
      this.frame.buttons.next.addClass('btn-disabled');
      this.frame.buttons.next.removeClass('btn-default');
    }
  }

  /**
   * Set the state of the invisible button
   * @param {boolean} valid True if the frame is valid
   */
  setInvisibleButtonState(valid) {
    if (valid) {
      this.frame.buttons.invisible.removeClass('btn-invisible');
    } else {
      this.frame.buttons.invisible.addClass('btn-invisible');
    }
  }

  /**
   * Activate the current step in the modal
   * @param {number} currentStep The current step to activate
   */
  activateStep(currentStep) {
    let steps = this.el.find('.modal__step');

    steps.each((_, step) => {
      if ($(step).data('step') === currentStep) {
        $(step).addClass('modal__step--active');
      } else {
        $(step).removeClass('modal__step--active');
      }
    });
  }

  /**
   * Handle upload
   * @template T The type of the data object
   * @param {T} dataObj The data object to upload
   */
  handleUpload(dataObj) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const url = this.el.data('config').url;
    const id = this.el.data('config').id;
    const csrf = $('body').data('csrf').toString();
    dataObj['csrf_token'] = csrf || '';
    const dataStr = JSON.stringify(dataObj);
    const strURL = id ? `${url}/${id}` : url;

    // noinspection JSIgnoredPromiseFromCall
    $.ajax({
      method: 'POST',
      contentType: 'application/json',
      url: strURL,
      data: dataStr,
      processData: false,
    })
      .done(function () {
        location.reload();
      })
      .fail(function (jqXHR) {
        const strError = jqXHR.responseJSON.message;
        self.showError(strError);
      });
  }

  /**
   * Show an error
   * @param {string} strError The error message to show
   */
  showError(strError) {
    const alert = this.frame.object.find('.alert');

    const strErrorHtml = $('<span>').text(strError).html();
    alert.html(`<p>Error: ${strErrorHtml}</p>`);
    alert.show();
    this.el.animate({ scrollTop: alert.offset().top }, 500);
  }

  /**
   * Handle next button click
   */
  handleNext() {
    const nextFrameNumber = this.frame.number + 1;
    if (this.frames.length >= (nextFrameNumber)) {
      this.activateFrame(nextFrameNumber, this.frame.number);
    }
  }

  /**
   * Handle back button click
   */
  handleBack() {
    const previousFrameNumber = this.frame.back;
    if (previousFrameNumber > 0) {
      this.activateFrame(this.frame.back, this.frame.back - 1);
    }
    this.validateFrame();
  }

  /**
   * Handle skip button click
   * @param {number} skipToNumber The frame number to skip to
   */
  handleSkip(skipToNumber) {
    this.activateFrame(skipToNumber, this.frame.number);
  }

  // TODO: this may be wrong
  /**
   * Handle add button click
   * @param {JQueryOrElement} frame The frame to perform the add action on
   */
  handleAdd(frame) {
    modal.update(frame);
    this.clearFields(frame);
    this.validateFrame();
  }

  /**
   * Handle frame activation
   * @param {number} frameNumber The frame number to activate
   * @param {boolean} clearFields True to clear the fields of the frame
   */
  handleActivate(frameNumber, clearFields) {
    this.activateFrame(frameNumber, this.frame.number, clearFields);
  }

  /**
   * Handle show
   * @param {JQueryOrElement} modal The modal to show
   */
  handleShow(modal) {
    $(modal).modal('show');
  }

  /**
   * Handle the clear event
   * @param {number[]} arr The array of frame numbers to clear
   */
  handleClear(arr) {
    this.clearFrames(arr);
  }

  /**
   * Handle the validate event
   */
  handleValidate() {
    this.validateFrame();
  }

  /**
   * Handle the close event
   */
  handleClose() {
    this.clearFrames();

    if (this.isWizzard) {
      // activate first frame
      this.activateFrame(1, 0, true);

      // Clear the id in the data-config
      if (this.el.data('config') && this.el.data('config').id) {
        this.el.data('config').id = null;
      }
    }

    // Remove bound events and subscribers
    this.off('hide.bs.modal', this.modalHide);
    this.off('hidden.bs.modal', this.modalHidden);
    // noinspection JSCheckFunctionSignatures
    modal.unsubscribe(this);
  }
}

export default ModalComponent;
