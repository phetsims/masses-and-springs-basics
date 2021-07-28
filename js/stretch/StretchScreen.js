// Copyright 2018-2021, University of Colorado Boulder

/**
 * The Stretch screen for Masses and Springs: Basics.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import MassesAndSpringsModel from '../../../masses-and-springs/js/common/model/MassesAndSpringsModel.js';
import MassesAndSpringsColors from '../../../masses-and-springs/js/common/view/MassesAndSpringsColors.js';
import merge from '../../../phet-core/js/merge.js';
import Image from '../../../scenery/js/nodes/Image.js';
import stretchHomeScreenImage from '../../images/stretch_screen_icon_png.js';
import massesAndSpringsBasicsStrings from '../massesAndSpringsBasicsStrings.js';
import massesAndSpringsBasics from '../massesAndSpringsBasics.js';
import StretchScreenView from './view/StretchScreenView.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';

const screenStretchString = massesAndSpringsBasicsStrings.screen.stretch;

// image
class StretchScreen extends Screen {
  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   *
   */
  constructor( tandem, options ) {

    options = merge( {
      name: screenStretchString,
      backgroundColorProperty: MassesAndSpringsColors.backgroundProperty,
      homeScreenIcon: new ScreenIcon( new Image( stretchHomeScreenImage ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem
    }, options );

    super( () => {

        // Reference for model tandem
        const modelTandem = tandem.createTandem( 'model' );

        // Reference for model used in spring and mass creation
        const model = new MassesAndSpringsModel( modelTandem, options );
        model.addDefaultSprings( modelTandem );
        model.addDefaultMasses( modelTandem );

        // It is intended that the stretch screen have a specific damping
        model.dampingProperty.set( 0.7 );
        return model;
      },
      model => new StretchScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

massesAndSpringsBasics.register( 'StretchScreen', StretchScreen );
export default StretchScreen;