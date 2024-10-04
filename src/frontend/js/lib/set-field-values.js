import { logging } from './logging';

/*
  Set the value of a field, depending on its type.

  curval fields not supported at the time of writing

  For text only values, accepts arrays of strings

  For enum-type values (enums, trees, people) accepts an object with either an
  "id" key or a "text" key, with the required value
*/

/**
 * Set the values on a field
 * @param {JQuery<HTMLElement>} $field Field to set values for
 * @param {any[]} values Values to set as
 * @returns
 */
async function setFieldValues($field, values) {
  const type = $field.data('column-type');
  const name = $field.data('name');

  if (!Array.isArray(values)) {
    logging.error(`Attempt to set value for ${name} without array`);
    return Promise.reject(`Attempt to set value for ${name} without array`);
  }

  if (type === 'enum') {
    if ($field.data('is-multivalue')) {
      await set_enum_multi($field, values);
    }
    else {
      await set_enum_single($field, values);
    }
  }
  else if (type === 'person') {
    if ($field.data('is-multivalue')) {
      await set_enum_multi($field, values);
    }
    else {
      await set_enum_single($field, values);
    }
  }
  else if (type === 'tree') {
    await set_tree($field, values);
  }
  else if (type === 'daterange') {
    for (const value of values) {
      const index = values.indexOf(value);
      let $single = await prepare_multi($field, index);
      await set_daterange($single, value);
    }
  }
  else if (type === 'date') {
    for (const value of values) {
      const index = values.indexOf(value);
      let $single = await prepare_multi($field, index);
      await set_date($single, value);
    }
  }
  else if (type === 'string' || type === 'intgr') {
    for (const value of values) {
      const index = values.indexOf(value);
      let $single = await prepare_multi($field, index);
      await set_string($single, value);
    }
  }
  else if (type === 'file') {
    $field.find('.fileupload__files').empty();
    // Component needs to be set up above .input--document div but below the
    // fieldset div. The latter also has a .input class, but it should be the
    // former that becomes the component
    await import('../../components/form-group/input/lib/documentComponent')
      .then(({ default: DocumentComponent }) => {
        let filecomp = new DocumentComponent($field.find('.file-upload')[0]);
        values.forEach((value) => {
          filecomp.addFileToField({ id: value.id, name: value.filename });
        });
      });
  }
  else if (type === 'curval') {
    // Curval values can be either integers (existing record IDs) or completely
    // new draft records
    const ids = values.filter(item => Number.isInteger(item));
    // For IDs, set them as normal enums
    if ($field.data('is-multivalue')) {
      await set_enum_multi($field, ids);
    }
    else {
      await set_enum_single($field, ids);
    }
    // For draft records, resubmit them through the modal
    const records = values.filter(item => !Number.isInteger(item));
    await import('components/modal/modals/curval').then(({ default: CurvalModalComponent }) => {
      const curval = (new CurvalModalComponent($field.closest('.content-block')[0]));
      curval.setValue($field, records);
    });
  }
  else {
    logging.error(`Unable to set value for field ${name}: ${type}`);
    throw new Error(`Unknown field type ${type}`);
  }
}

// Deal with either single value field or field with multiple inputs. Create as
// many inputs as required
function prepare_multi($field, index) {
  return new Promise((resolve) => {
    if ($field.data('is-multivalue')) {
      let $multi_container = $field.find('.multiple-select__list');
      let existing_count = $multi_container.children().length;
      if (index >= existing_count) {
        $field.find('.btn-add-link').trigger('click');
      }
      resolve($multi_container.children().eq(index));
    }
    else {
      resolve($field);
    }
  });
}

function set_enum_single($element, values) {
  return new Promise((resolve, reject) => {
    // Accept ID or text value, specified depending on the key of the value
    // object
    values.forEach((value) => {
      let $option;
      let val;
      if (/^\d+$/.test(value)) { // Value could be a stringified integer
        $option = $element.find(`input[value='${value}']`);
      }
      else if (Object.prototype.hasOwnProperty.call(value, 'id')) {
        val = value['id'];
        $option = $element.find(`input[value='${val}']`);
      }
      else if (Object.prototype.hasOwnProperty.call(value, 'text')) {
        val = value['text'];
        $option = $element.find(`input[data-value='${val}']`);
      }
      else {
        logging.error('Unknown value or key for single enum');
        reject('Unknown value or key for single enum');
      }
      if ($option.length) {
        $option.trigger('click');
      }
      else {
        let name = $element.data('name');
        logging.info(`Unknown value ${val} for ${name}`);
      }
    });
    resolve();
  });
}

function set_enum_multi($element, values) {
  return new Promise((resolve, reject) => {
    const id_hash = {};
    const text_hash = {};

    values.forEach((value) => {
      if (/^\d+$/.test(value)) { // Value could be a stringified integer
        id_hash[value] = false;
      }
      else if (Object.prototype.hasOwnProperty.call(value, 'id')) {
        id_hash[value.id] = false;
      }
      else if (Object.prototype.hasOwnProperty.call(value, 'text')) {
        text_hash[value.text] = false;
      }
      else {
        logging.error('Unknown value or key for multi enum');
        reject('Unknown value or key for multi enum');
      }
    });

    // Iterate each available checkbox, and select or deselect as required to
    // match values
    $element.find('.checkbox').each((_, element) => {
      let $check = $(element).find('input');
      // Mark an option checked if either the id or text value match the
      // submitted values
      if (Object.prototype.hasOwnProperty.call(id_hash, $check.val()) || Object.prototype.hasOwnProperty.call(text_hash, $check.data('value'))) {
        if (!$check.is(':checked')) {
          $check.trigger('click');
        }
        if (Object.prototype.hasOwnProperty.call(id_hash, $check.val())) id_hash[$check.val()] = true;
        if (Object.prototype.hasOwnProperty.call(text_hash, $check.data('value'))) text_hash[$check.data('value')] = true;
      }
      else {
        if ($check.is(':checked')) {
          $check.trigger('click');
        }
      }
    });

    // Report any values that weren't used
    let name = $element.data('name');
    for (const [value, used] of Object.entries(id_hash)) {
      if (!used) {
        logging.info(`Unmatched value ${value} for ${name}`);
      }
    }
    for (const [value, used] of Object.entries(text_hash)) {
      if (!used) {
        logging.info(`Unmatched value ${value} for ${name}`);
      }
    }
    resolve();
  });
}

function set_date($element, value) {
  return new Promise((resolve) => {
    const $input = $element.find('input');
    // Why not use isNumber?
    if (/^\d+$/.test(value)) {
      // Assume epoch
      $input.datepicker('update', new Date(value * 1000));
    }
    else {
      // Otherwise assume string
      $input.datepicker('update', value);
    }
    resolve();
  });
}

function set_daterange($element, value) {
  return new Promise((resolve) => {
    const from = $element.find('.input--from');
    const to = $element.find('.input--to');
    Promise.all([
      set_date(from, value.from),
      set_date(to, value.to),
    ]).then(() => {
      resolve();
    });
  });
}

function set_string($element, value) {
  return new Promise((resolve) => {
    $element.find('input').val(value).trigger('change');
    resolve();
  });
}

function set_tree($field, values) {
  return new Promise((resolve, reject) => {
    let $jstree = $field.find('.jstree').jstree(true);
    let nodes = $jstree.get_json('#', { flat: true });

    // Create a hash to map all the text values to ids, in case value is supplied
    // by text
    const nodes_hash = {};
    nodes.forEach((node) => {
      nodes_hash[node.text] = node.id;
    });
    logging.info('Nodes hash', nodes_hash);
    $jstree.deselect_all();
    values.forEach((value) => {
      let id;
      if (/^\d+$/.test(value)) { // Value could be a stringified integer
        id = value;
      }
      else if (Object.prototype.hasOwnProperty.call(value, 'id')) {
        id = value['id'];
      }
      else if (Object.prototype.hasOwnProperty.call(value, 'text')) {
        if (Object.prototype.hasOwnProperty.call(nodes_hash, value['text'])) {
          id = nodes_hash[value['text']];
        }
        else {
          logging.info('Unknown text value for tree: ' + value['text']);
        }
      }
      else {
        reject('Unknown value key for tree');
        logging.error('Unknown value key for tree');
      }
      $jstree.select_node(id);
    });
    resolve();
  });
}

export { setFieldValues };
