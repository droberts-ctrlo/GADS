import {Chart, ChartTypeRegistry} from "chart.js";

export default class ChartRegistry {
  private static RegisteredTypes = new Map<keyof ChartTypeRegistry, typeof Chart>();

  static async register(type: keyof ChartTypeRegistry): Promise<typeof Chart> {
    if(this.RegisteredTypes.has(type)) return this.RegisteredTypes.get(type)!;
    switch (type) {
      case "bar":
        return await ChartRegistry.registerBar();
      case "line":
        return await ChartRegistry.registerLine();
      case "scatter":
        return await ChartRegistry.registerScatter();
      case "pie":
        return await ChartRegistry.registerPie();
      case "doughnut":
        return await ChartRegistry.registerDoughnut();
      // Just in case we want others later down the line
      case "bubble":
      case "polarArea":
      case "radar":
      default:
        throw new Error(`Unknown or incompatible chart type: ${type}`);
    }
  }

  private static async registerCommon() {
    const { Chart, Colors, Tooltip, Title } = await import(/* webpackChunkName: "chartjs" */ "chart.js");
    Chart.register(Colors, Tooltip, Title);
    return Chart;
  }

  private static async registerPie() {
    const { PieController, ArcElement, Legend } = await import(/* webpackChunkName: "chartjs" */ "chart.js");
    const Chart = await this.registerCommon();
    Chart.register(PieController, ArcElement, Legend);
    ChartRegistry.RegisteredTypes.set("pie", Chart);
    return Chart;
  }

  private static async registerDoughnut() {
    const { DoughnutController, ArcElement, Legend } = await import(/* webpackChunkName: "chartjs" */ "chart.js");
    const Chart = await this.registerCommon();
    Chart.register(DoughnutController, ArcElement, Legend);
    ChartRegistry.RegisteredTypes.set("doughnut", Chart);
    return Chart;
  }

  private static async registerScatter() {
    const { ScatterController, LinearScale, PointElement, Legend } = await import(/* webpackChunkName: "chartjs" */ "chart.js");
    const Chart = await this.registerCommon();
    Chart.register(ScatterController, LinearScale, PointElement, Legend)
    ChartRegistry.RegisteredTypes.set("scatter", Chart);
    return Chart;
  }

  private static async registerBar() {
    const { BarController, CategoryScale, LinearScale, BarElement, Legend } = await import(/* webpackChunkName: "chartjs" */ "chart.js")
    const Chart = await this.registerCommon();
    Chart.register(BarController, Legend, CategoryScale, LinearScale, BarElement)
    ChartRegistry.RegisteredTypes.set("bar", Chart);
    return Chart;
  }

  private static async registerLine() {
    const { LineController, CategoryScale, LinearScale, PointElement, LineElement } = await import(/* webpackChunkName: "chartjs" */ "chart.js")
    const Chart = await this.registerCommon();
    Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);
    ChartRegistry.RegisteredTypes.set("line", Chart);
    return Chart;
  }
}
