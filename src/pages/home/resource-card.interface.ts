import { User } from './user.interface';
import { Resource } from './resource.interface';

export interface ResourceCard {
    queueList: Array<Resource>;
    resourceStatus: boolean;
    users: Array<number>;   
    resourceName: number;
    resourceTime: number; //total time of resource usage
    currentUser: number;
}