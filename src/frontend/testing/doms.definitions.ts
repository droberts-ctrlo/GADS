import {initializeComponent} from 'component';
import SelectWidgetComponent from '../components/form-group/select-widget/lib/component';
import InputComponent from '../components/form-group/input/lib/component';
import TreeComponent from '../components/form-group/tree/lib/component';

declare global {
  interface JQuery<TElement extends HTMLElement = HTMLElement> {
    createTree(): JQuery<TElement>;
    createMultiValueEnum(): JQuery<TElement>;
    createSingleValueEnum(): JQuery<TElement>;
    createMultiValuePerson(): JQuery<TElement>;
    createSingleValuePerson(): JQuery<TElement>;
    createMultiValueDateRangeInputs(): JQuery<TElement>;
    createDateInput(): JQuery<TElement>;
    createMultiValueText(): JQuery<TElement>;
    createSingleValueText(): JQuery<TElement>;
    createMultiValueNumber(): JQuery<TElement>;
    createSingleValueNumber(): JQuery<TElement>;
    createFile(): JQuery<TElement>;
    createCurval(): Promise<JQuery<TElement>>;
  }
}

export {}

const multiValueEnumDom = `
<div class="form-group linkspace-field" data-column-id="29" data-column-type="enum" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="Multi Enum" data-name-short=""
  data-is-multivalue="true" data-dependent-not-shown="0" style="margin-left:0" id="multiEnum">
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
  data-dependent-not-shown="0" style="margin-left:0" id="singleEnum">
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
  data-is-multivalue="true" data-dependent-not-shown="0" style="margin-left:0" id="multiPerson">
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
  data-dependent-not-shown="0" style="margin-left:0" id="singlePerson">
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
  data-dependent-not-shown="0" style="margin-left:0" id="treeDom">
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
        data-column-id="37">
      </div>
      <input type="hidden" name="field37" value="" class="selected-tree-value">
    </div>
  </fieldset>
</div>
`;

const multiValueDateRangeDom = `
<div class="form-group linkspace-field" data-column-id="32" data-column-type="daterange" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="Date Range" data-name-short=""
  data-is-multivalue="true" data-dependent-not-shown="0" style="margin-left:0" id="daterangeDom">
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
  data-is-multivalue="true" data-dependent-not-shown="0" style="margin-left:0" id="dateField">
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

const multiValTextDom = `
<div class="form-group linkspace-field" data-column-id="8" data-column-type="string" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="Test" data-name-short=""
  data-is-multivalue="true" data-dependent-not-shown="0" style="margin-left:0" id="textField">
  <div class="">
    <fieldset class="fieldset fieldset--required">
      <div class="fieldset__legend">
        <legend id="8-label">Test</legend>
      </div>
      <div class="multiple-select">
        <div class="multiple-select__list">
          <div class="multiple-select__row">
            <div class="input  input--required">
              <div class="input__field">
                <input type="text" class="form-control " id="8" name="field8" placeholder="" value=""
                  data-restore-value="" required="" aria-required="true">
              </div>
            </div>
            <button type="button" class="btn btn-delete">
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
`

const singleValueTextDom = `
<div class="form-group linkspace-field" data-column-id="8" data-column-type="string" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="Test" data-name-short=""
  data-dependent-not-shown="0" style="margin-left:0" id="textField">
  <div class="input  input--required">
    <div class="input__label">
      <label for="8">Test</label>
    </div>
    <div class="input__field">
      <input type="text" class="form-control " id="8" name="field8" placeholder="" value="" data-restore-value=""
        required="" aria-required="true">
    </div>
  </div>
</div>
`

const multiValueNumberDom = `
<div class="form-group linkspace-field" data-column-id="10" data-column-type="intgr" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="test" data-name-short=""
  data-is-multivalue="true" data-dependent-not-shown="0" style="margin-left:0" id="numberField">
  <div class="">
    <fieldset class="fieldset fieldset--required">
      <div class="fieldset__legend">
        <legend id="10-label">test</legend>
      </div>
      <div class="multiple-select">
        <div class="multiple-select__list">
          <div class="multiple-select__row">
            <div class="input  input--required">
              <div class="input__field">
                <input type="number" class="form-control " id="10" name="field10" placeholder="" value=""
                  data-restore-value="" required="" aria-required="true">
              </div>
            </div>
            <button type="button" class="btn btn-delete">
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
`

const singleValueNumberDom = `
<div class="form-group linkspace-field" data-column-id="10" data-column-type="intgr" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="test" data-name-short=""
  data-dependent-not-shown="0" style="margin-left:0" id="numberField">
  <div class="input  input--required">
    <div class="input__label">
      <label for="10">test</label>
    </div>
    <div class="input__field">
      <input type="number" class="form-control " id="10" name="field10" placeholder="" value="" data-restore-value=""
        required="" aria-required="true">
    </div>
  </div>
</div>
`

const fileDom = `
<div class="form-group linkspace-field" data-column-id="11" data-column-type="file" data-value-selector=""
  data-show-add="" data-modal-field-ids="" data-curval-instance-name="" data-name="Test" data-name-short=""
  data-dependent-not-shown="0" style="margin-left:0" id="fileField">
  <fieldset class="fieldset input fieldset--required">
    <div class="fieldset__legend">
      <legend id="11-label">Test</legend>
    </div>
    <input type="hidden" name="field11" value="">
    <div class="list list--vertical list--key-value list--no-borders">
      <ul class="list__items fileupload__files">
      </ul>
    </div>
    <div class="file-upload">
      <div class="input input--file input--document input--required" data-field="field11"
        data-fileupload-url="/api/file/" data-multivalue="0">
        <div class="progress-bar__container">
          <div class="progress-bar__progress">
            <p class="progress-bar__percentage">0%</p>
          </div>
        </div>
        <div class="input__label">
          <label for="11">
            <span class="input__file-label" role="button" aria-controls="11" tabindex="0">Choose file</span>
          </label>
          <div class="file">
            <label class="file__name" for="11">No file chosen</label>
            <button type="button" class="file__delete close" aria-label="Delete">
              <span aria-hidden="true" class="hidden">Delete file</span>
            </button>
          </div>
        </div>
        <div class="input__field">
          <input type="file" id="11" name="file" class="form-control-file " required="" aria-required="true">
        </div>
      </div>
    </div>
  </fieldset>
</div>
`

const curvalDom = `
<div class="content-block content-block--footer" id="content-block">
  <div class="modal modal--curval" id="curvalModal" tabindex="-1" role="dialog" aria-labelledby="curvalModal]Label"
    aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header__content">
            <h3 class="modal-title" id="curvalModalLabel">
            </h3>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" class="hidden">Close</span>
          </button>
        </div>
        <div class="modal-frame">
          <div class="modal-body">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="form-group linkspace-field" data-column-id="23" data-column-type="curval" data-value-selector="dropdown"
    data-show-add="1" data-modal-field-ids="[19,20,21]" data-curval-instance-name="table2" data-name="Bob"
    data-name-short="" data-is-multivalue="true" data-dependent-not-shown="0" style="margin-left:0" id="curvalField">
    <fieldset class="fieldset input fieldset--required">
      <div class="fieldset__legend">
        <legend id="23-label">Bob</legend>
      </div>
      <div class="select-widget select-widget--required multi" data-value-selector="dropdown" data-layout-id="table1"
        data-typeahead-id="23" data-field="field23" data-details-modal="#detailsModal">
        <div class="select-widget-dropdown">
          <div class="form-control">
            <ul class="current">
              <li class="none-selected">Select option(s)</li>
              <li class="search">
                <input type="search" class="form-control-search" style="width:100px" placeholder="Search..."
                  aria-controls="23-values-multi" aria-expanded="false" aria-describedby="23-label">
              </li>
            </ul>
          </div>
          <ul hidden="" class="available select__menu dropdown-menu show with-details" id="23-values-multi"
            aria-labelledby="23-label" role="listbox">
            <li class="spinner">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </li>
            <li class="has-noresults" hidden="">No results</li>
          </ul>
        </div>
      </div>
    </fieldset>
    <button type="button" class="btn btn-js-curval-modal btn-add-link" data-toggle="modal" data-target="#curvalModal">
      <span class="btn__title">Add</span>
    </button>
  </div>
</div>
`;

async function createCurvalDom (target:JQuery, dom:any) {
  await import("../js/site").then(()=>{
    import("component").then(({initializeRegisteredComponents})=>{
      $(target).append($(dom)[0]);
      initializeRegisteredComponents(document.body);
    });
  });
}

const createInput = (target:JQuery,dom: any) => {
  $(target).append($(dom)[0]);
  // @ts-expect-error "InputComponent" is not properly safe - this is going to be a common problem!
  initializeComponent(document.body, '.input', InputComponent);
};

const createSelect = (target:JQuery, dom: any) => {
  $(target).append($(dom)[0]);
  // @ts-expect-error "SelectWidgetComponent" is not properly safe - this is going to be a common problem
  initializeComponent(document.body, '.select-widget', SelectWidgetComponent);
};

const createTree = function(target:JQuery) {
  $(target).children().remove();
  $(target).append($(treeDom)[0]);
  // @ts-expect-error "TreeComponent" is not properly safe - this is going to be a common problem
  initializeComponent(document.body, '.tree', TreeComponent);
};

const createMultiValueEnum = function(target:JQuery) {
  $(target).children().remove();
  createSelect(target, multiValueEnumDom);
};

const createSingleValueEnum = function(target:JQuery) {
  $(target).children().remove();
  createSelect(target,singleValueEnumDom);
};

const createMultiValuePerson = function(target:JQuery) {
  $(target).children().remove();
  createSelect(target,multiValuePersonDom);
};

const createSingleValuePerson = function(target:JQuery) {
  $(target).children().remove();
  createSelect(target,singleValuePersonDom);
};

const createMultiValueDateRangeInputs = function(target:JQuery) {
  $(target).children().remove();
  createInput(target,multiValueDateRangeDom);
};

const createDateInput = function(target:JQuery) {
  $(target).children().remove();
  createInput(target,dateDom);
};

const createMultiValueText = function(target:JQuery) {
  $(target).children().remove();
  createInput(target,multiValTextDom);
}

const createSingleValueText = function(target:JQuery) {
  $(target).children().remove();
  createInput(target,singleValueTextDom);
}

const createMultiValueNumber = function(target:JQuery) {
  $(target).children().remove();
  createInput(target,multiValueNumberDom);
};

const createSingleValueNumber = function(target:JQuery) {
  $(target).children().remove();
  createInput(target,singleValueNumberDom);
};

const createFile = function(target:JQuery) {
  $(target).children().remove();
  createInput(target,fileDom);
};

async function createCurval (target:JQuery) {
  $(target).children().remove();
  await createCurvalDom(target,curvalDom);
}

(async ($) => {
  $.fn.createTree = function() {
    createTree(this);
    return this;
  };
  $.fn.createMultiValueEnum = function() {
    createMultiValueEnum(this);
    return this;
  };
  $.fn.createSingleValueEnum = function() {
    createSingleValueEnum(this);
    return this;
  };
  $.fn.createMultiValuePerson = function() {
    createMultiValuePerson(this);
    return this;
  };
  $.fn.createSingleValuePerson = function() {
    createSingleValuePerson(this);
    return this;
  };
  $.fn.createMultiValueDateRangeInputs = function() {
    createMultiValueDateRangeInputs(this);
    return this;
  };
  $.fn.createDateInput = function() {
    createDateInput(this);
    return this;
  };
  $.fn.createMultiValueText = function() {
    createMultiValueText(this);
    return this;
  };
  $.fn.createSingleValueText = function() {
    createSingleValueText(this);
    return this;
  };
  $.fn.createMultiValueNumber = function() {
    createMultiValueNumber(this);
    return this;
  };
  $.fn.createSingleValueNumber = function() {
    createSingleValueNumber(this);
    return this;
  };
  $.fn.createFile = function() {
    createFile(this);
    return this;
  };
  $.fn.createCurval = async function() {
    await createCurval(this);
    return this;
  };
})(jQuery);
