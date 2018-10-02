// Copyright 2018, University of Colorado Boulder

/**
 * Common screen view for vectors screen.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var massesAndSpringsBasics = require( 'MASSES_AND_SPRINGS_BASICS/massesAndSpringsBasics' );
  var TwoSpringScreenView = require( 'MASSES_AND_SPRINGS/common/view/TwoSpringScreenView' );
  var ReferenceLineNode = require( 'MASSES_AND_SPRINGS/common/view/ReferenceLineNode' );
  var LineOptionsPanel = require('MASSES_AND_SPRINGS_BASICS/common/view/LineOptionsNode');
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var EQUILIBRIUM_LINE_FILL = new Color('rgb( 0, 180, 0 )');

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
    var firstSpringEquilibriumLineNode = new ReferenceLineNode(
      this.modelViewTransform,
      model.firstSpring,
      model.firstSpring.massEquilibriumYPositionProperty,
      firstMassEquilibriumVisibilityProperty, {
        stroke: EQUILIBRIUM_LINE_FILL
      }
    );

    // Initializes equilibrium line for second spring
    var secondSpringEquilibriumLineNode = new ReferenceLineNode(
      this.modelViewTransform,
      model.secondSpring,
      model.secondSpring.massEquilibriumYPositionProperty,
      secondMassEquilibriumVisibilityProperty, {
        stroke: EQUILIBRIUM_LINE_FILL
      }
    );

    // Reference lines from indicator visibility box
    this.addChild( firstSpringEquilibriumLineNode );
    this.addChild( secondSpringEquilibriumLineNode );

    // We do this to prevent overlap with the massNodes.
    firstSpringEquilibriumLineNode.moveToBack();
    secondSpringEquilibriumLineNode.moveToBack();

    // Contains visibility options for the reference lines and displacement arrow
    var lineOptionsPanel = new LineOptionsPanel( model, tandem, { enableMovableLine: false } );

    // Panel that will display all the toggleable options.
    var optionsPanel = this.createOptionsPanel( lineOptionsPanel, this.rightPanelAlignGroup, tandem );

    this.addChild( optionsPanel );
    optionsPanel.moveToBack();

    // Move this plane to the back of the scene graph
    this.backgroundDragNode.moveToBack();

    this.visibleBoundsProperty.link( function() {
      optionsPanel.rightTop = new Vector2( self.panelRightSpacing, self.springSystemControlsNode.top );
    } );
  }

  massesAndSpringsBasics.register( 'StretchScreenView', StretchScreenView );

  return inherit( TwoSpringScreenView, StretchScreenView );
} );