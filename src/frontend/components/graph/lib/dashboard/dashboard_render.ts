// Why is this here rather than in the dashboard file?
import do_plot from "../chart";
import { Chart } from "chart.js";

/**
 * Render the dashboard graph from BASE64 encoded JSON strings - this is for the dashboard
 * @param {string} plotData BASE64 encoded JSON string for the plot data
 * @param {string} options_in BASE64 encoded JSON string for the options
 * @param {HTMLCanvasElement} canvas Canvas element to render the plot
 * @returns {Chart} The Chart component
 */
export default async function do_plot_json (plotData: string, options_in: string, canvas: HTMLCanvasElement):Promise<Chart> {
    const d = JSON.parse(atob(plotData))
    d.type === "donut" && (d.type = "doughnut");
    const o = JSON.parse(atob(options_in))
    return await do_plot(d, o, canvas || document.createElement('canvas'));
}
