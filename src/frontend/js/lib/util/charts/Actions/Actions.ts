import { Chart } from "chart.js";

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
function registerActions(chart: Chart, actionTarget: JQuery<HTMLElement>, ...actions: ChartAction[]) {
    if (!actions) return;
    actions.forEach((action) => {
        const button = createActionHtml(chart, action);
        actionTarget[0].appendChild(button);
    });
}

/**
 * Create the HTML for an action button
 * @param chart The chart to add the action to
 * @param param1 Decomposed ChartAction object to be added to the DOM
 * @returns A button to add to the DOM with all the appropriate event listeners
 */
function createActionHtml(chart: Chart, { label, action, classes }: ChartAction) {
    const button = document.createElement('button');
    button.textContent = label;
    classes && classes.length && button.classList.add(...classes);
    button.addEventListener('click', () => action(chart));
    return button;
}

export { ChartAction, registerActions };
