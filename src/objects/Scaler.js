export function getScale(width, height, desiredWidth, desiredHeight) {
    if (!desiredHeight || !desiredHeight) {
        return {x: 1, y: 1};
    }

    const xScale = desiredWidth / width;
    const yScale = desiredHeight / height;

    return {x: xScale, y: yScale};
}