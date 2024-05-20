import { Chart } from "chart.js";

/**
 * @interface ChartAction
 * @description An action that can be performed on a chart
 * @property label The label to be displayed on the button
 * @property action The action to be performed when the button is clicked
 */
interface ChartAction {
    label: string;
    action: (chart: Chart) => void;
    classes?: string[];
}

/**
 * Register actions for the chart and render controls as appropriate
 * @param chart The chart these actions will be added to
 * @param actionTarget Target element in the DOM to hold the actions
 * @param actions The actions to be added to the chart
 */
function registerActions(chart: Chart, ...actions: ChartAction[]) {
    if (!actions) return;
    const row = document.createElement("div");
    row.classList.add("row");
    actions.forEach((action) => row.appendChild(createActionHtml(chart, action)));
    return row;
}

/**
 * Create the HTML for an action button
 * @param chart The chart to add the action to
 * @param param1 Decomposed ChartAction object to be added to the DOM
 * @returns A button to add to the DOM with all the appropriate event listeners
 */
function createActionHtml(chart: Chart, { label, action, classes }: ChartAction) {
    const col = document.createElement("div");
    col.classList.add("col");
    const button = document.createElement("button");
    classes && classes.forEach((value) => button.classList.add(value));
    button.innerText = label;
    button.addEventListener("click", (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        action(chart);
    });
    col.appendChild(button);
    return col;
}

export { ChartAction, registerActions };
