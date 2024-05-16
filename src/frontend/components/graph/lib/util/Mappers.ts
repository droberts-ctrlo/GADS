import { PlotData } from "../types/Interfaces";

/**
 * @interface Dataset
 * @description Interface for the dataset object that is passed to the graph component
 * @property {string} label - The label for the dataset
 * @property {string} color - The color for the dataset - optional
 * @property {number[]} data - The data for the dataset
 */
interface Dataset {
    label: string;
    color?: string;
    data: number[];
}

/**
 * Map the plot data to the datasets for the chart
 * @param plotData The data to map to the returned datasets
 * @param chartType The type of chart being rendered
 * @returns An array of datasets to be rendered on the chart
 */
export default function mapToDataset(plotData: PlotData, chartType: string): Dataset[] {
    if (chartType !== 'pie' && chartType !== 'doughnut') {
        const dataset = plotData.labels.map((labelData: { label: string, color: string }) => ({
            label: labelData.label,
            color: labelData.color,
            data: []
        }));
        for (let i = 0; i < plotData.points.length; i++) {
            dataset[i].data = plotData.points[i];
        }
        return dataset;
    } else {
        const labels = plotData.labels.map((label: string) => label) || [];
        return plotData.points.map((points: any[], i: number) => {
            return {
                label: labels[i] || '',
                data: points.map(point => point[1])
            };
        });
    }
}
