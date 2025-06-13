import createChart from "./lib/GadsChart";
import { ChartOptions } from "./lib/Types";

declare global {
  interface JQuery<TElement extends HTMLElement = HTMLElement> {
    chart(options: ChartOptions): JQuery<TElement>;
  }
}

(($) => {
  $.fn.chart = function (options: ChartOptions) {
    this.filter('canvas').each(function () {
      createChart(this, options.data, options.settings);
    })
    return this;
  }
})(jQuery);