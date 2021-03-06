import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBedHelper } from '../test/test-bed.helper';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

// skipping until can apply fix. See: https://github.com/angular/angular/issues/25837
xdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const config = TestBedHelper.createComponentConfig().addImports(AppModule).getConfig();

  TestBedHelper.autoConfigureTestingModule(config);

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
