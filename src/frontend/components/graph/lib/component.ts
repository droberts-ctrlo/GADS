import { Component } from 'component';
import { do_plot } from './common';

/**
 * Component for rendering a graph.
 */
export default class GraphComponent extends Component {
    /**
     * Create a new GraphComponent.
     * @param element The HTML element to attach the graph to
     */
    constructor(element:HTMLElement) {
        super(element);
        const graphContainer = $(this.element).find('.graph__container') as JQuery<HTMLCanvasElement>;

        if (graphContainer.length) {
            this.initGraph(graphContainer);
        }
    }

    /**
     * Initialize the graph.
     * @param graphContainer The container element for the graph
     */
    initGraph(graphContainer:JQuery<HTMLCanvasElement>) {
        const data = graphContainer.data();
        const jsonurl = this.getURL(data);
        const options_in = {
            type: data.graphType,
            x_axis_name: data.xAxisName,
            y_axis_label: data.yAxisLabel,
            stackseries: data.stackseries,
            showlegend: data.showlegend,
            id: data.graphId
        };

        //This is just as efficient, and is Async, so can be used instead!
        $.ajax({
            url: jsonurl,
            dataType: 'json',
            success: async (data) => {
                do_plot(data, options_in, graphContainer[0]);
            }
        });
    }

    /**
     * Get the URL for the graph data.
     * @param data The data object containing graph information
     * @returns The URL for the graph data
     */
    getURL(data: any): string {
        let devEndpoint: string | undefined;

        if (['bar', 'line', 'scatter'].indexOf(data.graphType) > -1) {
            // @ts-expect-error - siteConfig is a global variable that may not be defined in all contexts
            devEndpoint = window.siteConfig && window.siteConfig.urls.barApi;
        } else if (['donut', 'pie'].indexOf(data.graphType) > -1) {
            // @ts-expect-error - siteConfig is a global variable that may not be defined in all contexts
            devEndpoint = window.siteConfig && window.siteConfig.urls.pieApi;
        }

        if (devEndpoint) {
            return devEndpoint;
        } else {
            const time = new Date().getTime();
            return `/${data.layoutId}/data_graph/${data.graphId}/${time}`;
        }
    }
}
