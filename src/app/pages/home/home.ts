import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  clubs =[
    {id:'RPWST', name:'Republican Professional Women of St. Tammany',slug:'republican-professional-women',logo: 'https://images.ctfassets.net/dew243p4qvo2/1RTrd9UAe13gyMLPBEdCp5/a86d9f6259da73db2dc3493b9acfd092/RPWST-Logo.png'},
    {id:'MRW', name:'Mandeville Republican Women',slug:'mandeville-republican-women',logo: 'https://images.ctfassets.net/dew243p4qvo2/16u9pQFZnFHlCMyU0sotWx/d7e1fb384e49333fe06f5be5d4da00de/Mandeville_Republican_Women.png'},
    {id:'BLRW', name:'Bayou Lacombe Republican Womenn',slug:'bayou-lacombe-republican-women',logo: 'https://images.ctfassets.net/dew243p4qvo2/71yMDrCIqPYOBNml1Bt1dH/72bda1f15927cdf43515c1b5f68302dd/Bayou_Lacombe_Republican_Women.jpg'},
    {id:'ESTRW', name:'East St. Tammany Republican Women',slug: null,logo: 'https://images.ctfassets.net/dew243p4qvo2/6Eo7pHe9q2Hjt8Kw74sGXd/ddb6bc3526933e768a367d99297f67ac/323716085_6097348653629864_2360661956436649884_n.jpg'},
    {id:'NSRMC', name:'Northshore Republican Men\'s Club',slug: null,logo: 'https://images.ctfassets.net/dew243p4qvo2/1aK9apvsdjdWyVbi4fm9Qh/070f2f56a8593091a454f26947cbb089/Screenshot_2017-02-10_11.36.37.png'},
  ] 

}
