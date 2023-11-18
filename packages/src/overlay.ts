function generateOverlayPathString(stage):string{
    const windowX = window.innerWidth;
    const windowY = window.innerHeight;
    const stageWidth= stage.width ;
    const stageHeight = stage.height ;

    // prevent glitches when stage is too small for radius
    const limitedRadius = Math.min( stageWidth / 2, stageHeight / 2);

    // no value below 0 allowed + round down
    const normalizedRadius = Math.floor(Math.min(limitedRadius, 0));

    const highlightBoxX = stage.x + normalizedRadius;
    const highlightBoxY = stage.y ;
    const highlightBoxWidth = stageWidth - normalizedRadius * 2;
    const highlightBoxHeight = stageHeight - normalizedRadius * 2;

    return `M${windowX},0L0,0L0,${windowY}L${windowX},${windowY}L${windowX},0Z
        M${highlightBoxX},${highlightBoxY} h${highlightBoxWidth} a${normalizedRadius},${normalizedRadius} 0 0 1 ${normalizedRadius},${normalizedRadius} v${highlightBoxHeight} a${normalizedRadius},${normalizedRadius} 0 0 1 -${normalizedRadius},${normalizedRadius} h-${highlightBoxWidth} a${normalizedRadius},${normalizedRadius} 0 0 1 -${normalizedRadius},-${normalizedRadius} v-${highlightBoxHeight} a${normalizedRadius},${normalizedRadius} 0 0 1 ${normalizedRadius},-${normalizedRadius} z`;
}

function createOverlaySvg(element){
    const windowX = window.innerWidth;
    const windowY = window.innerHeight;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("helper-overlay", "helper-overlay-animated");

    svg.setAttribute("viewBox", `0 0 ${windowX} ${windowY}`);
    svg.setAttribute("xmlSpace", "preserv0e");
    svg.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("preserveAspectRatio", "xMinYMin slice");
    const definition = element.getBoundingClientRect();

    const activeStagePosition = {
        x: definition.x,
        y: definition.y,
        width: definition.width,
        height: definition.height,
    };
    svg.style.fillRule = "evenodd";
    svg.style.clipRule = "evenodd";
    svg.style.strokeLinejoin = "round";
    svg.style.strokeMiterlimit = "2";
    svg.style.zIndex = "10000";
    svg.style.position = "fixed";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";

    const stagePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    stagePath.setAttribute("d",generateOverlayPathString(activeStagePosition));
    svg.appendChild(stagePath);
    return svg
}


function renderOverlaySvg(element){
    const overlay =  createOverlaySvg(element)
    return overlay
}


export function mountedOverlaySvg(element){
    document.body.appendChild(renderOverlaySvg(element))
}