//This module contains a class that defines the state of the simulation

const roadGraph = require('./roadGraph')

class VillageState {
    constructor(place, parcels) {
        this.place = place      //where the robot is
        this.parcels = parcels  //list of parcels to be delivered
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this
        } else {
            // the map call does the carrying of parcels
            // the filter does the delivering
            let parcels = this.parcels.map(p => {
                // parcels in other places remain unchanged
                if (p.place != this.place) {
                    return p
                }
                // parcels in the same position as the robot have their 
                // position updated, since the robot will 'carry' them
                return { place: destination, address: p.address }
            }).filter(p => p.place != p.address)
            return new VillageState(destination, parcels)
        }
    }
}

module.exports = VillageState