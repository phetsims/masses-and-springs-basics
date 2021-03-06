// Copyright 2018-2020, University of Colorado Boulder

/**
 * The Bounce screen for Masses and Springs: Basics.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import MassesAndSpringsModel from '../../../masses-and-springs/js/common/model/MassesAndSpringsModel.js';
import MassesAndSpringsColorProfile from '../../../masses-and-springs/js/common/view/MassesAndSpringsColorProfile.js';
import merge from '../../../phet-core/js/merge.js';
import Image from '../../../scenery/js/nodes/Image.js';
import bounceHomeScreenImage from '../../images/bounce_screen_icon_png.js';
import massesAndSpringsBasicsStrings from '../massesAndSpringsBasicsStrings.js';
import massesAndSpringsBasics from '../massesAndSpringsBasics.js';
import BounceScreenView from './view/BounceScreenView.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';

const screenBounceString = massesAndSpringsBasicsStrings.screen.bounce;

class BounceScreen extends Screen {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {

    options = merge( {
      name: screenBounceString,
      backgroundColorProperty: MassesAndSpringsColorProfile.backgroundProperty,
      homeScreenIcon: new ScreenIcon( new Image( bounceHomeScreenImage ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem
    }, options );

    super( () => {

        //tandem reference for model
        const modelTandem = tandem.createTandem( 'model' );

        // model reference used for spring and mass creation
        const model = new MassesAndSpringsModel( modelTandem, options );
        model.basicsVersion = true;
        model.addDefaultSprings( modelTandem );
        model.addDefaultMasses( modelTandem );
        return model;
      },
      model => new BounceScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

massesAndSpringsBasics.register( 'BounceScreen', BounceScreen );
export default BounceScreen;