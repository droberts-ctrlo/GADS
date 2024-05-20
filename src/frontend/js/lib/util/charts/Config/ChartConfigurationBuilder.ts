import { ChartConfiguration, ChartTypeRegistry } from "chart.js";

/**
 * @class ChartConfigurationBuilder
 * @description A class to build a chart configuration object
 */
class ChartConfigurationBuilder {
  private chartType?: keyof ChartTypeRegistry;
  private xLabels?: string[];
  private yLabels?: string[];
  private labels?: string[];
  private title?: string;
  private dataSets?: { label: string, data: any[] }[]; // I would love to strongly type this, but because ChartJS is such a mess, I can't

  /**
   * Set the type of chart to render
   * @param chartType The type of chart to render
   * @returns The ChartConfigurationBuilder instance
   */
  setChartType(chartType: string | keyof ChartTypeRegistry) {
    chartType as string && chartType === "donut" && (chartType = "doughnut");
    this.chartType = chartType as keyof ChartTypeRegistry;
    return this;
  }

  /**
   * Set the x-axis labels for the chart
   * @param labels The labels to add to the chart
   * @returns The ChartConfigurationBuilder instance
   */
  setXLabels(...labels: string[]) {
    !this.xLabels && (this.xLabels = []);
    this.xLabels = labels;
    return this;
  }

  /**
   * Set the y-axis labels for the chart
   * @param labels The labels to add to the chart
   * @returns The ChartConfigurationBuilder instance
   */
  setYLabels(...labels: string[]) {
    !this.yLabels && (this.yLabels = []);
    this.yLabels = labels;
    return this;
  }

  /**
   * Set the labels for the chart
   * @param labels The labels to add to the chart
   * @returns The ChartConfigurationBuilder instance
   */
  setLabels(...labels: string[]) {
    !this.labels && (this.labels = []);
    this.labels = labels;
    return this;
  }

  /**
   * Set the title for the chart
   * @param title The title to use - if this is not set, the title will not be displayed
   * @returns The ChartConfigurationBuilder instance
   */
  setTitle(title?: string) {
    this.title = title;
    return this;
  }

  /**
   * Add a dataset to the chart
   * @param dataSet The dataset to add to the chart
   * @returns The ChartConfigurationBuilder instance
   */
  addDataSet(dataSet: any) {
    !this.dataSets && (this.dataSets = []);
    this.dataSets.push(dataSet);
    return this;
  }

  /**
   * Build the configuration object
   * @returns The ChartConfiguration object
   */
  build(): ChartConfiguration {
    if (!this.chartType) throw new Error("Chart type is required");
    if (!this.xLabels || !this.labels || this.xLabels.length == 0 || this.labels.length == 0) throw new Error("Either XLabels or Labels are required");
    if (!this.dataSets || this.dataSets.length == 0) throw new Error("At least one dataset is required");
    const result: any = {}
    result.data = {};
    result.data.labels = this.labels || this.xLabels;
    result.data.datasets = this.dataSets;
    result.type = this.chartType;
    result.options = {};
    result.options.plugins = {};
    result.options.plugins.legend = {};
    result.options.plugins.legend.display = this.chartType !== "line" && this.chartType !== "bar";

    if (this.title) {
      result.options.plugins.title = {};
      result.options.plugins.title.text = this.title;
      result.options.plugins.title.display = !!this.title;
    }
    if (this.xLabels) result.data.xLabels = this.xLabels;
    if (this.yLabels && this.yLabels[0] && this.yLabels[0]!="") result.data.yLabels = this.yLabels;

    return result as ChartConfiguration;
  }
}

export default ChartConfigurationBuilder;
