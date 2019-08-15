import { TestBed } from '@angular/core/testing';

import { SegmentParserService } from './segment-parser.service';

describe('SegmentParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SegmentParserService = TestBed.get(SegmentParserService);
    expect(service).toBeTruthy();
  });
});
