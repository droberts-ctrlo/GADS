export function transparentize(...colours: string[]): string[] {
    return colours.map((colour) => {
        return colour + Math.floor(255 * 0.7).toString(16);
    });
}