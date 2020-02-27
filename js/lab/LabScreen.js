// Copyright 2018-2020, University of Colorado Boulder

/**
 * The Lab screen for Masses and Springs: Basics.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import MassesAndSpringsColorProfile from '../../../masses-and-springs/js/common/view/MassesAndSpringsColorProfile.js';
import LabModel from '../../../masses-and-springs/js/lab/model/LabModel.js';
import merge from '../../../phet-core/js/merge.js';
import Image from '../../../scenery/js/nodes/Image.js';
import labHomeScreenImage from '../../images/lab_screen_icon_png.js';
import massesAndSpringsBasicsStrings from '../masses-and-springs-basics-strings.js';
import massesAndSpringsBasics from '../massesAndSpringsBasics.js';
import LabScreenView from './view/LabScreenView.js';

const screenLabString = massesAndSpringsBasicsStrings.screen.lab;

// image

class LabScreen extends Screen {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   *
   */
  constructor( tandem, options ) {

    options = merge( {
      basicsVersion: true,
      name: screenLabString,
      backgroundColorProperty: MassesAndSpringsColorProfile.backgroundProperty,
      homeScreenIcon: new Image( labHomeScreenImage ),
      tandem: tandem
    }, options );

    super(
      () => new LabModel( tandem.createTandem( 'model' ), true, options ),
      model => new LabScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

massesAndSpringsBasics.register( 'LabScreen', LabScreen );
export default LabScreen;