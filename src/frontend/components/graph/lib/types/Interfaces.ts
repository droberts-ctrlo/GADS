import {Chart, ChartOptions} from "chart.js";

/**
 * @interface ChartAction
 * @description Interface for the actions that can be added to the chart
 * @property {string} label - The label of the action
 * @property {(chart: Chart) => void} action - The action to be performed
 */
export interface ChartAction {
    label: string;
    action: (chart: Chart) => void;
}

/**
 * @interface PlotData
 * @description Interface for the data that is passed to the graph component
 * @property {ChartOptions} options - The options for the chart
 * @property {any[][][]} points - The points to be plotted
 * @property {string[]} xlabels - The labels for the x-axis
 * @property {string[]} labels - The labels for the data
 */
export interface PlotData {
    options?: ChartOptions;
    points: any[][][];
    xlabels: string[];
    labels?: (string | {label: string, color: string})[]
}

/**
 * @interface Data
 * @description Interface for the data object that is passed to the graph component
 * @property {string[]} labels - The labels for the data
 * @property {Dataset[]} datasets - The datasets to be plotted
 */
export interface Data {
    labels: string[];
    datasets: Dataset[];
}

/**
 * @interface Dataset
 * @description Interface for the dataset object that is passed to the graph component
 * @property {string} label - The label for the dataset
 * @property {number[]} data - The data to be plotted
 */
export interface Dataset {
    label?: string;
    data: number[];
}

/**
 * @interface OptionsIn
 * @description Interface for the options object that is passed to the graph component
 * @property {boolean} showlegend - Whether to show the legend
 * @property {string} type - The type of graph to render
 * @property {string} x_axis_name - The name of the x-axis
 * @property {string} y_axis_label - The label of the y-axis
 * @property {boolean} stackseries - Whether to stack the series
 * @property {string | number} id - The id of the graph
 */
export interface OptionsIn {
    showlegend: boolean;
    type: string;
    x_axis_name: string;
    y_axis_label: string;
    stackseries: boolean;
    id: string | number;
}
