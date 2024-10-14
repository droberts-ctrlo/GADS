import 'testing/global';

import { describe, it, expect } from '@jest/globals';
import { setFieldValues } from './set-field-values';
import {
  createDateInput,
  createMultiValueDateRangeInputs,
  createMultiValueEnum,
  createMultiValuePerson,
  createSingleValueEnum,
  createSingleValuePerson,
  createTree,
  createMultiValueText,
  createSingleValueText,
  createMultiValueNumber,
  createSingleValueNumber,
  createFile,
} from 'testing/dom';

describe('setFieldValues', () => {
  it('should not perform any action if a single value is passed in', async () => {
    const field = document.createElement('input');
    field.dataset.columnType = 'enum';
    field.dataset.name = 'field';
    await expect(setFieldValues($(field), 'value')).rejects.toEqual('Attempt to set value for field without array');
  });

  describe('Enums', () => {
    it('Should set enum value on multi value enum field', async () => {
      createMultiValueEnum();
      const field = $('#multiEnum');
      const values = [1];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      expect(field.find('input[type=checkbox]').prop('checked')).toBe(true);
    });

    it('Should error when invalid data is passed in to multi value enum field', async () => {
      createMultiValueEnum();
      const field = $('#multiEnum');
      const values = ['invalid'];
      await expect(setFieldValues(field, values)).rejects.toEqual('Unknown value or key for multi enum');
      expect(field.find('input[type=checkbox]').prop('checked')).toBe(false);
    });

    it('Should set enum value on a single value enum field', async () => {
      createSingleValueEnum();
      const field = $('#singleEnum');
      const values = [5];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      expect($('#34_5:checked')).toHaveLength(1);
    });

    it('Should error when invalid data is passed in to single value enum field', async () => {
      createSingleValueEnum();
      const field = $('#singleEnum');
      const values = ['invalid'];
      await expect(setFieldValues(field, values)).rejects.toEqual('Unknown value or key for single enum');
      expect($('#34_5:checked')).toHaveLength(0);
    });
  });

  describe('Person', () => {
    it('Should set person value on multi value person field', async () => {
      createMultiValuePerson();
      const field = $('#multiPerson');
      const values = [1];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      expect(field.find('input[type=checkbox]').prop('checked')).toBe(true);
    });

    it('Should error when invalid data is passed in to multi value person field', async () => {
      createMultiValuePerson();
      const field = $('#multiPerson');
      const values = ['invalid'];
      await expect(setFieldValues(field, values)).rejects.toEqual('Unknown value or key for multi enum');
      expect(field.find('input[type=checkbox]').prop('checked')).toBe(false);
    });

    it('Should set person value on a single value person field', async () => {
      createSingleValuePerson();
      const field = $('#singlePerson');
      const values = [1];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      expect($('#35_1:checked')).toHaveLength(1);
    });
  });

  describe.skip('Tree', () => {
    // I don't currently have time to get this working fully - I shall come back to it!
    it('Should set values on a tree field', async () => {
      createTree();
      const field = $('#treeDom');
      const values = [3, 4];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      const tree = field.find('.jstree');
      console.log(tree.jstree().get_json());
    });

    it('Should error when invalid data is passed in to tree field', async () => {
      createTree();
      const field = $('#treeDom');
      const values = ['invalid'];
      await expect(setFieldValues(field, values)).rejects.toEqual('Unknown value key for tree');
    });
  });

  describe('Date range', () => {
    it('Should set values on a date range field', async () => {
      createMultiValueDateRangeInputs();
      const field = $('#daterangeDom');
      const values = [{ from: '2021-01-01', to: '2021-01-02' }];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      const from = $('.input--from').find('input');
      const to = $('.input--to').find('input');
      expect(from.val()).toEqual('2021-01-01');
      expect(to.val()).toEqual('2021-01-02');
    });
  });

  describe('Date', () => {
    it('Should set values on a date field with multiple values', async () => {
      createDateInput();
      const field = $('#dateField');
      const values = ['2021-01-01'];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      const input = field.find('input');
      expect(input.val()).toEqual('2021-01-01');
    });

    it('Should set value on a date field with single value', async () => {
      createDateInput();
      const field = $('#dateField');
      field.data('is-multivalue', undefined);
      const values = ['2021-01-01'];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      const input = field.find('input');
      expect(input.val()).toEqual('2021-01-01');
    });
  });

  describe('String', () => {
    it('Should set value on a string field with multiple values', async () => {
      createMultiValueText();
      const field = $('#textField');
      const values = ['value1', 'value2'];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      const input = field.find('input');
      input.each((i, el) => {
        expect($(el).val()).toEqual(`value${i + 1}`);
      });
    });

    it('Should set value on a string field with single value', async () => {
      createSingleValueText();
      const field = $('#textField');
      const values = ['value1'];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      const input = field.find('input');
      expect(input.val()).toEqual('value1');
    });
  });

  describe('Intgr', () => {
    it('Should set value on an integer field with multiple values', async () => {
      createMultiValueNumber();
      const field = $('#numberField');
      const values = [1, 2];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      const input = field.find('input');
      input.each((i, el) => {
        expect($(el).val()).toEqual(`${i + 1}`);
      });
    });

    it('Should set value on an integer field with single value', async () => {
      createSingleValueNumber();
      const field = $('#numberField');
      const values = [1];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      const input = field.find('input');
      expect(input.val()).toEqual('1');
    });
  });

  describe('File', () => {
    it('Should set a value on a file field', async () => {
      createFile();
      const field = $('#fileField');
      const values = [{ id: 1, filename: 'file.txt' }];
      await expect(setFieldValues(field, values)).resolves.toBeUndefined();
      const input = field.find('input[type=checkbox]');
      expect(input.data('filename')).toEqual('file.txt');
    });
  });
});
