/**
 * Toggles (switches) all fields from the source toggle table to the destination toggle table
 * @param {JQuery<HTMLElement>} element The button element
 */
export function createToggleAllFieldsButton(element: JQuery<HTMLElement>) {
    element.on('click', (ev) => {
        ev.preventDefault();
        const sourceTableId = $(ev.target).data('toggleSource');
        const clickedSourceTable = document.querySelector(sourceTableId);
        const destinationTableID = $(ev.target).data('toggleDestination');
        const rows = $(sourceTableId).find('tbody tr');
        import(/* webpackChunkName: "datatable-toggle-table" */ '../../data-table/lib/toggle-table.js')
            .then(({ toggleRowInTable }) => {
                rows.each((index, row) => {
                    toggleRowInTable(<HTMLTableRowElement>row, clickedSourceTable, destinationTableID, true);
                });
            });
    });
}
