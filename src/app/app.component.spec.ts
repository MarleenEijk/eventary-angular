import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'], { url: '/login' });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).ok;
  });

  it(`should have the 'eventary-angular' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).equal('eventary-angular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).contain('Hello, eventary-angular');
  });

  it('should return true for isLoginPage() when url is /login', () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'], { url: '/login' });
    TestBed.overrideProvider(Router, { useValue: routerSpy });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLoginPage()).true;
  });

  it('should return false for isLoginPage() when url is not /login', () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'], { url: '/storage' });
    TestBed.overrideProvider(Router, { useValue: routerSpy });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLoginPage()).false;
  });

  it('should have a selector "app-root"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const element = fixture.nativeElement as HTMLElement;
    expect(element.tagName.toLowerCase()).equal('app-root');
  });
});