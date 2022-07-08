// This module contains all robot functions and data directly used by them

const {randomPick} = require('./utils')
const roadGraph = require('./roadGraph')

// This robots moves randomly until it finally delivers all packages
function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) }
}

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
]

// This robot will follow a fixed path, so it does not need information about the current village state
//It will only follow its memory
function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute
    }
    return { direction: memory[0], memory: memory.slice(1) }
}

//Pathfinding algorithm: it keeps building routes inside an array until one of the routes get to the destination
//This function assumes we will always be able to reach the destination from any point ie. the graph is connected
function findRoute(graph, from, to) {
    //List of potential routes
    let work = [{ at: from, route: [] }]
    //Check all routes
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i]
        for (let place of graph[at]) {
            if (place == to) {
                return route.concat(place)
            }
            //If the place in the vicinity of the current 'at' is not
            //our destination and it wasn't checked before, we add it
            //to the work list
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) })
            }
        }
    }
}

//This robot also receives a state and a memory, it's just that the state is destructured in the params declaration
//If there is no memory, one will be created, based on the next parcel to deliver
// The robot will whether go to the next place of the parcel or the next address
function goalOrientedRobot({ place, parcels }, route) {
    if (route.length == 0) {
        let parcel = parcels[0]
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place)
        } else {
            route = findRoute(roadGraph, place, parcel.address)
        }
    }
    return { direction: route[0], memory: route.slice(1) }
}

//Will search for the shortest path between all parcels
//This enhances the proposed solution
function compareParcelsRobot({ place, parcels }, route) {
    if (route.length == 0) {
        let routes = []
        for (let parcel of parcels) {
            if (parcel.place != place) {
                routes.push(findRoute(roadGraph, place, parcel.place))
            } else {
                routes.push(findRoute(roadGraph, place, parcel.address))
            }
        }
        //Finds the smallest array ie. the smallest route
        route = routes.reduce((prev, next) => prev.length > next.length ? next : prev)
    }
    return { direction: route[0], memory: route.slice(1) }
}

module.exports = {randomRobot, routeRobot, goalOrientedRobot, compareParcelsRobot}