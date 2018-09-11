import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//created Resource interface
import { ResourceCard } from './resource-card.interface';
// import { Resource} from './resource.interface';
import { User } from './user.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  randomRange: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

  min: number = 1
  max: number = 10
  randomUserLimit: number;
  randomResourceLimit: number;
  generatedUsers: Array<number>;
  generatedtemp: Array<number>;
  randomizedArray: Array<number>;  
  generatedResources: Array<number>;
   

  resourceCard = {} as ResourceCard //new Object
  resourceCardArray: Array<ResourceCard> = []
  // resourceObject = {} as Resource //new Object
  // resourceQueue: Array<Resource> = []
  userObject = {} as User //new Object
  arrayOfUsersObject: Array<User> = []


  constructor(public navCtrl: NavController) {  
  }

  // initialization/ reset
  execute() {
    this.start();
  }

  start() {
    console.log("Randomizing");

    console.log("Number of users:");
    this.randomUserLimit = this.Randomizer(this.min, this.max);
    console.log(this.randomUserLimit);

    console.log("Number of Resources:");
    this.randomResourceLimit = this.Randomizer(this.min, this.max);
    console.log(this.randomResourceLimit);
    
    console.log("Generating random resources and users");
    this.generate(this.randomRange, this.randomResourceLimit, this.randomUserLimit);  

    console.log("Generating objects");
    this.generateObjects();
  }

  // returns a random number
  Randomizer(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  // randomize the elements of a given array
  shuffle(array) {
    for (var i = array.length-1; i >=0; i--) {
 
      var randomIndex = Math.floor(Math.random() * ( i + 1)); 
      var itemAtIndex = array[randomIndex]; 
       
      array[randomIndex] = array[i]; 
      array[i] = itemAtIndex;
    }
    // console.log(array)
    return array
  }

  // returns the n number of elements needed
  randomResult(arr, size){
    this.randomizedArray = [];
    for(var lim = 0; lim != size; lim++){
      this.randomizedArray.push(arr[lim])
    }
    // console.log(this.randomizedArray);
    return this.randomizedArray;
  }

  // returns the generated n resources
  generateRandomResources(arr, size){
    let res: Array<number>;
    res = this.randomResult(this.shuffle(arr), size)
    // console.log(res);
    return res;
  }

  // returns the generated n users
  generateRandomUsers(arr, size){
    let res: Array<number>;
    res = this.randomResult(this.shuffle(arr), size)
    // console.log(res);
    return res;
  }

  generate(arr, res, users){
    console.log("---------------")
    this.generatedResources = this.generateRandomResources(arr, res)
    this.generatedUsers = this.generateRandomUsers(arr, users)
   console.log("....................")
  }

  generateObjects(){
    this.generateResourceObjects(this.generatedResources);
    this.generateUsersObjects(this.generatedUsers);
  }

  //generate n number of object resources
  generateResourceObjects(r){
    this.resourceCardArray = []
    r = this.generatedResources
    let i:number = 0;
      for(i; i != r.length; i++){                 // create new object ----> queue , status, name, time, currentUser
        this.resourceCard = {} as ResourceCard
        this.resourceCard.resourceName = this.generatedResources[i];
        this.resourceCard.resourceStatus = true;
        this.resourceCard.resourceTime = 0; 
        this.resourceCardArray.push(this.resourceCard) //push that object to an array of resource objects
        }
    console.log(this.resourceCardArray);
    return this.resourceCardArray
  }

  
  //generate n number of object resources
  generateUsersObjects(u){
    this.arrayOfUsersObject = []
    let res: Array<number> = [] 
    res = this.generatedResources

    let i:number = 0;
    
        // create new object ----> queue , status, name, time, currentUser
      for(i; i != u.length; i++){
        this.userObject = {} as User
        this.userObject.userName = this.generatedUsers[i];
        this.userObject.userTime = this.Randomizer(this.min, this.max);
        this.userObject.userResourcesLim = this.Randomizer(this.min, this.randomResourceLimit);
        //array of resources per user
        this.generatedtemp = this.generateRandomResources(res,this.userObject.userResourcesLim)
        // this.userObject.usersResources = this.singleResourceObject(this.generatedtemp)
        this.userObject.usersResources = this.generatedtemp
        this.arrayOfUsersObject.push(this.userObject) //push that object to an array of resource objects
        }
    
          // console.log(singleRes)
        console.log(this.arrayOfUsersObject);
    return this.arrayOfUsersObject
  }

  totalTime(arr){
    let temp:number = 0; 
    for(let i = 0; i != arr.length; i++){
      temp += this.resourceCard.resourceTime
    }
    console.log(temp)
    return temp
  }

  // singleResourceObject(arr){
  //   let u = arr
  //   this.resourceQueue = []
  //   for(let i = 0; i != u.length; i++){

  //     this.resourceObject = {} as Resource
  //     this.resourceObject.name = u[i]
  //     this.resourceObject.time = this.Randomizer(this.min, this.max)
  //     this.resourceObject.status = true;
  //     this.resourceQueue.push(this.resourceObject)
  //   }
  //   return this.resourceQueue
  // }

}
