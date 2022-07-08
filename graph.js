// This module contains the function that generates the graph

function buildGraph(edges) {
    // Create an object without a prototype
    let graph = Object.create(null)
    // addEdge will only be used in this context, so we can simply
    // declare it inside buildGraph
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to]
        } else {
            graph[from].push(to)
        }
    }
    // The list will be mapped to pairs once it is splitted
    // each pair is added to the graph object
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to)
        addEdge(to, from)
    }
    return graph
}

module.exports = buildGraph