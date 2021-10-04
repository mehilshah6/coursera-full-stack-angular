import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeadersService {
  
  constructor() { }
  
  getLeaders() : Leader[] {
    return LEADERS;
  }
  
  getLeaderById(id : string) : Leader {
    return LEADERS[Number(id)];
  }
  
  getFeaturedLeader() : Leader {
    return LEADERS.filter((leader) => leader.featured)[0];
  }
}
