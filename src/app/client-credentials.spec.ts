import { TestBed } from '@angular/core/testing';

import { ClientCredentials } from './client-credentials';

describe('ClientCredentials', () => {
  let service: ClientCredentials;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientCredentials);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
