import { Component } from "component";
import do_plot from "../../chart";
import { ChartAction, OptionsIn, PlotData } from "../../types/Interfaces";
import { Chart } from "chart.js"; // This will be replaced with the correct registry setup.
import { registerActions } from "../../util/Actions";

export default class ChartPreview extends Component {
    chart: Chart;
    options: OptionsIn;
    plotData: PlotData;

    constructor(private container: HTMLFormElement) {
        super(container as HTMLElement);
        const $canvas = $(container).find('canvas#graph-preview') as JQuery<HTMLCanvasElement>;
        this.initGraph($canvas);
    }

    initGraph(target:JQuery<HTMLCanvasElement>) {
        this.createGraph(target[0]);
    }

    generateOptions(type = "bar"): OptionsIn {
        const id = 0;
        const showlegend = <any>type !=="line";
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

    generateRandomData(size: number) {
        return Array.from({length: size}, () => Math.floor(Math.random() * 100));
    }

    async createGraph (container: HTMLCanvasElement) {
        this.options = this.generateOptions();
        this.plotData = {
            points: this.createPointsMap(this.options.type),
            xlabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            options: {}
        };
        this.chart = await do_plot(this.plotData, this.options, container);
        const action:ChartAction = {
            label: 'Refresh',
            action: async () => {
                this.chart.destroy();
                //TODO: need to load the live data here - currently working with random data
                this.chart = await do_plot(this.plotData, this.options, container);
            }
        }
        registerActions(this.chart, action);
    }

    createPointsMap(type: string): any {
        //pie or doughnut = pairs
        if(type.toLocaleLowerCase() === "pie" || type.toLocaleLowerCase() === "doughnut") {
            const randomX = this.generateRandomData(10);
            const randomY = this.generateRandomData(10);
            return randomX.map((x, i) => [String(x), randomY[i]]);
        }
        if(type.toLocaleLowerCase() === "bar" || type.toLocaleLowerCase() === "scatter") {
            const randomData = this.generateRandomData(10);
            return [[...randomData]];
        }
        if(type.toLocaleLowerCase() === "line") return this.generateRandomData(10);
        return [];
    }
}