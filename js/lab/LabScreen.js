// Copyright 2018-2021, University of Colorado Boulder

/**
 * The Lab screen for Masses and Springs: Basics.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import MassesAndSpringsColors from '../../../masses-and-springs/js/common/view/MassesAndSpringsColors.js';
import LabModel from '../../../masses-and-springs/js/lab/model/LabModel.js';
import merge from '../../../phet-core/js/merge.js';
import Image from '../../../scenery/js/nodes/Image.js';
import labHomeScreenImage from '../../images/lab_screen_icon_png.js';
import massesAndSpringsBasicsStrings from '../massesAndSpringsBasicsStrings.js';
import massesAndSpringsBasics from '../massesAndSpringsBasics.js';
import LabScreenView from './view/LabScreenView.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';

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
      backgroundColorProperty: MassesAndSpringsColors.backgroundProperty,
      homeScreenIcon: new ScreenIcon( new Image( labHomeScreenImage ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
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