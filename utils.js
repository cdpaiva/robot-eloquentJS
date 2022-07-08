// This module contains utility functions

// Pick a random element of an array
const randomPick = function (arr) {
    const randomElement = Math.floor(Math.random() * arr.length)
    return arr[randomElement]
}

// A fancier equivalent way would be to set a method in the Array prototype
// This is not used anywhere in the code, it's just to illustrate
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}

// Compare two robot functions
function compareRobots(robot1, memory1, robot2, memory2, turns=100) {
    var totalRobot1 = 0
    var totalRobot2 = 0
    for (let i = 0; i < turns; i++) {
        let state = VillageState.random()
        totalRobot1 += runRobot(state, robot1, memory1)
        totalRobot2 += runRobot(state, robot2, memory2)
    }
    console.log(`Robot 1 took ${totalRobot1 / turns} turns in average`)
    console.log(`Robot 2 took ${totalRobot2 / turns} turns in average`)
}

module.exports = {randomPick, compareRobots}