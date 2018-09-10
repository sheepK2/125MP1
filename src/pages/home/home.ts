import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//created Resource interface
//import { Resource } from './resource.interface';
//import { User } from './user.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  givenRange: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  resourcesList: Array<number> = []
  min: number = 1
  max: number = 30
  min2: number = 0
  max2: number = 29
  numUsers: number
  numResources: number

  constructor(public navCtrl: NavController) {
  }

  start() {
    //renew variables
    this.execute()

  }

  execute() {
    console.log("Program Starting")

    console.log("Randomized Number of Users:")
    this.numUsers = this.singleRandomizer(this.min, this.max)
    console.log(this.numUsers)

    console.log("Randomized Number of Resources:")
    this.numResources = this.singleRandomizer(this.min, this.max)
    console.log(this.numResources)

    console.log("Randomizing List of Resources:")
    this.resourcesList = this.arrayRandomizer(this.resourcesList, this.numResources)
    console.log(this.resourcesList)

  }

  singleRandomizer(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  arrayRandomizer(arr, numElements) {
    let fromArray = this.givenRange
    let x
    while (numElements != 0) {
      let index = Math.floor(Math.random() * (this.max2 - this.min2 + 1)) + this.min2; // choose from 0 tp 29 as index
      x = fromArray.splice(index, 1)
      arr.push(x)
      numElements--
    }
    return arr
  }



}
