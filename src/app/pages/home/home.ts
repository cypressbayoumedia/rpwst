import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home implements OnInit, OnDestroy {
  carouselImages: string[] = [
    'https://images.unsplash.com/photo-1561061715-ad0d1ade0b73?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNhJTIwZmxhZ3N8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1625878450319-6b1a59ef5e30?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1665691584550-49fb9557a21e?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];
  currentImageIndex: number = 0;
  intervalId: any;

  clubs =[
    {id:'RPWST', name:'Republican Professional Women of St. Tammany',slug:'republican-professional-women',logo: 'https://images.ctfassets.net/dew243p4qvo2/1RTrd9UAe13gyMLPBEdCp5/a86d9f6259da73db2dc3493b9acfd092/RPWST-Logo.png'},
    {id:'MRW', name:'Mandeville Republican Women',slug:'mandeville-republican-women',logo: 'https://images.ctfassets.net/dew243p4qvo2/16u9pQFZnFHlCMyU0sotWx/d7e1fb384e49333fe06f5be5d4da00de/Mandeville_Republican_Women.png'},
    {id:'BLRW', name:'Bayou Lacombe Republican Women',slug:'bayou-lacombe-republican-women',logo: 'https://images.ctfassets.net/dew243p4qvo2/71yMDrCIqPYOBNml1Bt1dH/72bda1f15927cdf43515c1b5f68302dd/Bayou_Lacombe_Republican_Women.jpg'},
    // {id:'ESTRW', name:'East St. Tammany Republican Women',slug: null,logo: 'https://images.ctfassets.net/dew243p4qvo2/6Eo7pHe9q2Hjt8Kw74sGXd/ddb6bc3526933e768a367d99297f67ac/323716085_6097348653629864_2360661956436649884_n.jpg'},
    {id:'NSRMC', name:'Northshore Republican Men\'s Club',slug: null,logo: 'https://images.ctfassets.net/dew243p4qvo2/1aK9apvsdjdWyVbi4fm9Qh/070f2f56a8593091a454f26947cbb089/Screenshot_2017-02-10_11.36.37.png'},
  ] 

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 5000); // Change image every 5 seconds
  }

  stopCarousel(): void {
    clearInterval(this.intervalId);
  }

  changeImage(index: number): void {
    this.currentImageIndex = index;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.carouselImages.length;
  }

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

}
