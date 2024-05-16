import ConfigBuilder from "../Config/ChartConfigurationBuilder";
import { ChartAction, registerActions } from "../Actions/Actions";
import ChartRegistry from "../Registry/ChartRegistry";
import { Chart } from "chart.js";

/**
 * Render a chart given the configuration and container along with any optional actions - helper function @see ChartRenderer.render
 * @param chartConfigBuilder The ConfigurationBuilder instance to use to create the chart
 * @param container The container to render the chart to
 * @param actionParentElement The element to attach the actions to - this can be null if no actions are provided
 * @param actions Any actions to attach to the chart
 * @returns The chart instance
 */
async function render(chartConfigBuilder: ConfigBuilder, container: HTMLCanvasElement, actionParentElement?: HTMLElement, ...actions: ChartAction[]) {
  return await new ChartRenderer().render(chartConfigBuilder, container, actionParentElement, ...actions);
}

/**
 * @class ChartRenderer
 * @description A class to render a chart to the DOM - this is for when you want the chart to perfom more dynamic actions
 */
class ChartRenderer {
  private chart?: Chart;

  /**
   * Render a chart given the configuration and container along with any optional actions
   * @param chartConfigBuilder The ConfigurationBuilder instance to use to create the chart
   * @param container The container to render the chart to
   * @param actionParentElement The element to attach the actions to - this can be null if no actions are provided
   * @param actions Any actions to attach to the chart
   * @returns The chart instance
   */
  async render(chartConfigBuilder: ConfigBuilder, container: HTMLCanvasElement, actionParentElement?: HTMLElement, ...actions: ChartAction[]) {
    const config = await chartConfigBuilder.build()
    const Chart = await ChartRegistry.register(config.type);
    const result = new Chart(container, config);
    if (actions && actions.length && (!actionParentElement || actionParentElement[0])) throw new Error("Action parent element is required when actions are provided");
    if(actionParentElement[0] && actions.length) {
      registerActions(result, actionParentElement[0], ...actions)
    }
    this.chart = result;
    return result;
  }

  /**
   * Update the title of the chart
   * @param title The title to update the chart with
   */
  updateTitle(title?: string) {
    const chart = this.chart!;
    chart.options.plugins.title.text = title;
    chart.options.plugins.title.display = !!title;
    chart.update();
  }
}

export { render, ChartRenderer }
