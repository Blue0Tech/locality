AFRAME.registerComponent("tour", {
  init: function () {
    this.placesContainer = this.el;
    this.createCards();
    
  },
  schema: {
    thumbNailsRef: {type:'array',default:[
      {
        id: "erdington",
        title: "Erdington",
        url: "./assets/thumbnails/erdington.png",
        largeView: "./assets/views/erdington.jpg"
      },
      {
        id: "sutton-colefield",
        title: "Sutton Colefield",
        url: "./assets/thumbnails/suttonColefield.png",
        largeView: "./assets/views/suttonColefield.jpg"
      },
  
      {
        id: "aston",
        title: "Aston",
        url: "./assets/thumbnails/aston.png",
        largeView: "./assets/views/aston.jpg"
      },
      {
        id: "nechells",
        title: "Nechells",
        url: "./assets/thumbnails/nechells.png",
        largeView: "./assets/views/nechells.jpg"
      }
    ]}
  },
  createCards: function () {
    let prevoiusXPosition = -50;

    for (var item of this.data.thumbNailsRef) {
      const posX = prevoiusXPosition + 20;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      const borderEl = this.createBorder(position,item.id);
      
      const TN = this.createThumbnailRef(item);
      borderEl.appendChild(TN);
     
      const titleEl = this.createTitle(position,item);
      borderEl.appendChild(titleEl);
      
      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function(position,id) {
    const entityElement = document.createElement('a-entity');
    entityElement.setAttribute('id',id);
    entityElement.setAttribute('position',position);
    entityElement.setAttribute('visible',true);
    const borderLeft = document.createElement('a-entity');
    borderLeft.setAttribute('geometry',{
      primitive: 'plane',
      width: 1,
      height: 17
    });
    borderLeft.setAttribute('material',{
      color: 'orange',
      opacity: 0.7
    });
    borderLeft.setAttribute('position',{
      x: -5.75,
      y: 0
    });
    borderLeft.setAttribute('class','border');
    entityElement.appendChild(borderLeft);
    const borderRight = document.createElement('a-entity');
    borderRight.setAttribute('geometry',{
      primitive: 'plane',
      width: 1,
      height: 17
    });
    borderRight.setAttribute('material',{
      color: 'orange',
      opacity: 0.7
    });
    borderRight.setAttribute('position',{
      x: 5.75,
      y: 0
    });
    borderRight.setAttribute('class','border');
    entityElement.appendChild(borderRight);
    const borderTop = document.createElement('a-entity');
    borderTop.setAttribute('geometry',{
      primitive: 'plane',
      height: 1,
      width: 10.5
    });
    borderTop.setAttribute('material',{
      color: 'orange',
      opacity: 0.7
    });
    borderTop.setAttribute('position',{
      x:0,
      y:8
    });
    borderTop.setAttribute('class','border');
    entityElement.appendChild(borderTop);
    const borderBottom = document.createElement('a-entity');
    borderBottom.setAttribute('geometry',{
      primitive: 'plane',
      height: 1,
      width: 10.5
    });
    borderBottom.setAttribute('material',{
      color: 'orange',
      opacity: 0.7
    });
    borderBottom.setAttribute('position',{
      x:0,
      y:-8
    });
    borderBottom.setAttribute('class','border');
    entityElement.appendChild(borderBottom);
    return entityElement;
  },
  createThumbnailRef: function(item) {
    const entityElement = document.createElement('a-entity');
    entityElement.setAttribute('visible',true);
    entityElement.setAttribute('geometry',{
      primitive: 'plane',
      width: 10.5,
      height: 15
    });
    entityElement.setAttribute('material',{
      src: item.url
    });
    return entityElement;
  },
  createTitle: function(position,item) {
    const entityElement = document.createElement('a-entity');
    entityElement.setAttribute('text',{
      font: 'exo2bold',
      align: 'center',
      width: 60,
      color: 'red',
      value: item.title
    });
    position.y-=25;
    entityElement.setAttribute('position',position);
    entityElement.setAttribute('visible',true);
    return entityElement;
  }
});
