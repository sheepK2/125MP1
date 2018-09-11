import { User } from './user.interface';

export interface ResourceCard {
    userQueue: Array<User>;
    resourceStatus: boolean;
    resourceName: number;
    resourceTime: number; //total time of resource usage
    currentUser: number;
}