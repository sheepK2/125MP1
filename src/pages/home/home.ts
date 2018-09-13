import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//created Resource interface
import { ResourceCard } from './resource-card.interface';
import { Resource} from './resource.interface';
import { User } from './user.interface';
import { CurrencyPipe } from '../../../node_modules/@angular/common';

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
  randomizedArray: Array<number>;  
  generatedResources: Array<number>; 
  generatedUsers: Array<number>;

  resourceCard = {} as ResourceCard //new Object
  resourceCardArray: Array<ResourceCard>;

  resourceObject = {} as Resource //new Object
  resourceQueue: Array<Resource>;
  userObject = {} as User //new Object
  arrayOfUsersObject: Array<User>;
  sortedRes: Array<number>;
  sortedUser: Array<number>;


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
    this.generate(this.randomRange);  
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

  generate(arr){
    console.log("---------------")
    this.generatedResources = this.generateRandomResources(arr, this.randomResourceLimit)
    this.generatedUsers = this.generateRandomUsers(arr, this.randomUserLimit)
    this.sortedRes = this.generatedResources.sort((n1,n2) => n1 - n2)
    this.sortedUser = this.generatedUsers.sort((n1,n2) => n1 - n2) 

    console.log("RES: " + this.sortedRes)
    console.log("USERS: " + this.sortedUser)

    this.generateResourceCard(this.sortedRes);
    // this.generateUsersObjects(this.generatedUsers, this.randomUserLimit);
    console.log("....................")
  }

  
  //generate n number of object resources
  generateResourceCard(arr){
    this.resourceQueue = []
    this.resourceCardArray = []
    this.arrayOfUsersObject = this.generateUsersObjects(this.sortedUser, this.randomUserLimit)
    arr = this.sortedRes.sort((n1,n2) => n1 - n2)
    let i:number = 0;
    let c:number = 0;
    let currentCard: ResourceCard
    let currentUserRes: Array<number>
    let currentRes:Array<number>//res2
    let curr: User;
    let index = 0;
    // let hold = 0;

      for(i; i != arr.length; i++){                 // create new object ----> queue , status, name, time, currentUser
        this.resourceCard = {} as ResourceCard
        this.resourceCard.resourceName = arr[i];
        this.resourceCard.resourceStatus = true;
        this.resourceCard.resourceTime = 0; 
        this.resourceCard.userQueue = [];
        this.resourceCardArray.push(this.resourceCard) //resource card object  
        }
        let u = this.arrayOfUsersObject.length
        let r = this.resourceCardArray.length
        console.log("length of resource card: " + r);
        // u = 1;
        // console.log("users: " + u);
        // console.log("cards: " + r);
        
        for(let x = 0; x != u; x++){ // loop one user
          curr = this.arrayOfUsersObject[x] //one user
          currentUserRes = curr.usersResources //res of that user
          // console.log("current user resources:");
          // console.log(currentUserRes)
          for(let y = 0; y != currentUserRes.length; y++){ //loop resources of one user
            let hold = currentUserRes[y]
            // console.log("hold: " + hold) //single value
            // console.log(this.resourceCardArray);
            let currentCard = this.resourceCardArray
            for(let z = 0; z != r; z++){
              // console.log(currentCard[z]);
              console.log("current user res num: " + currentUserRes[y] + "====" + currentCard[z].resourceName); 
              if(currentUserRes[y] == currentCard[z].resourceName ) {
                  currentCard[z].userQueue.push(curr.userName);
                  console.log("hereee")
              }
            }
            console.log(currentCard);
            // let currentCardName = currentCard.resourceName
            
          }
        }

        // this.distribute(this.resourceCardArray);
        console.log("Resource Cards:");
        console.log(this.resourceCardArray);
      return this.resourceCardArray
  }

  
  //generate n number of object resources
  generateUsersObjects(arr, limit){
    
    this.arrayOfUsersObject = []
    let sorted: Array<number> = []
    let res: Array<number> = []
    let users: Array<number> = []
    let resTemp: Array<number> = []
    users = this.sortedUser
    // sorted = users.sort((n1,n2) => n1 - n2)
    res = this.generatedResources
    let i:number = 0;
    
        // create new object ----> queue , status, name, time, currentUser
      for(i; i != users.length; i++){
        this.userObject = {} as User
        this.userObject.userName = users[i];
        this.userObject.userTime = 0;
        this.userObject.userResourcesLim = this.Randomizer(this.min, this.randomResourceLimit);
        resTemp = this.randomResult(this.shuffle(res), this.userObject.userResourcesLim);
        sorted = resTemp.sort((n1,n2) => n1 - n2)
        // this.userObject.usersResources = this.objectResources(sorted);
        this.userObject.usersResources = sorted;
        // this.tally(sorted)
        this.arrayOfUsersObject.push(this.userObject) //push that object to an array of resource objects
        }
        
    console.log("Array of User Objects");
    console.log(this.arrayOfUsersObject);
    return this.arrayOfUsersObject
  }

  

  objectResources(arr){
    let temp: Array<Resource> = [];
    let hold: Resource;
      for(let i=0; i!=arr.length; i++){
        this.resourceObject = {} as Resource
        this.resourceObject.name = arr[i]
        this.resourceObject.time = this.Randomizer(this.min, this.max)
        this.userObject.userTime += this.resourceObject.time
        this.resourceObject.status = true;
        temp.push(this.resourceObject);
        hold = this.resourceObject
      }
    return temp;
  }

  //add the resources to the resource cards
  distribute(arr){
    
    for(let d = 0; d != arr.length; d++){


    }
  }
}
