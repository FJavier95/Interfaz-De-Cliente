import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
// ...
export class PingComponent implements OnInit  {

  constructor(public http: HttpClient) {}
 
  ngOnInit(): void {
    console.log("ni de")
    this.http.get('https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/b6c60e30-eb68-11e9-a68c-7f438c0cbd6e/values/timeseries?keys=temperature')    
      .subscribe(
          
        data => console.log(data),
        err => console.log(err)
      );
    
      }
}