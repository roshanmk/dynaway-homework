import { Component } from '@angular/core'
import { AssetService } from '../shared/services/asset.service'
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  assets: any = []
  placeholders: any = Array(6).fill(0);
  constructor(private assetService: AssetService, private toastController: ToastController) { }

  ionViewWillEnter(): void {
    this.assets = []
    this.assetService.getAll().subscribe({
      next: assets => { this.assets = assets },
      error: error => {
        this.presentErrorToast();
        console.error('Error fetching assets:', error);
      }
    })
  }
  
  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'An error occurred while fetching assets. Please try again later.',
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }
}
