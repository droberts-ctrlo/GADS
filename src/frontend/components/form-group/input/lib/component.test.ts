import {describe, it, expect} from '@jest/globals';
import {InputComponentLike, initComponent} from './helpers';
import "../../../../testing/globals.definitions";

class TestComponent implements InputComponentLike {
    readonly type: string;
    el: JQuery<HTMLElement>;

    constructor(element: HTMLElement | JQuery<HTMLElement>) {
        this.el = $(element);
    }

    init(): void {
        this.el.text('Hello World');
    }

}

describe('Basic component tests', ()=>{
    it('should create a new instance of a component', ()=>{
        const element = document.createElement('div');
        const el = initComponent(TestComponent, element);
        expect(element.textContent).toBe('Hello World');
        expect(el["component"]).toBeInstanceOf(TestComponent);
    })
})
