export function mapCoord(i: number, j: number) {
    return `${String.fromCharCode("A".charCodeAt(0) + j)}${i + 1}`;
}