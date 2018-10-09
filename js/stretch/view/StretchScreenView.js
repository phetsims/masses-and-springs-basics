// Copyright 2018, University of Colorado Boulder

/**
 * View for Stretch screen.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DraggableRulerNode = require( 'MASSES_AND_SPRINGS/common/view/DraggableRulerNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  var MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  var OscillatingSpringNode = require( 'MASSES_AND_SPRINGS/common/view/OscillatingSpringNode' );
  var TwoSpringScreenView = require( 'MASSES_AND_SPRINGS/common/view/TwoSpringScreenView' );
  var Property = require( 'AXON/Property' );
  var ReferenceLineNode = require( 'MASSES_AND_SPRINGS/common/view/ReferenceLineNode' );
  var Shelf = require( 'MASSES_AND_SPRINGS/common/view/Shelf' );
  var LineOptionsNode = require( 'MASSES_AND_SPRINGS_BASICS/common/view/LineOptionsNode' );
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
      model.firstSpring.massEquilibriumYPositionProperty,
      firstMassEquilibriumVisibilityProperty, {
        stroke: MassesAndSpringsColorProfile.restingPositionProperty
      }
    );

    // Initializes equilibrium line for second spring
    var secondMassEquilibriumLineNode = new ReferenceLineNode(
      this.modelViewTransform,
      model.secondSpring,
      model.secondSpring.massEquilibriumYPositionProperty,
      secondMassEquilibriumVisibilityProperty, {
        stroke: MassesAndSpringsColorProfile.restingPositionProperty
      }
    );

    // Reference lines from indicator visibility box
    this.addChild( firstMassEquilibriumLineNode );
    this.addChild( secondMassEquilibriumLineNode );

    // We do this to prevent overlap with the massNodes.
    firstMassEquilibriumLineNode.moveToBack();
    secondMassEquilibriumLineNode.moveToBack();

    // Contains visibility options for the reference lines and displacement arrow
    var lineOptionsPanel = new LineOptionsNode( model, tandem, { enableMovableLine: false } );

    // Panel that will display all the toggleable options.
    var optionsPanel = this.createOptionsPanel( lineOptionsPanel, this.rightPanelAlignGroup, tandem );

    this.addChild( optionsPanel );
    optionsPanel.moveToBack();

    // TODO: We are reinitializing this.springNodes. Is this the best way to handle this? Ask JO
    // @public {Array.<OscillatingSpringNode>} Initialize a new array of springNodes with a different color selection.
    this.springNodes = model.springs.map( function( spring ) {
      var springNode = new OscillatingSpringNode(
        spring,
        self.modelViewTransform,
        tandem.createTandem( 'oscillatingSpringNode' ), {
          leftEndLength: -10,
          frontColor: new Color('rgb( 227, 153, 221 )'),
          middleColor: new Color('rgb( 185, 0, 169 )'),
          backColor: new Color('rgb( 93, 0, 85 )')
        }
      );
      self.addChild( springNode );
      return springNode;
    } );
    this.springSystemControlsNode.moveToFront();

    // @public {DraggableRulerNode}
    this.rulerNode = new DraggableRulerNode(
      this.modelViewTransform,
      this.visibleBoundsProperty.get(),
      Vector2.ZERO,
      new Property( true ),
      function() { },
      tandem.createTandem( 'rulerNode' )
    );
    this.addChild( this.rulerNode );

    // Move this plane to the back of the scene graph
    this.backgroundDragNode.moveToBack();

    // Shelves used for masses
    var labeledMassesShelf = new Shelf( tandem, {
      rectHeight: 7,
      rectWidth: 185,
      left: this.springSystemControlsNode.left - 147,
      rectY: this.modelViewTransform.modelToViewY( MassesAndSpringsConstants.FLOOR_Y ) - this.shelf.rectHeight
    } );
    this.addChild(labeledMassesShelf);
    labeledMassesShelf.moveToBack();

    var mysteryMassesShelf = new Shelf( tandem, {
      rectHeight: 7,
      rectWidth: 120,
      left: this.springSystemControlsNode.left + 62,
      rectY: this.modelViewTransform.modelToViewY( MassesAndSpringsConstants.FLOOR_Y ) - this.shelf.rectHeight
    } );
    this.addChild(mysteryMassesShelf);
    mysteryMassesShelf.moveToBack();

    this.visibleBoundsProperty.link( function() {
      optionsPanel.rightTop = new Vector2( self.panelRightSpacing, self.springSystemControlsNode.top );
      self.rulerNode.positionProperty.set( optionsPanel.rightBottom.plusXY( 0, self.spacing ) );
    } );

    // Reset call here sets the ruler to its default position rather than resetting the positionProperty
    this.resetAllButton.addListener( function() {
      self.rulerNode.positionProperty.set( optionsPanel.rightBottom.plusXY( 0, self.spacing ) );
    } );
  }

  massesAndSpringsBasics.register( 'StretchScreenView', StretchScreenView );

  return inherit( TwoSpringScreenView, StretchScreenView );
} );