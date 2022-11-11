export function allowOrigin(requestOrigin :string, allowedDomaines :string[]) :string|null {
    let allowedOrigin :string|null|undefined = allowedDomaines.find(currentDomain => currentDomain === requestOrigin.replace("http://", ''));
    if (allowedOrigin === undefined) allowedOrigin = null; 
    return allowedOrigin;
}