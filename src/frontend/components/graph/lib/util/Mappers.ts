import { PlotData } from "../types/Interfaces";

/**
 * Map the plot data to the datasets for the chart
 * @param plotData The data to map to the returned datasets
 * @param chartType The type of chart being rendered
 * @returns An array of datasets to be rendered on the chart
 */
export default function mapToDataset(plotData: PlotData, type: string) {
    if(type !== "bar" && type !== "scatter") {
        const data = flattenData(plotData.points);
        return { data }
    }else{
        const data = squashData(plotData.points);
        return { data };
    }
}

function flattenData(data) {
    let flatData = [];
    if (Array.isArray(data)) {
        for (const item of data) {
            if (Array.isArray(item)) {
                flatData = flatData.concat(flattenData(item));
            } else {
                if(typeof item === "number")flatData.push(item);
            }
        }
    }
    return flatData;
}

function squashData(data) {
    const squashData = [];
    for (const item of data) {
        let pushed = false
        for(const v of item) {
            if(v!==0) {
                squashData.push(v);
                pushed=true;
            }
        }
        if(!pushed) squashData.push(0);
    }   
    return squashData;
}
