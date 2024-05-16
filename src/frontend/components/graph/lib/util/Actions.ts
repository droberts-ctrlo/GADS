import {ChartAction} from "../types/Interfaces";

/**
 * Register actions for the chart and render controls as appropriate
 * @param chart The chart these actions will be added to
 * @param actions The actions to be added to the chart
 */
export function registerActions(chart, ...actions: ChartAction[]) {
    //TODO: Add handler for higher number of actions - currently only supports up to 4 without looking like garbage - dropdown?
    if (!actions) return;
    let col = $(chart.canvas.parentElement).closest(".graph").find(".chart__actions");
    if(!col || !col.length) {
        col=$(chart.canvas.parentElement).closest(".card__body").find(".chart__actions");
        if(!col || !col.length) throw "No chart actions found";
    }
    actions.forEach((action) => {
        const button = createActionHtml(chart, action)
        col && col[0] && col[0].appendChild(button) || console.error("No chart actions found");
    });
}

/**
 * Create the HTML for an action button
 * @param chart The chart to add the action to
 * @param param1 Decomposed ChartAction object to be added to the DOM
 * @returns A button to add to the DOM with all the appropriate event listeners
 */
function createActionHtml(chart, {label, action}: ChartAction) {
    const button = document.createElement('button');
    button.textContent = label;
    button.classList.add('btn')
    button.classList.add('btn-small')
    button.classList.add('btn-primary')
    button.addEventListener('click', () => action(chart));
    return button
}
