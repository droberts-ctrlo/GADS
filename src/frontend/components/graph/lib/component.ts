import {Component} from 'component'
import do_plot from './chart'
import chartToPdf from "./util/PDFRenderer";
import { ChartAction } from 'util/charts/Actions/Actions';
import { OptionsIn } from './types/Interfaces';

/**
 * @class GraphComponent
 * @description Default graph component
 */
export default class GraphComponent extends Component {
    /**
     * @property actions
     * @description Actions to be added to the chart
     */
    private actions: ChartAction[] = [{
        label: 'Download PNG',
        action(chart) {
            const a = document.createElement('a');
            a.href = chart.toBase64Image();
            a.download = 'chart.png';
            a.click();
        }
    },
    {
        label: 'Download PDF',
        action: (chart) => chartToPdf(chart)
    }];

    /**
     * Create a new GraphComponent
     * @param element The element to attach the component to
     */
    constructor(element: HTMLElement) {
        super(element)
        const graphContainer = $(this.element).find('.graph__container') as JQuery<HTMLCanvasElement>

        if (graphContainer && graphContainer.length) this.initGraph(graphContainer)
    }

    /**
     * Initialise and render the graph
     * @param graphContainer THe canvas to render the graph to
     */
    initGraph(graphContainer: JQuery<HTMLCanvasElement>) {
        const data = graphContainer.data()
        const jsonUrl = this.getURL(data as { graphType: string, layoutId: number, graphId: number })
        const options_in: OptionsIn = {
            type: data.graphType,
            x_axis_name: data.xAxisName,
            y_axis_label: data.yAxisLabel,
            stackseries: data.stackseries,
            showlegend: data.graphtype !== "line",
            id: data.graphId
        }
        const actionTarget = $(graphContainer).closest('.graph').find('.chart__actions')


        $.ajax({
            url: jsonUrl,
            dataType: 'json',
            success: async (data) => {
                await do_plot(data, options_in, graphContainer[0], actionTarget, ...this.actions)
            }
        });
    }

    /**
     * Get the URL for the graph data
     * @param data The data for the graph
     * @returns The URL for the graph data unless the environment is a test or dev environment
     */
    getURL(data: { graphType: string, layoutId: number, graphId: number }) {
        let devEndpoint: any
        const {graphType, layoutId, graphId} = data

        if (['bar', 'line', 'scatter'].indexOf(graphType) > -1) {
            devEndpoint = window.siteConfig && window.siteConfig.urls.barApi
        } else if (['doughnut', 'pie'].indexOf(graphType) > -1) {
            devEndpoint = window.siteConfig && window.siteConfig.urls.pieApi
        }

        if (devEndpoint) {
            return devEndpoint
        } else {
            const time = new Date().getTime()
            return `/${layoutId}/data_graph/${graphId}/${time}`
        }
    }
}
