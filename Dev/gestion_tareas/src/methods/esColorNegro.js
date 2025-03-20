function esColorNegro(color){
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const brillo = 0.299*r + 0.587*g + 0.114*b;
    return brillo < 128;
}
export default esColorNegro;