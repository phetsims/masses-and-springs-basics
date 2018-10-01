// Copyright 2018, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyScreen = require( 'MASSES_AND_SPRINGS/energy/EnergyScreen' );
  var StretchScreen = require( 'MASSES_AND_SPRINGS_BASICS/stretch/StretchScreen' );
  var LabScreen = require( 'MASSES_AND_SPRINGS/lab/LabScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );
  var VectorsScreen = require( 'MASSES_AND_SPRINGS/vectors/VectorsScreen' );

  // strings
  var massesAndSpringsBasicsTitleString = require( 'string!MASSES_AND_SPRINGS_BASICS/masses-and-springs-basics.title' );

  // constants
  var tandem = Tandem.rootTandem;

  var simOptions = {
    credits: {
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      qualityAssurance: ''
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( massesAndSpringsBasicsTitleString, [
      new StretchScreen( tandem.createTandem( 'stretchScreen' ) ),
      new VectorsScreen( tandem.createTandem( 'vectorsScreen' ), { basicsVersion: true } ),
      new EnergyScreen( tandem.createTandem( 'energyScreen' ), { basicsVersion: true } ),
      new LabScreen( tandem.createTandem( 'labScreen' ), { basicsVersion: true } )
    ], simOptions );
    sim.start();
  } );
} );