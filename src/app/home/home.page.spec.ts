import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { HomePage } from './home.page'
import { AssetService } from '../shared/services/asset.service';
import { ToastController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomePage', () => {
  let component: HomePage
  let fixture: ComponentFixture<HomePage>

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents()

    fixture = TestBed.createComponent(HomePage)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))
})

describe('HomePage test cases', () => {
  let component: HomePage;
  let assetServiceSpy: jasmine.SpyObj<AssetService>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;

  beforeEach(waitForAsync(() => {
    const assetServiceSpyObj = jasmine.createSpyObj('AssetService', ['getAll']);
    const toastControllerSpyObj = jasmine.createSpyObj('ToastController', ['create']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: AssetService, useValue: assetServiceSpyObj },
        { provide: ToastController, useValue: toastControllerSpyObj }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    component = TestBed.createComponent(HomePage).componentInstance;
    assetServiceSpy = TestBed.inject(AssetService) as jasmine.SpyObj<AssetService>;
    toastControllerSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch assets on initialization', () => {
    const assets = [{
      id: 'string',
      type: 'string',
      name: 'string',
      locationId: 'string',
      locationName: 'string'
    }];
    assetServiceSpy.getAll.and.returnValue(of(assets));

    component.ionViewWillEnter();

    expect(component.assets).toEqual(assets);
  });

  it('should display error toast if fetching assets fails', () => {
    const error = 'Failed to fetch assets';
    assetServiceSpy.getAll.and.returnValue(throwError(error));

    component.ionViewWillEnter();

    expect(toastControllerSpy.create).toHaveBeenCalledWith({
      message: 'An error occurred while fetching assets. Please try again later.',
      color: 'danger',
      position: 'top'
    });
  });
});
