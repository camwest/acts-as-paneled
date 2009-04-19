jQuery.fn.actsAsPaneled = function(settings) {

  var actsAsPaneled = {
    
    settings: {
      panelClassName: "form_panel",      
      finishFunction: function(){}
    },
    
    initialize:function (htmlElement, settings) {
      this.settings = jQuery.extend(this.settings, settings);
      
      if (!this.settings.linksContainer) this.settings.linksContainer =htmlElement;        
      
      this.htmlElement = htmlElement;
      
      this.panels   = jQuery("." + this.settings.panelClassName);
      
      this.currentIndex = 0;
      
      this.updateDisplay();
      
      var self = this;
      
      jQuery(this.htmlElement).click(function(e) {
        self.delegateClickListener(e);
      });
      
      if (this.settings.linksContainer != this.htmlElement) {

        jQuery(this.settings.linksContainer).click(function(e) {
          self.delegateClickListener(e);
        });
      }
    },
    
    renderButtons: function(panelHTML) {
      if (this.panels.index(panelHTML) > 0) {
        jQuery(panelHTML).append(this.getPreviousButton());
      }

      if (this.panels.index(panelHTML) < this.panels.length - 1) {
        jQuery(panelHTML).append(this.getNextButton());        
      } 

      if (this.panels.index(panelHTML) == this.panels.length -1) {
        jQuery(panelHTML).append(this.getFinishButton());        
      }
    },
    
    getNextButton: function() {
      return "<a href='Javascript:void(0)' class='nextButton'>Next</a>";
    },
    
    getPreviousButton: function() {
      return "<a href='Javascript:void(0)' class='previousButton'>Previous</a>";      
    },
    
    getFinishButton: function() {
      return "<a href='Javascript:void(0)' class='finishButton'>Finish</a>";      
    },
    
    updateDisplay: function() {      
      if (this.panels.length > 0) {
        
        this.renderLinkList();

        this.panels.not(jQuery(this.panels[this.currentIndex]).show()[0]).hide();    
        
        var self = this;
        
        if (!this.rendered) {
          this.panels.each(function(index, item) {
            self.renderButtons(this);
          });
          
          this.rendered = true;
        }
      }      
    },
    
    renderLinkList: function() {
      var links = "<ul class='form_links'>";
      
      var self = this;
      
      this.panels.each(function(index, item) {
        
        var selected = (self.currentIndex == index) ? "selected" : "";
        
        links += "<li class='" + selected + "'><a href='Javascript:void(0)' class='link_button' id='link_" + index + "'>" + item.title + "</a></li>";
        
        selected = "";        
      });
      
      links += "</ul>";
      
      if (this.linkListRendered) jQuery(this.settings.linksContainer).find('.form_links').remove();

      jQuery(this.settings.linksContainer).prepend(links);
      
      this.linkListRendered = true;
    },
    
    /** EVENTS **/
    
    delegateClickListener: function(e) {     
      if ( jQuery(e.target).hasClass('nextButton') )      this.handleNextClick();
      if ( jQuery(e.target).hasClass('previousButton') )  this.handlePreviousClick();
      if ( jQuery(e.target).hasClass('finishButton') )    this.handleFinishClick();
      if ( jQuery(e.target).hasClass('link_button') )     this.handleLinkButtonClick(e.target);
    },
    
    /** HANDLERS **/
    
    handleNextClick: function() {
      this.currentIndex++;
      
      this.updateDisplay();
    },
    
    handlePreviousClick: function() {
      this.currentIndex--;

      this.updateDisplay();
    },
    
    handleFinishClick: function() {
      this.settings.finishFunction(this.htmlElement);
    },
    
    handleLinkButtonClick: function(link) {
      this.currentIndex = link.id.split("_")[1];      
      this.updateDisplay();
    }
    
  };
	
	this.each(function() {
	  actsAsPaneled.initialize(this, settings);	  
	});
};