import initDateField from "../../../datepicker/lib/helper";
import { InputComponentLike } from "./helpers";

export default class DateComponent implements InputComponentLike {
    readonly type = 'date';
    el: JQuery<HTMLElement>;
    input: JQuery<HTMLInputElement>;

    constructor(el: JQuery<HTMLElement> | HTMLElement) {
        this.el = el instanceof HTMLElement ? $(el) : el;
        this.input = this.el.find<HTMLInputElement>('.form-control');
    }

    init() {
        initDateField(this.input);
    }
}
