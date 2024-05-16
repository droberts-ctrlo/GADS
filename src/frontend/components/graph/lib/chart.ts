import { ChartConfiguration, ChartTypeRegistry} from "chart.js";
import ChartRegistry from "./util/ChartRegistry";
import mapToDataset from "./util/Mappers";
import {ChartAction, OptionsIn, PlotData} from "./types/Interfaces";
import {registerActions} from "./util/Actions";

/**
 * Create the chart using the specified options and data
 * @param plotData The data to be plotted
 * @param options_in The options for the plot
 * @param container The canvas element to render the plot to
 * @param actions Any actions to be added to the plot
 */
export default async function do_plot(plotData: PlotData, options_in: OptionsIn, container: HTMLCanvasElement, ...actions:ChartAction[]) {
    options_in.type === "donut" && (options_in.type = "doughnut");
    const Chart = await ChartRegistry.register(options_in.type)
    const datasets = mapToDataset(plotData, options_in.type);
    const config: ChartConfiguration = {
        type: options_in.type as keyof ChartTypeRegistry,
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
    console.log("config", config);
    const chart = new Chart(container, config);
    registerActions(chart, ...actions);
    return chart;
}
