export class ChartRegistry {
    static registeredTypes = [];

    static async register(type:string) {
        if (ChartRegistry.registeredTypes.includes(type)) {
            return;
        }
        switch (type) {
            case "bar":
                await ChartRegistry.registerBar();
                break;
            case "line":
                await ChartRegistry.registerLine();
                break;
            case "scatter":
                await ChartRegistry.registerScatter();
                break;
            case "pie":
                await ChartRegistry.registerPie();
                break;
            case "doughnut":
                await ChartRegistry.registerDoughnut();
                break;
            // Just in case we want others later down the line
            case "bubble":
            case "polarArea":
            case "radar":
            default:
                throw new Error(`Unknown or incompatible chart type: ${type}`);
        }
    }

    private static async registerPie() {
        return import(/* webpackChunkName: "chartjs" */ "chart.js")
            .then(({
                       Chart,
                       PieController,
                       ArcElement,
                       Legend,
                       Colors
                   }) => {
                Chart.register(PieController, ArcElement, Legend, Colors);
            }).then(() => {
                ChartRegistry.registeredTypes.push("pie");
            });
    }

    private static async registerDoughnut() {
        return import(/* webpackChunkName: "chartjs" */ "chart.js")
            .then(({
                       Chart,
                       DoughnutController,
                       ArcElement,
                       Legend,
                       Colors
                   }) => {
                Chart.register(DoughnutController, ArcElement, Legend, Colors);
            }).then(() => {
                ChartRegistry.registeredTypes.push("doughnut");
            });
    }

    private static async registerScatter() {
        return import(/* webpackChunkName: "chartjs" */ "chart.js")
            .then(({
                       Chart,
                       ScatterController,
                       LinearScale,
                       PointElement,
                       Colors,
                       Legend
                   }) => {
                Chart.register(ScatterController, LinearScale, PointElement, Colors, Legend)
            }).then(() => {
                ChartRegistry.registeredTypes.push("scatter");
            });
    }

    private static async registerBar() {
        return import(/* webpackChunkName: "chartjs" */ "chart.js")
            .then(({
                       Chart,
                       BarController,
                       CategoryScale,
                       LinearScale,
                       BarElement,
                       Colors,
                       Legend
                   }) => {
                Chart.register(BarController, Colors, Legend, CategoryScale, LinearScale, BarElement)
            }).then(() => {
                ChartRegistry.registeredTypes.push("bar");
            });
    }

    private static async registerLine() {
        return import(/* webpackChunkName: "chartjs" */ "chart.js")
            .then(({
                       Chart,
                       LineController,
                       CategoryScale,
                       LinearScale,
                       PointElement,
                       LineElement,
                       Colors
                   }) => {
                Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Colors);
            }).then(() => {
                ChartRegistry.registeredTypes.push("line");
            });
    }
}