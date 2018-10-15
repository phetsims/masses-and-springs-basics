// Copyright 2018, University of Colorado Boulder

/**
 * Panel that manages the visibility of reference lines.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var Color = require( 'SCENERY/util/Color' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );

  // strings
  var restingPositionString = require( 'string!MASSES_AND_SPRINGS_BASICS/restingPosition' );
  var movableLineString = require( 'string!MASSES_AND_SPRINGS/movableLine' );
  var periodTraceString = require( 'string!MASSES_AND_SPRINGS/periodTrace' );
  var unstretchedLengthString = require( 'string!MASSES_AND_SPRINGS_BASICS/unstretchedLength' );

  // constants
  var CONTENT_MAX_WIDTH = 115;
  var CONTENT_SPACING = 36;

  /**
   * @param {MassesAndSpringsModel} model
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function LineOptionsNode( model, tandem, options ) {

    options = _.extend( {
      fill: MassesAndSpringsConstants.PANEL_FILL,
      tandem: tandem.createTandem( 'lineOptionsPanel' ),
      minWidth: MassesAndSpringsConstants.PANEL_MIN_WIDTH + 10,
      enableMovableLine: true,
      enablePeriodTrace: false
    }, options );

    Node.call( this, options );

    // Lines added for reference in panel
    var greenLine = MassesAndSpringsConstants.CREATE_LINE_ICON( new Color( 'rgb(0, 180, 0)' ), tandem.createTandem( 'greenLine' ) );
    var blueLine = MassesAndSpringsConstants.CREATE_LINE_ICON( new Color( 'rgb( 65, 66, 232 )' ), tandem.createTandem( 'blueLine' ) );
    var redLine = MassesAndSpringsConstants.CREATE_LINE_ICON( new Color( 'rgb( 255, 0, 0 )' ), tandem.createTandem( 'redLine' ) );

    var alignGroup = new AlignGroup( { matchVertical: false } );

    var unstretchedLengthAlignBox = new AlignBox( new Text( unstretchedLengthString, {
      font: MassesAndSpringsConstants.TITLE_FONT,
      maxWidth: CONTENT_MAX_WIDTH,
      tandem: tandem.createTandem( 'unstretchedLengthString' )
    } ), { xAlign: 'left', group: alignGroup } );

    var movableLineAlignBox = new AlignBox( new Text( movableLineString, {
      font: MassesAndSpringsConstants.TITLE_FONT,
      maxWidth: CONTENT_MAX_WIDTH,
      tandem: tandem.createTandem( 'movableLineString' )
    } ), { xAlign: 'left', group: alignGroup } );

    var restingPositionAlignBox = new AlignBox( new Text( restingPositionString, {
      font: MassesAndSpringsConstants.TITLE_FONT,
      maxWidth: CONTENT_MAX_WIDTH,
      tandem: tandem.createTandem( 'restingPositionString' )
    } ), { xAlign: 'left', group: alignGroup } );

    // Create checkboxes using align boxes above
    var lineOptionsCheckboxGroup = new VerticalCheckboxGroup( [ {
      node: new HBox( { children: [ unstretchedLengthAlignBox, blueLine ], spacing: CONTENT_SPACING } ),
      property: model.naturalLengthVisibleProperty
    }, {
      node: new HBox( { children: [ restingPositionAlignBox, greenLine ], spacing: CONTENT_SPACING } ),
      property: model.equilibriumPositionVisibleProperty
    } ], {
      checkboxOptions: {
        boxWidth: 16,
        spacing: 8
      },
      tandem: tandem.createTandem( 'lineOptionsCheckboxGroup' )
    } );

    if ( options.enableMovableLine ) {
      lineOptionsCheckboxGroup = new VerticalCheckboxGroup( [ {
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
    }

    if ( options.enableMovableLine && options.enablePeriodTrace ) {
      lineOptionsCheckboxGroup = new VerticalCheckboxGroup( [ {
        node: new HBox( { children: [ unstretchedLengthAlignBox, blueLine ], spacing: CONTENT_SPACING } ),
        property: model.naturalLengthVisibleProperty
      }, {
        node: new HBox( { children: [ restingPositionAlignBox, greenLine ], spacing: CONTENT_SPACING } ),
        property: model.equilibriumPositionVisibleProperty
      }, {
        node: new HBox( { children: [ movableLineAlignBox, redLine ], spacing: CONTENT_SPACING } ),
        property: model.movableLineVisibleProperty
      },{
        node: new Text( periodTraceString, {
          font: MassesAndSpringsConstants.TITLE_FONT,
          maxWidth: CONTENT_MAX_WIDTH,
          tandem: tandem.createTandem( 'periodTraceString' )
        } ),
        property: model.firstSpring.periodTraceVisibilityProperty
      } ], {
        checkboxOptions: {
          boxWidth: 16,
          spacing: 8
        },
        tandem: tandem.createTandem( 'lineOptionsCheckboxGroup' )
      } );
    }

    var lineOptionsControlsVBox = new VBox( {
        children: [
          lineOptionsCheckboxGroup
        ],
        align: 'left',
        tandem: tandem.createTandem( 'lineOptionsControlsVBox' )
      }
    );
    this.addChild( lineOptionsControlsVBox );
  }

  massesAndSpringsBasics.register( 'LineOptionsNode', LineOptionsNode );

  return inherit( Node, LineOptionsNode );
} );