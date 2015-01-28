function backgroundHandler(container) {
    var xmlns = "http://www.w3.org/2000/svg";
    var xlinkns = "http://www.w3.org/1999/xlink";
    var svg = document.createElementNS(xmlns, "image");

    svg.setAttributeNS(null, "x", 0);
    svg.setAttributeNS(null, "y", 0);
    svg.setAttributeNS(null, "width", 800);
    svg.setAttributeNS(null, "height", 600);
    svg.setAttributeNS(xlinkns, "xlink:href", "images/backgrounds/background-level.png");

    container.appendChild(svg);
}