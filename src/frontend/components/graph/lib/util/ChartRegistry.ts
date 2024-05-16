/**
 * This class is used to register the different types of charts that we want to use in our application.
 * This is necessary because we are using dynamic imports to load the chart.js library.
 * Most code should be ROC, and isn't documented here.
 */
export default class ChartRegistry {
    private static registeredTypes = [];

    /**
     * Register a chart
     * @param type The type of chart to register - currently we support bar, line, scatter, pie, and doughnut
     */
    static async register(type: string) {
        if (ChartRegistry.registeredTypes.includes(type)) {
            return;
        }
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
        return Chart;
    }

    private static async registerDoughnut() {
        const { DoughnutController, ArcElement, Legend } = await import(/* webpackChunkName: "chartjs" */ "chart.js");
        const Chart = await this.registerCommon();
        Chart.register(DoughnutController, ArcElement, Legend);
        return Chart;
    }

    private static async registerScatter() {
        const { ScatterController, LinearScale, PointElement, Legend } = await import(/* webpackChunkName: "chartjs" */ "chart.js");
        const Chart = await this.registerCommon();
        Chart.register(ScatterController, LinearScale, PointElement, Legend)
        return Chart;
    }

    private static async registerBar() {
        const { BarController, CategoryScale, LinearScale, BarElement, Legend} = await import(/* webpackChunkName: "chartjs" */ "chart.js")
        const Chart = await this.registerCommon();
        Chart.register(BarController, Legend, CategoryScale, LinearScale, BarElement)
        return Chart;
    }

    private static async registerLine() {
        const { LineController, CategoryScale, LinearScale, PointElement, LineElement } = await import(/* webpackChunkName: "chartjs" */ "chart.js")
        const Chart = await this.registerCommon();
        Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);
        return Chart;
    }
}
