'use strict';

describe('Service: gods', function () {

  // load the service's module
  beforeEach(module('smiteApp.gods'));

  // instantiate service
  var gods;
  beforeEach(inject(function (_gods_) {
    gods = _gods_;
  }));

  it('should do something', function () {
    expect(!!gods).to.be.true;
  });

});
