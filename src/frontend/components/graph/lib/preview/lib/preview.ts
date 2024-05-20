import { Component } from "component";
import { OptionsIn, PlotData } from "../../types/Interfaces";
import do_plot from "../../chart";
import { ChartRenderer } from "util/charts";

export default class ChartPreview extends Component {
    private readonly count = 30;

    chart: ChartRenderer;
    options: OptionsIn;
    plotData: PlotData;

    constructor(private container: HTMLFormElement) {
        super(container as HTMLElement);
        const $canvas = $(container).find('canvas#graph-preview') as JQuery<HTMLCanvasElement>;
        this.initGraph($canvas);
    }

    private initGraph(target: JQuery<HTMLCanvasElement>) {
        this.createGraph(target[0]);
    }

    private generateOptions(type = "bar"): OptionsIn {
        const id = 0;
        const showlegend = <any>type !== "line";
        const stackseries = false;
        const x_axis_name = "X Axis";
        const y_axis_label = "Y Axis";
        return {
            type,
            id,
            showlegend,
            stackseries,
            x_axis_name,
            y_axis_label
        }
    }

    private generateRandomData(size: number) {
        return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    }

    private async createGraph(container: HTMLCanvasElement) {
        this.options = this.generateOptions();
        const refreshAction = {
            label: 'Preview',
            action: async (ev) => {
                ev && ev.preventDefault && ev.preventDefault();
                ev && ev.stopPropagation && ev.stopPropagation();
                await this.chart.reload();
            },
            classes: ['btn', 'btn-primary', 'btn-sm']
        };

        const url = this.getUrl();
        const result = await fetch(url);
        const data = await result.json();
        console.log("FETCH REQUEST: ", data);

        this.plotData = data;
        this.chart = await do_plot(this.plotData, this.options, container, undefined, refreshAction);

        const $title = $("#title");
        if (!$title || !$title.length) throw new Error("Title element not found");
        $title.on("keyup", (ev) => {
            const value = $(ev.target).val() as string;
            this.chart.updateTitle(value);
        });

        const $type = $("#type");
        if (!$type || !$type.length) throw new Error("Type element not found");
        $type.on("change", (ev) => {
            const value = $(ev.target).val() as string;
            this.chart.updateType(value);
        });
    }

    private createPointsMap(type: string): any {
        //pie or doughnut = pairs
        if (type.toLocaleLowerCase() === "pie" || type.toLocaleLowerCase() === "doughnut") {
            const randomX = this.generateRandomData(this.count);
            const randomY = this.generateRandomData(this.count);
            return randomX.map((x, i) => [String(x), randomY[i]]);
        }
        if (type.toLocaleLowerCase() === "bar" || type.toLocaleLowerCase() === "scatter") {
            const randomData = this.generateRandomData(this.count);
            return [[...randomData]];
        }
        if (type.toLocaleLowerCase() === "line") return this.generateRandomData(30);
        return [];
    }

    getUrl() {
        const time = new Date().getTime()
        const layoutId = 'table5';
        return `/${layoutId}/data_graph/0/${time}`
    }
}