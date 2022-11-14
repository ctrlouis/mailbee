export function allowOrigin(requestOrigin :string, allowedDomaines :string[]) :boolean {
    let allow = false;
    const findDomain :string|null|undefined = allowedDomaines.find(currentDomain => currentDomain === requestOrigin.replace("http://", ''));
    if (typeof findDomain === 'string') allow = true; 
    return allow;
}