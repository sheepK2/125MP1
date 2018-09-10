import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Resource } from './resource.interface'; // created Resource interface (object)
import { User } from './user.interface'; // created User interface (object)

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  givenRange: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  resourcesList: Array<Resource> = []
  usersList: Array<User> = []
  min: number = 1
  max: number = 30
  min2: number = 0
  max2: number = 29
  numUsers: number
  numResources: number

  //resource = {} as Resource

  constructor(public navCtrl: NavController) {
  }

  start() {
    //renew variables
    this.min = 1
    this.max = 30
    this.min2 = 0
    this.max2 = 29
    this.numResources = 0
    this.numUsers = 0
    this.resourcesList = []
    this.usersList = []
    this.givenRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

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

    console.log("Randomized List of Users:")
    this.usersList = this.arrayRandomizer(this.usersList, this.numUsers, this.max2).sort((n1, n2) => n1 - n2);
    console.log(this.usersList)

    console.log("Randomized List of Resources:")
    this.resourcesList = this.arrayRandomizer(this.resourcesList, this.numResources, this.max2).sort((n1, n2) => n1 - n2);
    console.log(this.resourcesList)

    console.log("Assigning Resources:")

  }

  assignResource() {
    
  }

  singleRandomizer(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  arrayRandomizer(arr, numElements, decLen) {
    let fromArray = this.givenRange
    let x
    while (numElements != 0) {
      let index = Math.floor(Math.random() * (decLen - this.min2 + 1)) + this.min2; // choose from 0 tp 29 as index
      x = fromArray.splice(index, 1)
      decLen--
      arr.push(x[0])
      numElements--
    }
    this.givenRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    return arr
  }

}