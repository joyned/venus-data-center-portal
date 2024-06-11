function extractParameters(query: string): { name: string, parameter: string }[] {
    const regex = /\$(\w+)/g; // Expressão regular para encontrar os parâmetros começando com $
    const matches = Array.from(query.matchAll(regex)); // Encontrar todas as correspondências na string

    const parameters: { name: string, parameter: string }[] = [];

    for (const match of matches) {
        const parameterName = match[1]; // O grupo de captura contém o nome do parâmetro
        const formattedName = parameterName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()); // Transforma $DASHBOARD_NAME em "Dashboard Name"
        parameters.push({ name: formattedName, parameter: `$${parameterName}` });
    }

    return parameters;
}


export { extractParameters }