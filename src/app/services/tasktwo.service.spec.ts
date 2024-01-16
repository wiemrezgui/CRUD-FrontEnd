import { TestBed } from '@angular/core/testing';

import { TasktwoService } from './tasktwo.service';

describe('TasktwoService', () => {
  let service: TasktwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasktwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
