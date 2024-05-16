import ConfigBuilder from "../Config/ChartConfigurationBuilder";
import { ChartAction, registerActions } from "../Actions/Actions";
import ChartRegistry from "../Registry/ChartRegistry";
import { Chart } from "chart.js";

async function render(chartConfigBuilder: ConfigBuilder, container: HTMLCanvasElement, actionParentElement?: JQuery<HTMLElement>, ...actions: ChartAction[]) {
  return await new ChartRenderer().render(chartConfigBuilder, container, actionParentElement, ...actions);
}

class ChartRenderer {
  private chart?: Chart;

  async render(chartConfigBuilder: ConfigBuilder, container: HTMLCanvasElement, actionParentElement?: JQuery<HTMLElement>, ...actions: ChartAction[]) {
    const config = await chartConfigBuilder.build()
    const Chart = await ChartRegistry.register(config.type);
    const result = new Chart(container, config);
    if (actions && actions.length && !actionParentElement) throw new Error("Action parent element is required when actions are provided");
    registerActions(result, actionParentElement!, ...actions)
    this.chart = result;
    return result;
  }

  updateTitle(title?: string) {
    const chart = this.chart!;
    chart.options.plugins.title.text = title;
    chart.options.plugins.title.display = !!title;
    chart.update();
  }
}

export { render, ChartRenderer }
