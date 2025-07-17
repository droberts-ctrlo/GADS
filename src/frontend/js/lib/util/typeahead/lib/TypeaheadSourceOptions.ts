import { MapperFunction } from 'util/mapper/mapper';

/**
 * TypeaheadSourceOptions interface for Typeahead class
 * @param name - name of the typeahead data source
 * @param ajaxSource - url to the ajax source
 * @param appendQuery - whether to append the query to the ajax source url
 * @param data - data to be sent with the ajax request (if any)
 * @param dataBuilder - builder to mutate the data returned
 * @param method - Request method to use (either 'GET' or 'POST')
 */
export class TypeaheadSourceOptions {
    constructor(
        public name: string,
        public ajaxSource: string,
        public mapper: MapperFunction,
        public appendQuery: boolean,
        public data: any,
        public dataBuilder: (...args: any[]) => any,
        public method: 'GET' | 'POST' = 'GET') {
    }
}
