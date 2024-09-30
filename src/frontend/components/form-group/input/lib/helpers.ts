export interface InputComponentLike {
    get el(): JQuery<HTMLElement>;
    init(): void;
    get type(): string;
}

export function initComponent(component: new (element: HTMLElement|JQuery<HTMLElement>) => InputComponentLike & { init: () => void }, element: HTMLElement): JQuery<HTMLElement> {
    const result = new component(element);
    result.init();
    result.el["component"] = result;
    return result.el;
}
