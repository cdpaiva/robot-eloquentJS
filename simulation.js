// This module stiches all other modules together and runs the simulation

const VillageState = require('./VillageState')
const {randomPick} = require('./utils')
const {randomRobot, routeRobot, goalOrientedRobot, compareParcelsRobot} = require('./robots')
const roadGraph = require('./roadGraph')

// Returns the amount of turns to compare different algorithms
function runRobot(state, robot, memory) {
    let turn = 0
    for (turn; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`)
            break
        }
        //robot takes two args here, but we can pass functions
        //with different amounts of args 
        let action = robot(state, memory)
        state = state.move(action.direction)
        memory = action.memory
        console.log(`Moved to ${action.direction}`)
    }
    return turn
}

// Populates the village with parcels distributed randomly
VillageState.random = function (parcelCount = 5) {
    console.log("=== Initiating parcel distribution in town ===")
    const parcels = []
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph))
        let place
        //guarantees that parcels won't be placed in their final address
        do {
            place = randomPick(Object.keys(roadGraph))
        } while (place == address)
        parcels.push({ place, address })
        console.log(`Added a parcel at ${place}, to be delivered in ${address}.`)
    }
    console.log("=== Parcel distribution complete ===")
    return new VillageState("Post Office", parcels)
}

// runRobot(VillageState.random(),randomRobot,[])
// runRobot(VillageState.random(),routeRobot,[])
// runRobot(VillageState.random(),goalOrientedRobot,[])
runRobot(VillageState.random(),compareParcelsRobot,[])