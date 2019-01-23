// Copyright 2018, University of Colorado Boulder

/**
 * Panel that manages the visibility of reference lines.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  const Color = require( 'SCENERY/util/Color' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  const MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );

  // strings
  const movableLineString = require( 'string!MASSES_AND_SPRINGS/movableLine' );
  const restingPositionString = require( 'string!MASSES_AND_SPRINGS_BASICS/restingPosition' );
  const unstretchedLengthString = require( 'string!MASSES_AND_SPRINGS_BASICS/unstretchedLength' );

  // constants
  const CONTENT_MAX_WIDTH = 122;
  const CONTENT_SPACING = 32;

  class LineOptionsNode extends Node {

    /**
     * @param {MassesAndSpringsModel} model
     * @param {Tandem} tandem
     * @param {Object} options
     */
    constructor( model, tandem, options ) {

      options = _.extend( {
        fill: MassesAndSpringsConstants.PANEL_FILL,
        tandem: tandem.createTandem( 'lineOptionsPanel' ),
        minWidth: MassesAndSpringsConstants.PANEL_MIN_WIDTH + 10,
        enablePeriodTrace: false
      }, options );

      super( options );

      // Lines added for reference in panel
      const greenLine = MassesAndSpringsConstants.CREATE_LINE_ICON( 'rgb(0, 180, 0)' );
      const blueLine = MassesAndSpringsConstants.CREATE_LINE_ICON( 'rgb( 65, 66, 232 )' );
      const redLine = MassesAndSpringsConstants.CREATE_LINE_ICON( 'rgb( 255, 0, 0 )' );

      // Used for checkbox texts
      const alignGroup = new AlignGroup( { matchVertical: false } );

      // Alignbox for unstretched length line Text
      const unstretchedLengthAlignBox = new AlignBox( new Text( unstretchedLengthString, {
        font: MassesAndSpringsConstants.TITLE_FONT,
        maxWidth: CONTENT_MAX_WIDTH,
        tandem: tandem.createTandem( 'unstretchedLengthString' )
      } ), { xAlign: 'left', group: alignGroup } );

      // Alignbox for movable line Text
      const movableLineAlignBox = new AlignBox( new Text( movableLineString, {
        font: MassesAndSpringsConstants.TITLE_FONT,
        maxWidth: CONTENT_MAX_WIDTH,
        tandem: tandem.createTandem( 'movableLineString' )
      } ), { xAlign: 'left', group: alignGroup } );

      // Alignbox for resting position line  Text
      const restingPositionAlignBox = new AlignBox( new Text( restingPositionString, {
        font: MassesAndSpringsConstants.TITLE_FONT,
        maxWidth: CONTENT_MAX_WIDTH,
        tandem: tandem.createTandem( 'restingPositionString' )
      } ), { xAlign: 'left', group: alignGroup } );

      // Checkbox group for line options
      let lineOptionsCheckboxGroup = new VerticalCheckboxGroup( [ {
        node: new HBox( { children: [ unstretchedLengthAlignBox, blueLine ], spacing: CONTENT_SPACING } ),
        property: model.naturalLengthVisibleProperty
      }, {
        node: new HBox( { children: [ restingPositionAlignBox, greenLine ], spacing: CONTENT_SPACING } ),
        property: model.equilibriumPositionVisibleProperty
      }, {
        node: new HBox( { children: [ movableLineAlignBox, redLine ], spacing: CONTENT_SPACING } ),
        property: model.movableLineVisibleProperty
      } ], {
        checkboxOptions: {
          boxWidth: 16,
          spacing: 8
        },
        tandem: tandem.createTandem( 'lineOptionsCheckboxGroup' )
      } );

      const lineOptionsControlsVBox = new VBox( {
          children: [
            lineOptionsCheckboxGroup
          ],
          align: 'left',
          tandem: tandem.createTandem( 'lineOptionsControlsVBox' )
        }
      );
      this.addChild( lineOptionsControlsVBox );
    }
  }

  return massesAndSpringsBasics.register( 'LineOptionsNode', LineOptionsNode );
} );