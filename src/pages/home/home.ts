import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//created Resource interface
import { Resource } from './resource.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  max: number = 30
  min: number = 1
  resourcesNum: number
  usersNum: number
  userResources: number
  time: number
  numArray: Array<number> = []
  actualResources: Array<number> = []
  arrayOfUsers: Array<number> = []

  resourceObject = {} as Resource //new Object
  asdfghjkl: Array<Resource> = [] //asdfghjk.resourceName/resourceTime/resourceStatus


  constructor(public navCtrl: NavController) {
  }

  execute() {

    this.resourcesNum = 0
    this.usersNum = 0
    this.userResources = 0
    this.time = 0

    this.resourceObject = {} as Resource     //creating a new object
    this.actualResources = []
    this.arrayOfUsers = []
    this.start()

  }

  start() {
    console.log("Program Starting")
    console.log("num of resources")
    this.resourcesNum = this.randomizer(this.min, this.max)
    console.log(this.resourcesNum)
    console.log("num of users")
    this.usersNum = this.randomizer(this.min, this.max)
    console.log(this.usersNum)

    this.actualResources = this.numRandomize(this.resourcesNum)
    this.arrayOfUsers = this.numRandomize(this.usersNum)

    console.log("Array of users:");
    console.log(this.arrayOfUsers);
    console.log("Resources:");
    console.log(this.actualResources);

  }

  randomizer(min,max) {
    //console.log("Randomizing");
    let ranNum: number
    ranNum = Math.floor(Math.random() * (max + min - 1)) + min
    // console.log(ranNum)
    return ranNum
  }

  numRandomize(length) {
    this.numArray = [] //reset the array
    console.log("Randomizing values")
    let i: number = 0
    let j: number = 0
    while (i != length) {
      j = this.randomizer(this.min, this.max)
      //add to actual resource array
      this.numArray.push(j)
      i++
    }
    // console.log("Array:")
    // console.log(this.numArray)
    return this.numArray
  }

  assigning(){
    let e: any
    for(e in this.actualResources){

    }
  }


}
