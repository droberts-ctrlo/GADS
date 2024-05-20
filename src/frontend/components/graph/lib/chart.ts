import { ChartAction } from "util/charts/Actions/Actions";
import mapToDataset from "./util/Mappers";
import { ChartConfigurationBuilder, ChartRenderer } from "util/charts";
import { OptionsIn, PlotData } from "./types/Interfaces";

/**
 * Create the chart using the specified options and data
 * @param plotData The data to be plotted
 * @param options_in The options for the plot
 * @param container The canvas element to render the plot to
 * @param actions Any actions to be added to the plot
 */
export default async function do_plot(plotData: PlotData, options_in: OptionsIn, container: HTMLCanvasElement, actionTarget?: JQuery<HTMLElement>, ...actions: ChartAction[]) {
    options_in.type === "donut" && (options_in.type = "doughnut");
    const datasets = mapToDataset(plotData, options_in.type);
    const configBuilder = new ChartConfigurationBuilder();
    configBuilder.setChartType(options_in.type);
    configBuilder.setLabels(...plotData.xlabels);
    configBuilder.setXLabels(...plotData.xlabels);
    configBuilder.setYLabels(options_in.y_axis_label);
    configBuilder.addDataSet(datasets);
    const renderer = new ChartRenderer();
    const { chart, row } = await renderer.render(configBuilder, container, ...actions);
    if (actionTarget && actionTarget.length) {
        actionTarget.append(row);
    } else {
        chart.canvas.parentElement?.appendChild(row);
    }
    return renderer;
}
