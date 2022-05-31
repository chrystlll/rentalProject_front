import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place-det',
  templateUrl: './place-det.component.html',
  styleUrls: ['./place-det.component.css']
})
export class PlaceDetComponent implements OnInit {

  placeIdFromRoute: any;

  constructor(private route : ActivatedRoute) { 
    const routeParams = this.route.firstChild.params;
        routeParams.subscribe(params => {
            this.placeIdFromRoute = params['placeId'];

        })
  }

  ngOnInit(): void {
  }

}
