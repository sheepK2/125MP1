import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//created Resource interface
import { ResourceCard } from './resource-card.interface';
import { Resource} from './resource.interface';
import { User } from './user.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  randomRange: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

  min: number = 2
  max: number = 5
  randomUserLimit: number;
  sortedRes: Array<number>;
  sortedUser: Array<number>;
  randomResourceLimit: number;
  generatedUsers: Array<number>;
  randomizedArray: Array<number>;  
  generatedResources: Array<number>; 

  userObject = {} as User //new Object
  resourceObject = {} as Resource //new Object
  resourceCard = {} as ResourceCard //new Object
  resourceCardArray: Array<ResourceCard>;
  display: Array<ResourceCard>;
  arrayOfUsersObject: Array<User>;
  resourceQueue: Array<Resource>;
  exeflow: Array<Resource>;
  interval: number;


  constructor(public navCtrl: NavController) {    }

  // initialization/ reset
  start() {
    console.log("Generating");
  
    console.log("Number of users:");
    this.randomUserLimit = this.Randomizer(this.min, this.max);
    console.log(this.randomUserLimit);

    console.log("Number of Resources:");
    this.randomResourceLimit = this.Randomizer(this.min, this.max);
    console.log(this.randomResourceLimit);
    
    console.log("Generating random resources and users");
    this.generate(this.randomRange);

    this.interval = setInterval(()=>{this.kafourier(this.resourceCardArray)}, 1000);
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
    return array
  }

  // returns the n number of elements needed
  randomResult(arr, size){
    this.randomizedArray = [];
    for(var lim = 0; lim != size; lim++){
      this.randomizedArray.push(arr[lim])
    }
    return this.randomizedArray;
  }

  // returns the generated n resources
  generateRandomResources(arr, size){
    let res: Array<number>;
    res = this.randomResult(this.shuffle(arr), size)
    return res;
  }

  // returns the generated n users
  generateRandomUsers(arr, size){
    let res: Array<number>;
    res = this.randomResult(this.shuffle(arr), size)
    return res;
  }

  // generates the random arrays and sorts it
  generate(arr){
    console.log("------ start ---------")
    this.generatedResources = this.generateRandomResources(arr, this.randomResourceLimit)
    this.generatedUsers = this.generateRandomUsers(arr, this.randomUserLimit)
    this.sortedRes = this.generatedResources.sort((n1,n2) => n1 - n2)
    this.sortedUser = this.generatedUsers.sort((n1,n2) => n1 - n2) 

    console.log("RES: " + this.sortedRes)
    console.log("USERS: " + this.sortedUser)

    this.generateResourceCard(this.sortedRes);
    this.usersResources(this.resourceCardArray);
    //this.execute(this.resourceCardArray)
    console.log("......... end ...........")
  }

  //generate n number of object resources
  generateResourceCard(arr){
    let curr: User;
    let i:number = 0;
    let currentCard: ResourceCard;
    let currentUserRes: Array<number>;
    this.resourceQueue = [];
    this.resourceCardArray = [];
    arr = this.sortedRes.sort((n1,n2) => n1 - n2);
    this.arrayOfUsersObject = this.generateUsersObjects(this.sortedUser, this.randomUserLimit);

      for(i; i != arr.length; i++){                 // create new object ----> queue , status, name, time, currentUser
        this.resourceCard = {} as ResourceCard
        this.resourceCard.resourceName = arr[i];
        this.resourceCard.resourceStatus = false;
        this.resourceCard.resourceTime = 0; 
        this.resourceCard.users = [];
        this.resourceCard.queueList = [];
        this.resourceCardArray.push(this.resourceCard) //resource card object  
        }
        let u = this.arrayOfUsersObject.length
        let r = this.resourceCardArray.length
        
        for(let x = 0; x != u; x++){ // loop one user
          curr = this.arrayOfUsersObject[x] //one user
          currentUserRes = curr.usersResources //res of that user
          
          for(let y = 0; y != currentUserRes.length; y++){ //loop resources of one user
  
            for(let z = 0; z != r; z++){
              currentCard = this.resourceCardArray[z]
              if(currentUserRes[y] == currentCard.resourceName ) {
                  currentCard.users.push(curr.userName);
              }
            }
          }
        }
        console.log("Resource Cards:");
        console.log(this.resourceCardArray);
      return this.resourceCardArray
    }
  
  //generate n number of random object resources
  generateUsersObjects(arr, limit){
    let res: Array<number> = [];
    this.arrayOfUsersObject = [];
    let users: Array<number> = [];
    let sorted: Array<number> = [];
    let resTemp: Array<number> = [];
    res = this.generatedResources;
    users = this.sortedUser;
    let i:number = 0;
    
      // create new object ----> username, time, resources limit and user's resources
      for(i; i != users.length; i++){
        this.userObject = {} as User
        this.userObject.userName = users[i];
        this.userObject.userTime = 0;
        this.userObject.userResourcesLim = this.Randomizer(this.min, this.randomResourceLimit);
        resTemp = this.randomResult(this.shuffle(res), this.userObject.userResourcesLim);
        sorted = resTemp.sort((n1,n2) => n1 - n2);
        this.userObject.usersResources = sorted;
        this.arrayOfUsersObject.push(this.userObject) //push that object to an array of resource objects
        }
    // console.log(this.arrayOfUsersObject);
    return this.arrayOfUsersObject
  }

  //make the userQueue array to as an array of resource object
  usersResources(arr){
    this.resourceObject = {} as Resource //new Object
    arr = this.resourceCardArray;
    this.resourceQueue = [];
    this.exeflow = [];
    let currArr: Array<number>
    let currCard = {} as ResourceCard
    for(let i = 0; i != arr.length; i++){
      currCard = arr[i]
      currArr = currCard.users
      for(let j = 0; j != currArr.length; j++){
        this.resourceObject = {} as Resource
        this.resourceObject.name = currArr[j];
        this.resourceObject.status = false;
        this.resourceObject.time = this.Randomizer(this.min, this.max)
        this.resourceQueue.push(this.resourceObject);
        currCard.queueList.push(this.resourceObject);  
        currCard.resourceTime += this.resourceObject.time;
        this.exeflow.push(this.resourceObject);
      }
    }
    // x.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    this.resourceCardArray.sort((a, b) => a.resourceName < b.resourceName ? -1 : a.resourceName >  b.resourceName ? 1 : 0);
    this.exeflow.sort((a, b) => a.name < b.name ? -1 : a.name >  b.name ? 1 : 0);
    console.log("Array of User Objects");
    console.log(this.resourceCardArray)
    console.log("Array execution flow");
    console.log(this.exeflow)
    return this.resourceCardArray;
  }

  kafourier(arr) {
    
    let totalTime = 0;
    for (let i = 0; i < this.resourceCardArray.length; i++) { //for all res card
      let currCard = this.resourceCardArray[i];
      totalTime += currCard.resourceTime;
    }

    let res = [];
    let temp: Array<Resource> = [];
    if(totalTime <= 0){
      clearInterval(this.interval);
    }

    for (let i = 0; i < this.resourceCardArray.length; i++) { //for all res card
      let currCard = this.resourceCardArray[i];
      let list = currCard.queueList;
      if(currCard.resourceTime > 0){
        if(list.length > 0){
          let topUser = list[0];
          list[0].time--;
          currCard.resourceTime--;

          if(list[0].time <= 0){
            list[0].status = true;
            list.shift();
            list.push(topUser);
          }
        }
      }  
    }
    console.log(this.resourceCardArray)
    return this.display
  }
}
