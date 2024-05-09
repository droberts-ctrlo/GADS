import {Chart} from "chart.js";
import {ChartRegistry} from "./ChartRegistry";

interface Dataset {
    label: string;
    color?: string;
    data: number[];
}

function mapToDataset(plotData, chartType): Dataset[] {
    if (chartType !== 'pie' && chartType !== 'doughnut') {
        const dataset = plotData.labels.map((labelData) => ({
            label: labelData.label,
            color: labelData.color,
            data: []
        }));
        for (let i = 0; i < plotData.points.length; i++) {
            dataset[i].data = plotData.points[i];
        }
        return dataset;
    } else {
        const labels = plotData.labels || [];
        return plotData.points.map((points, i) => {
            return {
                label: labels[i] || '',
                data: points.map(point => point[1])
            };
        });
    }
}

// DRY: This function was duplicated in src/frontend/components/graph/lib/component.ts
export const do_plot = async (plotData, options_in, container) => {
    options_in.type==="donut" && (options_in.type="doughnut");
    await ChartRegistry.register(options_in.type)
    const datasets = mapToDataset(plotData, options_in.type);
    const config = {
        type: options_in.type,
        data: {
            labels: plotData.xlabels,
            datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: options_in.showlegend
                }
            }
        }
    }
    return new Chart(container, config);
}

// At the moment, do_plot_json needs to be exported globally, as it is used by
// Phantomjs to produce PNG versions of the graphs. Once jqplot has been
// replaced by a more modern graphing library, the PNG/Phantomjs functionality
// will probably unneccessary if that functionality is built into the library.
export const do_plot_json = async (plotData: string, options_in: string, canvas: HTMLCanvasElement) => {
    const d = JSON.parse(atob(plotData))
    d.type==="donut" && (d.type="doughnut");
    const o = JSON.parse(atob(options_in))
    return await do_plot(d, o, canvas || document.createElement('canvas'));
}
