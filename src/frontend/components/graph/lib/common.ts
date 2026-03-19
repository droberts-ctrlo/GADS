import { ChartConfiguration } from 'chart.js';
import { OptionsIn, PlotData, mapToDataset } from './types';
import { Chart } from 'chart.js/auto';

declare global {
    interface Window {
        do_plot_json: (plotData: string,options_in: string) => Chart;
    }
}

export const do_plot = (plotData:PlotData, options_in:OptionsIn, container:HTMLCanvasElement) => {
    const config:ChartConfiguration = {
        type: options_in.type,
        data: {
            labels: plotData.xlabels,
            datasets: mapToDataset(plotData)
        }
    };
    return new Chart(container, config);
};

// At the moment, do_plot_json needs to be exported globally, as it is used by
// Phantomjs to produce PNG versions of the graphs. Once jqplot has been
// replaced by a more modern graphing library, the PNG/Phantomjs functionality
// will probably unneccessary if that functionality is built into the library.
export const do_plot_json = (window.do_plot_json = (plotData:string, options_in:string) => {
    const d = JSON.parse(atob(plotData));
    const o = JSON.parse(atob(options_in));
    return do_plot(d, o, (document.getElementById('mybutt') as HTMLCanvasElement) || document.createElement('canvas'));
});
