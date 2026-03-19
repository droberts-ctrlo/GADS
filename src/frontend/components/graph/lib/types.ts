import { ChartType } from 'chart.js';

export interface OptionsIn {
    type: ChartType;
    x_axis_name: string;
    y_axis_label: string;
    stackseries: boolean;
    id: number|string
}

interface MarkerOptions {
    size: number,
    style: string,
}

interface LabelData {
    markeroptions: MarkerOptions;
    showLabel: boolean;
    showLine: boolean;
    color: string;
    label: string;
}

export interface PlotData {
    labels: LabelData[];
    points: number[][];
    xlabels: string[];
}

/**
 * Map the plot data to a format that chart.js can use
 * @param plotData The plot data to map
 * @returns A transformed datum for chart.js to use
 */
export function mapToDataset(plotData: PlotData): {label: string, color:string, data: number[]}[]{
    const dataset = plotData.labels.map((labelData) => ({
        label: labelData.label,
        color: labelData.color,
        data: []
    }));
    for(let i = 0; i < plotData.points.length; i++) {
        dataset[i].data = plotData.points[i];
    }
    return dataset;
}
