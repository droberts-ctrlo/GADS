import ConfigBuilder from "../Config/ChartConfigurationBuilder";
import { ChartAction, registerActions } from "../Actions/Actions";
import ChartRegistry from "../Registry/ChartRegistry";
import { transparentize } from "util/colours/modifiers";
import { Chart } from "chart.js";
import { generateColours } from "util/colours/generator";

/**
 * @function render
 * @description Render a chart given the configuration and container along with any optional actions - helper function @see ChartRenderer.render
 * @param chartConfigBuilder The ConfigurationBuilder instance to use to create the chart
 * @param container The container to render the chart to
 * @param actions Any actions to attach to the chart
 * @returns The chart instance
 */
async function render(chartConfigBuilder: ConfigBuilder, container: HTMLCanvasElement, ...actions: ChartAction[]) {
  return await new ChartRenderer().render(chartConfigBuilder, container, ...actions);
}

/**
 * @class ChartRenderer
 * @description A class to render a chart to the DOM - this is for when you want the chart to perform more dynamic actions
 */
class ChartRenderer {
  private chart?: Chart;
  private extensionObject: any = {};
  get rebuildRequired() {
    return Object.keys(this.extensionObject).length > 0;
  }

  private colours = generateColours(100);

  /**
   * @method render
   * @description Render a chart given the configuration and container along with any optional actions
   * @param chartConfigBuilder The ConfigurationBuilder instance to use to create the chart
   * @param container The container to render the chart to
   * @param actions Any actions to attach to the chart
   * @returns The chart instance
   */
  async render(chartConfigBuilder: ConfigBuilder, container: HTMLCanvasElement, ...actions: ChartAction[]) {
    const config = chartConfigBuilder.build();
    if (config.type !== "line") {
      config.data.datasets[0].borderWidth = 1;
      config.data.datasets[0].borderColor = this.colours;
      config.data.datasets[0].backgroundColor = transparentize(...this.colours);
    }
    const Chart = await ChartRegistry.register(config.type);
    const result = new Chart(container, config);
    const row = registerActions(result, ...actions);
    this.chart = result;
    $(window).on('resize', () => result.update());
    return { chart: result, row };
  }

  /**
   * @method updateTitle
   * @description Update the title of the chart
   * @param title The title to update the chart with
   */
  updateTitle(title?: string) {
    const chart = this.chart!;
    if (title === chart.options.plugins.title.text) return;
    chart.options.plugins.title.text = title;
    chart.options.plugins.title.display = !!title;
  }

  /**
   * @method updateType
   * @description Update the type of the chart
   * @param type The type to update the chart to
   */
  updateType(type: string | keyof ChartRegistry) {
    if (type as string === 'donut') type = 'doughnut';
    this.extensionObject.type = type;
  }

  updateDataset(id: number, data: any) {
    const chart = this.chart!
    const dataset = chart.data.datasets[id];
    if (Array.isArray(data)) {
      dataset.data = data;
    } else {
      for (const key in data) {
        dataset[key] = data[key];
      }
    }
  }

  /**
   * @method reload
   * @description Reload the chart
   */
  async reload() {
    if (this.rebuildRequired) {
      const config = $.extend(this.chart.config, this.extensionObject);
      const canvas = this.chart.canvas;
      this.chart.destroy();
      const chart = await ChartRegistry.register(config.type);
      this.chart = new chart(canvas, config);
      this.extensionObject = {};
    }
    else this.chart?.update();
    return this;
  }
}

export { render, ChartRenderer }
