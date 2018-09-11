import { User } from './user.interface';
import { Resource } from './resource.interface';

export interface ResourceCard {
    userQueue: Array<Resource>;
    resourceStatus: boolean;
    resourceName: number;
    resourceTime: number; //total time of resource usage
    currentUser: number;
}