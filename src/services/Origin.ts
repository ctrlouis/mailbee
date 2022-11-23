export function allowOrigin(requestOrigin :string, allowedDomaines :string[]) :boolean {
    let allow = false;
    const findDomain :string|null|undefined = allowedDomaines.find(currentDomain => {
        return currentDomain === requestOrigin.replace("http://", '') || currentDomain === requestOrigin.replace("https://", '')
    });
    if (typeof findDomain === 'string') allow = true; 
    return allow;
}