import { Component } from 'component'
import { do_plot } from './chart'

export default class GraphComponent extends Component {
  constructor(element:HTMLElement) {
    super(element)
    const graphContainer = $(this.element).find('.graph__container') as JQuery<HTMLCanvasElement>

    if (graphContainer.length) {
      this.initGraph(graphContainer)
    }
  }

  initGraph(graphContainer:JQuery<HTMLCanvasElement>) {
    const data = graphContainer.data()
    const jsonurl = this.getURL(data)
    const options_in = {
      type: data.graphType,
      x_axis_name: data.xAxisName,
      y_axis_label: data.yAxisLabel,
      stackseries: data.stackseries,
      showlegend: data.showlegend,
      id: data.graphId
    }

    //This is just as efficient, and is Async, so can be used instead!
    $.ajax({
      url: jsonurl,
      dataType: 'json',
      success: (data) => {
        do_plot(data, options_in, graphContainer[0]);
      }
    });
  }

  getURL(data) {
    let devEndpoint

    if (['bar', 'line', 'scatter'].indexOf(data.graphType) > -1) {
      devEndpoint = window.siteConfig && window.siteConfig.urls.barApi
    } else if (['doughnut', 'pie'].indexOf(data.graphType) > -1) {
      devEndpoint = window.siteConfig && window.siteConfig.urls.pieApi
    }

    if (devEndpoint) {
      return devEndpoint
    } else {
      const time = new Date().getTime()
      return `/${data.layoutId}/data_graph/${data.graphId}/${time}`
    }
  }
}
