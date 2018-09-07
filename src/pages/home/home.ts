import { Component, wtfStartTimeRange } from '@angular/core';
import { NavController } from 'ionic-angular';

//created Resource interface
import { Resource } from './resource.interface';
import { notImplemented } from '../../../node_modules/@angular/core/src/render3/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  randomRange: Array<number> =[]
  max: number = 29
  min: number = 0
  resourcesNum: number
  usersNum: number
  userResources: number
  time: number
  numArray: Array<number> = []
  actualResources: Array<number> = []
  arrayOfUsers: Array<number> = []

  resourceObject = {} as Resource //new Object
  resourceLineUp: Array<Resource> = []


  constructor(public navCtrl: NavController) {
  }

  execute() {

    this.resourcesNum = 0
    this.usersNum = 0
    this.userResources = 0
    this.time = 0

    this.resourceObject = {} as Resource     //creating a new object
    this.resourceLineUp = []
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

    this.assigning()    

  }
///////////////////////////////////////////////////////////////////////////RANDOMIZING
  // randomizer(min,max) {
  //   //console.log("Randomizing");
  //   this.randomRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26, 27,28, 29, 30]

  //   let ranNum: number
  //   let ranIndex: number
  //   ranIndex = Math.floor(Math.random() * (max + min - 1)) + min
  //   ranNum = this.randomRange[ranIndex]
  //   this.randomRange.splice(ranIndex, 1)
    
  //   // console.log(ranNum)
  //   return ranNum

  // }

  randomizer(min,max) {
    //console.log("Randomizing");
    this.randomRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
      
    let ranNum: number
    let ranIndex: number
    ranNum = Math.floor(Math.random() * (max + min - 1)) + min
    ranIndex = ranNum+1
    if(this.randomRange[ranIndex] != 0){
      ranNum = this.randomRange[ranIndex]
      this.randomRange[ranIndex] = 0
    } else 
      if(this.randomRange[ranIndex] == 0) {
      this.randomizer(this.min, this.max)
    }
    // this.randomRange.splice(ranIndex, 1)
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
  ///////////////////////////////////////////////////////////////////////////RANDOMIZING

  assigning(){
    let e: any
    let temp: any
    let assignment: any
    for (e in this.actualResources){
      // console.log(e)
      temp = e;
      e = {} as Resource
      e.resourceName = this.actualResources[temp] 
      assignment = this.randomizer(0, this.arrayOfUsers.length)
      // console.log("ASSIGNMENT")
      // console.log(assignment)
      if (assignment == this.arrayOfUsers.length){
        e.resourceStatus = false;
        e.resourceTime = 0
        this.resourceLineUp.push(e)
      } else {
        e.user = this.arrayOfUsers[assignment]
        // console.log(e.user)
        e.resourceStatus = true;
        e.resourceTime = this.randomizer(this.min, this.max)
        this.resourceLineUp.push(e)
      }
      // console.log(this.resourceLineUp)
    }
    console.log(e)
    console.log("ASSIGNMENT")
    console.log(assignment)
    console.log(e.user)
    console.log(this.resourceLineUp)
  }


}
