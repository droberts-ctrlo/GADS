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
 * A button list
 * @typedef {{ next: JQuery<HTMLElement>; back: JQuery<HTMLElement>; skip: JQuery<HTMLElement>; addNext: JQuery<HTMLElement>; invisible: JQuery<HTMLElement>; save: JQuery<HTMLElement>; }} ButtonList
 */

/**
 * Frame for modals
 * @class Frame
 * @param { JQuery<HTMLElement> } frame The frame object
 * @param { number } previousFrameNumber The previous frame number
 * @property { JQuery<HTMLElement> } object The frame object
 * @property { number } step The step number
 * @property { number } number The frame number
 * @property { string | null } item The item name
 * @property { number | null } skip The number of the frame to skip to
 * @property { number } back The number of the frame to go back to
 * @property { JQuery<HTMLElement> } requiredFields The required fields in the frame
 * @property { boolean } isValid The validity of the frame
 * @property { string[] } error The error messages (if any)
 * @property { ButtonList } buttons The buttons in the frame
 */
class Frame {
  /**
   * Create a new Frame instance
   * @param {JQueryOrElement} frame the element to attach the frame to
   * @param {number} previousFrameNumber the previous frame number
   */
  constructor(frame, previousFrameNumber) {
    this.object = frame;
    this.step = frame.data('config').step;
    this.number = frame.data('config').frame;
    this.item = frame.data('config').item || null;
    this.skip = frame.data('config').skip || null;
    this.back = previousFrameNumber;
    this.requiredFields = frame.find('input[required]');
    this.isValid = true;
    this.error = [];
    this.buttons = {
      next: frame.find('.modal-footer .btn-js-next'),
      back: frame.find('.modal-footer .btn-js-back'),
      skip: frame.find('.modal-footer .btn-js-skip'),
      addNext: frame.find('.modal-footer .btn-js-add-next'),
      invisible: frame.find('.modal-footer .btn-js-add-next'),
      save: frame.find('.modal-footer .btn-js-save'),
    };
  }
}

export { Frame };
