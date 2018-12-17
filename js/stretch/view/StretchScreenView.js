// Copyright 2018, University of Colorado Boulder

/**
 * View for Stretch screen.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DraggableRulerNode = require( 'MASSES_AND_SPRINGS/common/view/DraggableRulerNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineOptionsNode = require( 'MASSES_AND_SPRINGS_BASICS/common/view/LineOptionsNode' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  var MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  var PaintColorProperty = require( 'SCENERY/util/PaintColorProperty' );
  var Property = require( 'AXON/Property' );
  var ReferenceLineNode = require( 'MASSES_AND_SPRINGS/common/view/ReferenceLineNode' );
  var Shelf = require( 'MASSES_AND_SPRINGS/common/view/Shelf' );
  var TwoSpringScreenView = require( 'MASSES_AND_SPRINGS/common/view/TwoSpringScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {VectorsModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function StretchScreenView( model, tandem ) {

    // Calls common two spring view
    TwoSpringScreenView.call( this, model, tandem );
    var self = this;

    // Equilibrium of mass is dependent on the mass being attached and the visibility of the equilibrium line.
    var firstMassEquilibriumVisibilityProperty = new DerivedProperty( [ model.equilibriumPositionVisibleProperty, model.firstSpring.massAttachedProperty ],
      function( equilibriumPositionVisible, massAttached ) {
        return !!massAttached && equilibriumPositionVisible;
      } );
    var secondMassEquilibriumVisibilityProperty = new DerivedProperty( [ model.equilibriumPositionVisibleProperty, model.secondSpring.massAttachedProperty ],
      function( equilibriumPositionVisible, massAttached ) {
        return !!massAttached && equilibriumPositionVisible;
      } );

    // Initializes equilibrium line for first spring
    var firstMassEquilibriumLineNode = new ReferenceLineNode(
      this.modelViewTransform,
      model.firstSpring,
      model.firstSpring.equilibriumYPositionProperty,
      firstMassEquilibriumVisibilityProperty, {
        stroke: MassesAndSpringsColorProfile.restingPositionProperty
      }
    );

    // Initializes equilibrium line for second spring
    var secondMassEquilibriumLineNode = new ReferenceLineNode(
      this.modelViewTransform,
      model.secondSpring,
      model.secondSpring.equilibriumYPositionProperty,
      secondMassEquilibriumVisibilityProperty, {
        stroke: MassesAndSpringsColorProfile.restingPositionProperty
      }
    );

    // Setting specific colors for this screen's springs.
    this.springFrontColorProperty.set( new PaintColorProperty( 'rgb( 162, 106, 172 )' ) );
    this.springMiddleColorProperty.set( new PaintColorProperty( 'rgb( 100, 6, 117 )' ) );
    this.springBackColorProperty.set( new PaintColorProperty( 'rgb( 50, 3, 58 )' ) );

    // Adding system controls to scene graph
    this.addChild( this.springSystemControlsNode );

    // Reference lines from indicator visibility box
    this.addChild( this.firstNaturalLengthLineNode );
    this.addChild( this.secondNaturalLengthLineNode );
    this.addChild( firstMassEquilibriumLineNode );
    this.addChild( secondMassEquilibriumLineNode );

    // The movable line will always be visible on this screen.
    this.addChild( this.movableLineNode );

    // Adding layers for interactive elements
    this.addChild( this.massLayer );
    this.addChild( this.toolsLayer );

    // Contains visibility options for the reference lines and displacement arrow
    var lineOptionsPanel = new LineOptionsNode( model, tandem );

    // Panel that will display all the toggleable options.
    var optionsPanel = this.createOptionsPanel( lineOptionsPanel, this.rightPanelAlignGroup, tandem );

    this.addChild( optionsPanel );
    optionsPanel.moveToBack();

    // Move this plane to the back of the scene graph
    this.backgroundDragPlane.moveToBack();

    // Shelves used for masses
    var labeledMassesShelf = new Shelf( tandem, {
      rectHeight: 7,
      rectWidth: 185,
      left: this.layoutBounds.left + this.spacing,
      rectY: this.modelViewTransform.modelToViewY( MassesAndSpringsConstants.FLOOR_Y ) - this.shelf.rectHeight
    } );
    this.addChild( labeledMassesShelf );
    labeledMassesShelf.moveToBack();

    var mysteryMassesShelf = new Shelf( tandem, {
      rectHeight: 7,
      rectWidth: 120,
      left: labeledMassesShelf.right + this.spacing * 2,
      rectY: this.modelViewTransform.modelToViewY( MassesAndSpringsConstants.FLOOR_Y ) - this.shelf.rectHeight
    } );
    this.addChild( mysteryMassesShelf );
    mysteryMassesShelf.moveToBack();

    this.visibleBoundsProperty.link( function() {
      optionsPanel.rightTop = new Vector2( self.panelRightSpacing, self.springSystemControlsNode.top );
    } );

    // @public {DraggableRulerNode}
    this.rulerNode = new DraggableRulerNode(
      this.modelViewTransform,
      this.visibleBoundsProperty.get(),
      new Vector2( this.visibleBoundsProperty.value.right - this.spacing, optionsPanel.bottom + this.spacing ),
      new Property( true ),
      function() { },
      tandem.createTandem( 'rulerNode' )
    );
    this.addChild( this.rulerNode );

    // Reset call here sets the ruler to its default position rather than resetting the positionProperty
    this.resetAllButton.addListener( function() {
      self.rulerNode.positionProperty.set( optionsPanel.rightBottom.plusXY( 0, self.spacing ) );
    } );
  }

  massesAndSpringsBasics.register( 'StretchScreenView', StretchScreenView );

  return inherit( TwoSpringScreenView, StretchScreenView );
} );