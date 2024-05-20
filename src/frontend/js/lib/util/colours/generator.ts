export function generateColours(length: number) {
    const colours = [
        '#3FB5C1',
        '#ABA9EB',
        '#BD80FC',
        '#26D2A9',
        '#FFBB01',
        '#FF6155',
        '#007C88',
        '#6B67DC',
        '#9D42FB',
        '#18856B',
        '#E30036'
    ]

    const moreColours = Array.from({ length: length - colours.length }, () => {
        let colour = Math.floor(Math.random() * 16777215);
        // Ensure the colour is not too light or too dark
        while (colour < 0xAAAAAA || colour > 0xEEEEEE) {
            colour = Math.floor(Math.random() * 16777215);
        }
        return '#' + colour.toString(16);
    });

    colours.push(...moreColours);

    return colours;
}