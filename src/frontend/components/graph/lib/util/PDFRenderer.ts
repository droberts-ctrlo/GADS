// I expected this to be far more complicated, so it got it's own file.
import {Chart} from "chart.js";
import {jsPDF} from "jspdf";

/**
 * Export a chart to a PDF
 * @param chart The chart to be exported to PDF
 */
export default function chartToPdf(chart:Chart) {
    const canvas = chart.canvas;
    const ratio = canvas.width / 200;
    const height = canvas.height / ratio;
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF("p", "mm", "a4",true);
    pdf.addImage(imgData, 'PNG', 0, 0, 200, height);
    pdf.save('chart.pdf');
}
