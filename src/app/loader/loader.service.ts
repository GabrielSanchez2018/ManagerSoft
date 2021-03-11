import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  //public variable
  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  constructor() { }
}
