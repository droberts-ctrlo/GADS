import { initializeComponent } from '../js/lib/component';
import SelectWidgetComponent from '../components/form-group/select-widget/lib/component';
import InputComponent from '../components/form-group/input/lib/component';
import TreeComponent from '../components/form-group/tree/lib/component';

window.jQuery = require('jquery');

const multiValueEnumDom = `
<div class="form-group linkspace-field" data-column-id="29" data-column-type="enum" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="Multi Enum" data-name-short=""
  data-is-multivalue="true" data-dependent-not-shown="0" style="margin-left:0px" id="multiEnum">
  <fieldset class="fieldset input fieldset--required">
    <div class="fieldset__legend">
      <legend id="29-label">Multi Enum</legend>
    </div>
    <div class="select-widget select-widget--required multi">
      <div class="select-widget-dropdown">
        <div class="form-control">
          <ul class="current">
            <li class="none-selected">Select option(s)</li>
            <li data-list-id="1" data-list-item="29_1" data-list-text="Yes" hidden="">
              <span class="widget-value__value">Yes</span>
              <button class="close select-widget-value__delete" aria-hidden="true" aria-label="delete" title="delete"
                tabindex="-1">×</button>
            </li>
            <li class="search">
              <input type="search" class="form-control-search" style="width:100px" placeholder="Search..."
                aria-controls="29-values-multi" aria-expanded="false" aria-describedby="29-label">
            </li>
          </ul>
        </div>
        <ul hidden="" class="available select__menu dropdown-menu show " id="29-values-multi" aria-labelledby="29-label"
          role="listbox">
          <li class="has-noresults" hidden="">No results</li>
          <li class="answer" role="option">
            <div class="checkbox ">
              <input id="29_1" type="checkbox" name="field29" value="1" class="" aria-labelledby="29_1-label"
                data-value="Yes">
              <label for="29_1" id="29_1-label" class="checkbox-label">Yes</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </fieldset>
</div>
`;

const singleValueEnumDom = `
<div class="form-group linkspace-field" data-column-id="34" data-column-type="enum" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="Single Value Enum" data-name-short=""
  data-dependent-not-shown="0" style="margin-left:0px" id="singleEnum">
  <input type="hidden" name="field34" value="">
  <fieldset class="fieldset input fieldset--required" data-component-initialized-t="true">
    <div class="fieldset__legend">
      <legend id="34-label">Single Value Enum</legend>
    </div>
    <div class="select-widget select-widget--required" data-component-initialized-t="true">
      <div class="select-widget-dropdown">
        <div class="form-control">
          <ul class="current empty">
            <li class="none-selected">Select option</li>
            <li data-list-id="5" data-list-item="34_5" data-list-text="Yes" hidden="">
              <span class="widget-value__value">Yes</span>
              <button class="close select-widget-value__delete" aria-hidden="true" aria-label="delete" title="delete"
                tabindex="-1">×</button>
            </li>
            <li class="search">
              <input type="search" class="form-control-search" style="width:100px" placeholder="Search..."
                aria-controls="34-values-single" aria-expanded="false" aria-describedby="34-label">
            </li>
          </ul>
        </div>
        <ul hidden="" class="available select__menu dropdown-menu show " id="34-values-single"
          aria-labelledby="34-label" role="listbox">
          <li class="has-noresults" hidden="">No results</li>
          <li class="answer" role="option">
            <div class="radio-group__option">
              <input type="radio" id="34_5" class="radio-group__input" name="field34" value="5" required=""
                aria-required="true" data-value="Yes">
              <label class="radio-group__label" for="34_5">Yes</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </fieldset>
</div>
  `;

const multiValuePersonDom = `
<div class="form-group linkspace-field" data-column-id="31" data-column-type="person" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="People Test" data-name-short=""
  data-is-multivalue="true" data-dependent-not-shown="0" style="margin-left:0px" id="multiPerson">
  <fieldset class="fieldset input fieldset--required">
    <div class="fieldset__legend">
      <legend id="31-label">People Test</legend>
    </div>
    <div class="select-widget select-widget--required multi">
      <div class="select-widget-dropdown">
        <div class="form-control">
          <ul class="current empty">
            <li class="none-selected">Select option(s)</li>
            <li data-list-id="1" data-list-item="31_1" data-list-text="Roberts, Dave" hidden="">
              <span class="widget-value__value">Roberts, Dave</span>
              <button class="close select-widget-value__delete" aria-hidden="true" aria-label="delete" title="delete"
                tabindex="-1">×</button>
            </li>
            <li class="search">
              <input type="search" class="form-control-search" style="width:100px" placeholder="Search..."
                aria-controls="31-values-multi" aria-expanded="false" aria-describedby="31-label">
            </li>
          </ul>
        </div>
        <ul hidden="" class="available select__menu dropdown-menu show " id="31-values-multi" aria-labelledby="31-label"
          role="listbox">
          <li class="has-noresults" hidden="">No results</li>
          <li class="answer" role="option">
            <div class="checkbox ">
              <input id="31_1" type="checkbox" name="field31" value="1" class="" aria-labelledby="31_1-label"
                data-value="Roberts, Dave">
              <label for="31_1" id="31_1-label" class="checkbox-label">Roberts, Dave</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </fieldset>
</div>
`;

const singleValuePersonDom = `
<div class="form-group linkspace-field" data-column-id="35" data-column-type="person" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="Single Person" data-name-short=""
  data-dependent-not-shown="0" style="margin-left:0px" id="singlePerson">
  <input type="hidden" name="field35" value="">
  <fieldset class="fieldset input fieldset--required" data-component-initialized-t="true">
    <div class="fieldset__legend">
      <legend id="35-label">Single Person</legend>
    </div>
    <div class="select-widget select-widget--required" data-component-initialized-t="true">
      <div class="select-widget-dropdown">
        <div class="form-control">
          <ul class="current empty">
            <li class="none-selected">Select option</li>
            <li data-list-id="1" data-list-item="35_1" data-list-text="Roberts, Dave" hidden="">
              <span class="widget-value__value">Roberts, Dave</span>
              <button class="close select-widget-value__delete" aria-hidden="true" aria-label="delete" title="delete"
                tabindex="-1">×</button>
            </li>
            <li class="search">
              <input type="search" class="form-control-search" style="width:100px" placeholder="Search..."
                aria-controls="35-values-single" aria-expanded="false" aria-describedby="35-label">
            </li>
          </ul>
        </div>
        <ul hidden="" class="available select__menu dropdown-menu show " id="35-values-single"
          aria-labelledby="35-label" role="listbox">
          <li class="has-noresults" hidden="">No results</li>
          <li class="answer" role="option">
            <div class="radio-group__option">
              <input type="radio" id="35_1" class="radio-group__input" name="field35" value="1" required=""
                aria-required="true" data-value="Roberts, Dave">
              <label class="radio-group__label" for="35_1">Roberts, Dave</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </fieldset>
</div>
  `;

const treeDom = `
<div class="form-group linkspace-field" data-column-id="37" data-column-type="tree" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="Tree" data-name-short=""
  data-dependent-not-shown="0" style="margin-left:0px" id="treeDom">
  <fieldset class="fieldset input fieldset--required">
    <div class="fieldset__legend">
      <legend id="37-label">Tree</legend>
    </div>
    <div class="tree " id="tree-config" data-no-initial-data="false">
      <div class="list list--horizontal list--buttons">
        <ul class="list__items">
          <li class="list__item">
            <button type="button" name="" value="" class="btn btn-small btn-link btn-js-tree-expand">
              <span class="btn__title">Expand all</span>
            </button>
          </li>
          <li class="list__item">
            <button type="button" name="" value="" class="btn btn-small btn-link btn-js-tree-collapse">
              <span class="btn__title">Collapse all</span>
            </button>
          </li>
          <li class="list__item">
            <button type="button" name="" value="" class="btn btn-small btn-link btn-js-tree-reload">
              <span class="btn__title">Reload</span>
            </button>
          </li>
        </ul>
      </div>
      <div class="tree-widget-container" id="jstree37" data-field="field37" data-layout-identifier="table1"
        data-column-id="37" data-csrf-token="SOcgx812EM5R7OyYWKPpcPMMsdIZ3ByY">
      </div>
      <input type="hidden" name="field37" value="" class="selected-tree-value">
    </div>
  </fieldset>
</div>
`;

const multiValueDateRangeDom = `
<div class="form-group linkspace-field" data-column-id="32" data-column-type="daterange" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="Date Range" data-name-short=""
  data-is-multivalue="true" data-dependent-not-shown="0" style="margin-left:0px" id="daterangeDom">
  <div class="">
    <fieldset class="fieldset fieldset--required">
      <div class="fieldset__legend">
        <legend id="32-label">Date Range</legend>
      </div>
      <div class="multiple-select">
        <div class="multiple-select__list">
          <div class="multiple-select__row">
            <fieldset class="fieldset" style="width: calc(100% - 100px); flex: 0 1 auto;">
              <div class="fieldset__legend">
                <legend id="32-label">
                </legend>
              </div>
              <div class="input-group input-daterange flex-nowrap" style="width: 100%;">
                <div class="input input--date input--from input--datepicker input--required"
                 >
                  <div class="input__label">
                    <label for="32_from" class="hidden">From</label>
                  </div>
                  <div class="input__field">
                    <input type="text" class="form-control " id="32_from" name="field32" placeholder="yyyy-mm-dd"
                      value="" data-restore-value="" data-dateformat-datepicker="yyyy-mm-dd" required=""
                      aria-required="true">
                  </div>
                </div>
                <div class="input-group-addon">
                  <span class="input-group-text">to</span>
                </div>
                <div class="input input--date input--to input--datepicker input--required"
                 >
                  <div class="input__label">
                    <label for="32_to" class="hidden">To</label>
                  </div>
                  <div class="input__field">
                    <input type="text" class="form-control " id="32_to" name="field32" placeholder="yyyy-mm-dd" value=""
                      data-restore-value="" data-dateformat-datepicker="yyyy-mm-dd" required="" aria-required="true">
                  </div>
                </div>
              </div>
            </fieldset>
            <button type="button" class="btn btn-delete btn-delete--hidden">
              <span class="btn__title">Delete</span>
            </button>
          </div>
        </div>
        <button type="button" class="btn btn-add-link">
          <span class="btn__title">Add extra value</span>
        </button>
      </div>
    </fieldset>
  </div>
</div>
  `;

const dateDom = `
<div class="form-group linkspace-field" data-column-id="33" data-column-type="date" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="Date" data-name-short=""
  data-is-multivalue="true" data-dependent-not-shown="0" style="margin-left:0px" id="dateField">
  <div class="">
    <fieldset class="fieldset fieldset--required">
      <div class="fieldset__legend">
        <legend id="33-label">Date</legend>
      </div>
      <div class="multiple-select" >
        <div class="multiple-select__list">
          <div class="multiple-select__row">
            <div class="input input--date input--datepicker input--required">
              <div class="input__field">
                <input type="text" class="form-control " id="33" name="field33" placeholder="yyyy-mm-dd" value=""
                  data-restore-value="" data-dateformat-datepicker="yyyy-mm-dd" required="" aria-required="true">
              </div>
            </div>
            <button type="button" class="btn btn-delete btn-delete--hidden">
              <span class="btn__title">Delete</span>
            </button>
          </div>
        </div>
        <button type="button" class="btn btn-add-link">
          <span class="btn__title">Add extra value</span>
        </button>
      </div>
    </fieldset>
  </div>
</div>
  `;

const createInput = (dom) => {
  document.body.appendChild($(dom)[0]);
  initializeComponent(document, '.input', InputComponent);
};

const createSelect = (dom) => {
  document.body.appendChild($(dom)[0]);
  initializeComponent(document, '.select-widget', SelectWidgetComponent);
};

export const createTree = () => {
  document.body.appendChild($(treeDom)[0]);
  initializeComponent(document, '.tree', TreeComponent);
};

export const createMultiValueEnum = () => {
  $('body').children().remove();
  createSelect(multiValueEnumDom);
};

export const createSingleValueEnum = () => {
  $('body').children().remove();
  createSelect(singleValueEnumDom);
};

export const createMultiValuePerson = () => {
  $('body').children().remove();
  createSelect(multiValuePersonDom);
};

export const createSingleValuePerson = () => {
  $('body').children().remove();
  createSelect(singleValuePersonDom);
};

export const createMultiValueDateRangeInputs = () => {
  $('body').children().remove();
  createInput(multiValueDateRangeDom);
};

export const createDateInput = () => {
  $('body').children().remove();
  createInput(dateDom);
};
