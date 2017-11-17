import {Test} from '@nestjs/testing';
import {TestingModule} from '@nestjs/testing/testing-module';
import {AirportController} from './Airport.controller';
import {expect} from 'chai';

describe('AirportController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [
        AirportController
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let controller: AirportController;
  beforeEach(() => {
    controller = module.get(AirportController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
