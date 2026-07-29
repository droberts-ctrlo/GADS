import DataTable, { Api } from 'datatables.net-bs5';

const searchPlugin = (settings: any, opts: object) => {
    for(const i in opts) {
        if(parseInt(opts[i]) === 1) {
            opts[i] = true;
        } else if(parseInt(opts[i]) === 0) {
            opts[i] = false;
        }
    }

    const options = Object.assign({ showAll: true, hideLabels: false }, opts);

    const selectOptions = [];

    if (options.showAll) {
        selectOptions.push({ name: 'All (can be slow)', value: '__all' });
    }

    const items = settings['aoColumns'].map((c: any) => { return { name: c.title, value: c.data }; });
    const language = settings['oLanguage'];

    selectOptions.push(...items);

    const input = buildInput('searchInput', language.sSearch ?? 'Search table:', language.sSearchPlaceholder ?? 'Type to search...', options.hideLabels);
    const select = buildSelect('searchColumn', 'Search Column', options.hideLabels, ...selectOptions);
    const button = buildButton('searchButton', 'Search', 'btn', 'btn-sm', 'btn-primary');

    const group = buildInputGroup(input.label, input.input, select.label, select.select, button);

    const container = document.createElement('div');
    container.className = 'dt-custom-search';
    container.appendChild(group);

    createEvent(settings.api, input.input, select.select, button);

    return container;
};

const createEvent = (api: Api, input: HTMLInputElement, select: HTMLSelectElement, button: HTMLButtonElement) => {
    button.addEventListener('click', (ev) => {
        if (input.value) {
            if (select.value === '__all') {
                ev.preventDefault();
                clearSearch(api).search(input.value).draw();
            } else {
                ev.preventDefault();
                clearSearch(api).search.fixed('mySearch', (row, data) => {
                    return data[select.value].toString().toLowerCase().includes(input.value.toLowerCase());
                }).draw();
            }
        } else {
            clearSearch(api).draw();
        }
    });
};

const clearSearch = (api: Api) => {
    api.search.fixed('mySearch', null);
    return api.search('');
};

const buildButton = (id: string, text: string, ...classNames: string[]): HTMLButtonElement => {
    const button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    button.className = classNames.join(' ');
    return button;
};

const buildInputGroup = (...items: Node[]): HTMLDivElement => {
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    items.forEach(item => inputGroup.appendChild(item));
    return inputGroup;
};

const buildSelect = (id: string, labelText: string, hideLabel: boolean = false, ...options: { name: string, value: string }[]): { label: HTMLLabelElement, select: HTMLSelectElement } => {
    const label = buildLabel(labelText, id, hideLabel);

    const select = document.createElement('select');
    select.className = 'form-select-sm';
    select.id = id;

    for (const option of options) {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.name;
        select.appendChild(optionElement);
    }

    return { label, select };
};

const buildInput = (id: string, labelText: string, placeholder: string, hideLabel: boolean = false): { label: HTMLLabelElement, input: HTMLInputElement } => {
    const label = buildLabel(labelText, id, hideLabel);

    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.placeholder = placeholder;
    input.className = 'form-control-sm';

    return { label, input };
};

const buildLabel = (text: string, target: string, hidden:boolean = false): HTMLLabelElement => {
    const label = document.createElement('label');
    label.htmlFor = target;
    label.textContent = text;
    if(hidden) label.className = 'visually-hidden';
    return label;
};

DataTable.feature.register('filteredSearch', searchPlugin);
