import {ChartConfiguration, ChartTypeRegistry} from "chart.js";

class ChartConfigurationBuilder {
  private chartType?: keyof ChartTypeRegistry;
  private xLabels?: string[];
  private yLabels?: string[];
  private labels?: string[];
  private title?: string;
  private dataSets?: {label: string, data: any[]}[]; // I would love to strongly type this, but because ChartJS is such a mess, I can't

  setChartType(chartType: string | keyof ChartTypeRegistry) {
    chartType as string && chartType === "donut" && (chartType = "doughnut");
    this.chartType = chartType as keyof ChartTypeRegistry;
    return this;
  }

  setXLabels(...labels: string[]) {
    !this.xLabels && (this.xLabels = []);
    this.xLabels = labels;
    return this;
  }

  setYLabels(...labels: string[]) {
    !this.yLabels && (this.yLabels = []);
    this.yLabels = labels;
    return this;
  }

  setLabels(...labels: string[]) {
    !this.labels && (this.labels = []);
    this.labels = labels;
    return this;
  }

  setTitle(title?: string) {
    this.title = title;
    return this;
  }

  addDataSet(dataSet: any) {
    !this.dataSets && (this.dataSets = []);
    this.dataSets.push(dataSet);
    return this;
  }

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
