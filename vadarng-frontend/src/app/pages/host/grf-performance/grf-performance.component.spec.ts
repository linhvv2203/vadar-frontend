import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GrfPerformanceComponent } from "./grf-performance.component";

describe("GrfPerformanceComponent", () => {
  let component: GrfPerformanceComponent;
  let fixture: ComponentFixture<GrfPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GrfPerformanceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrfPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
