import { get } from "jquery";

const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const GAMMA = 2.4;

const luminance = (r, g, b) => {
    const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, GAMMA);
    });
    return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

const getContrast = (hex1, hex2) => {
    const r1 = (hex1 >> 16) & 0xff;
    const g1 = (hex1 >> 8) & 0xff;
    const b1 = hex1 & 0xff;

    const r2 = (hex2 >> 16) & 0xff;
    const g2 = (hex2 >> 8) & 0xff;
    const b2 = hex2 & 0xff;

    const lum1 = luminance(r1,g1,b1);
    const lum2 = luminance(r2,g2,b2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

export function isWcag(hex1, hex2) {
    return getContrast(hex1, hex2) >= 4.5;
}