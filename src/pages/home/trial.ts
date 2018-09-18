
//   execute(arr){
//     arr = this.resourceCardArray
//     let order = this.exeflow
//     let ctr: number;
//     console.log("order: ")
//     console.log(order)
//     console.log("arr: ")
//     console.log(arr)
    
//     while( order.length != 0){
//       for(let z = 0; z != order.length; z++){
//         for(let x = 0 ; x != arr.length; x++){
//           console.log(arr[x])
//           for(let j = 0; j != arr[x].queueList.length; j++){
//             let char = arr[x].queueList[j].name

//             // console.log(char)
//             if(char == order[z].name){
//               ctr = order[z].time
//               while(ctr != 0){
//                 ctr = ctr - 1;
//                 console.log("ctr: " + ctr);
//               }
//               // order[z].time = ctr
//               arr[x].users.pop()
//               order[z].status = true
//             }
//             // arr[x].queueList[j].s
//           }
          
//           // arr[x].resourceStatus = true
//         }  
//       }
//       order.pop()
//     }
//     console.log(arr)
//     return arr;
//   } 
