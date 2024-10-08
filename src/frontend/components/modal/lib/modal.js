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

/**
 * Modal class using a publisher-subscriber pattern
 * @class Modal
 * @property { Subscriber[] } observers A list of observers
 */
class Modal {
  constructor() {
    this.observers = [];
  }

  /**
   * Add a subscriber to the modal
   * @param {Subscriber} subscriber The subscriber to add
   */
  addSubscriber(subscriber) {
    this.observers.push(subscriber);
  }

  /**
   * Remove a subscriber from the modal
   * @param { Subscriber } subscriber The subscriber to remove
   */
  unsubscribe(subscriber) {
    const index = this.observers.indexOf(subscriber);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  /**
   * Trigger the activate event
   * @param {number} frameNr The frame number
   * @param {boolean} clearFields Set to true to clear the fields
   * @param {string | number} id The id of the modal
   */
  activate(frameNr, clearFields, id) {
    this.observers.forEach(item => item.handleActivate?.(frameNr, clearFields, id));
  }

  /**
   * Trigger the add frame event
   * @param {JQueryOrElement} frame The frame to add
   */
  add(frame) {
    this.observers.forEach(item => item.handleAdd?.(frame));
  }

  /**
   * Trigger the previous frame event
   * @param {JQueryOrElement} frame The frame to go back to
   */
  back(frame) {
    this.observers.forEach(item => item.handleBack?.(frame));
  }

  /**
   * Trigger the next frame event
   * @param {JQueryOrElement} frame The frame to go to
   */
  next(frame) {
    this.observers.forEach(item => item.handleNext?.(frame));
  }

  /**
   * Trigger the show event on the modal
   * @param {JQueryOrElement} modal The modal to show
   */
  show(modal) {
    this.observers.forEach(item => item.handleShow?.(modal));
  }

  /**
   * Trigger the save event on the modal
   */
  save() {
    this.observers.forEach(item => item.handleSave?.());
  }

  /**
   * Trigger the upload event
   * @template {object} T The type of the data to upload
   * @param {T} data The data to upload
   */
  upload(data) {
    this.observers.forEach(item => item.handleUpload?.(data));
  }

  /**
   * Trigger the clear event
   * @param {number[]?} arr The array of frame numbers to clear or all if not provided
   */
  clear(arr) {
    this.observers.forEach(item => item.handleClear?.(arr));
  }

  /**
   * Trigger the close event
   */
  close() {
    this.observers.forEach(item => item.handleClose?.());
  }

  /**
   * Skip a number of frames
   * @param {number} frameNr The number of the frame to skip to
   */
  skip(frameNr) {
    this.observers.forEach(item => item.handleSkip?.(frameNr));
  }

  /**
   * Validate the frame
   */
  validate() {
    this.observers.forEach(item => item.handleValidate?.());
  }

  /**
   * Update the frame
   * @param {JQueryOrElement} frame The frame to update
   */
  update(frame) {
    this.observers.forEach(item => item.handleUpdate?.(frame));
  }
}

const modal = new Modal();

export {
  Modal,
  modal,
};
