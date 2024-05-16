import {ChartConfiguration, ChartTypeRegistry} from "chart.js";

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
  private dataSets?: {label: string, data: any[]}[]; // I would love to strongly type this, but because ChartJS is such a mess, I can't

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
  async build():Promise<ChartConfiguration> {
    if (!this.chartType) throw new Error("Chart type is required");
    if (!this.xLabels || !this.labels || this.xLabels.length==0 || this.labels.length==0) throw new Error("Either XLabels or Labels are required");
    if(!this.dataSets || this.dataSets.length==0) throw new Error("At least one dataset is required");
    return {
      data: {
        xLabels: this.xLabels,
        yLabels: this.yLabels,
        labels: this.labels || this.xLabels,
        datasets: this.dataSets,
      },
      type: this.chartType,
      options: {
        plugins: {
          legend: {
            display: this.chartType !== "line",
          },
          title: {
            display: !!this.title,
            text: this.title,
          },
        },
      },
    };
  }
}

export default ChartConfigurationBuilder;
