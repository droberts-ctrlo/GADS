import { do_plot_json } from '../../../graph/lib/chart'
import GraphComponent from '../../../graph/lib/component'

class DashboardGraphComponent extends GraphComponent {
  constructor(element)  {
    super(element)
    if(this.element instanceof HTMLCanvasElement) {
      this.initDashboardGraph()
    }else{
      throw "Invalid element type. Expected HTMLCanvasElement."
    }
  }

  initDashboardGraph() {
    const $graph = $(this.element)
    if(!$graph.hasClass("graph__container")) $graph.addClass("graph__container");
    if(!$graph.hasClass("dashboard__graph")) $graph.addClass("dashboard__graph");
    if(!$graph.parent().hasClass("dashboard__container")) $graph.parent().addClass("dashboard__container");
    const graph_data = $graph.data('plot-data')
    const options_in = $graph.data('plot-options')

    do_plot_json(graph_data, options_in, this.element)

  }
}

export default DashboardGraphComponent
