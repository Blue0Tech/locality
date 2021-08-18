AFRAME.registerComponent('expand',{
    schema: {
        mouseIsInside: {type:'string',default:'none'},
        ids: {type:'array',default:[]},
        clicked: {type:'string',default:'none'}
    },
    init: function() {
        var children = this.el.children;
        for(child of children) {
            this.data.ids.push(child.id);
        addEventListener('mouseenter',e=>{
            if(e.path[1].id!='camera' && e.path[1].id!='places-container' && this.data.clicked=='none') {
                this.data.mouseIsInside = e.path[1].id;
            }
        });
        addEventListener('mouseleave',e=>{
            this.data.mouseIsInside = 'none';
            this.resetAll();
        });
        }
        addEventListener('click',e=>{
            if(this.data.ids.includes(e.path[1].id)) {
                this.data.clicked = e.path[1].id;
            }
        });
        document.addEventListener('keydown',e=>{
            if(e.code=='KeyB') {
                this.data.clicked = 'back';
            }
        });
    },
    tick: function() {
        // expand
        var mouseIsInside = this.data.mouseIsInside;
        if(mouseIsInside!=='none') {
            this.focus(mouseIsInside);
        };
        // show details
        if(this.data.ids.includes(this.data.clicked)) {
            this.showDetails(this.data.clicked);
        }
        if(this.data.clicked=='back') {
            this.goBack();
        }
    },
    showDetails: function(clicked) {
        const backMsg = document.querySelector('#backMsg');
        backMsg.setAttribute('visible',true);
        this.focus(clicked);
        // const desc = document.querySelector('#desc');
        const container = document.querySelector('#places-container');
        for (contents of container.children) {
            contents.setAttribute('visible',false);
        };
        var tour = container.getAttribute('tour');
        var item = {};
        for(info of tour.thumbNailsRef) {
            if(info.id==clicked) {
                item = info;
                break;
            }
        };
        // desc.setAttribute('text',{
        //     value: item.desc
        // });
        // desc.setAttribute('visible',true);
        const sky = document.querySelector('#main-container');
        sky.setAttribute('src',item.largeView);
    },
    goBack: function() {
        this.data.clicked = 'none';
        const backMsg = document.querySelector('#backMsg');
        backMsg.setAttribute('visible',false);
        this.resetAll();
        // const desc = document.querySelector('#desc');
        // desc.setAttribute('visible',false);
        const sky = document.querySelector('#main-container');
        sky.removeAttribute('src');
    },
    focus: function(mouseIsInside) {
        const entity = document.querySelector(`#${mouseIsInside}`);
        for(var child of entity.children) {
            if(child.className=='border') {
                child.setAttribute('material',{
                    color: 'red',
                    opacity: 1
                });
            }
        }
        var pos = entity.getAttribute('position');
        entity.setAttribute('position',{
            x: pos.x,
            y: pos.y,
            z: -35
        });
        var others = entity.parentElement.children;
        for(var other of others) {
            if(other.id!=mouseIsInside) {
                other.setAttribute('visible',false);
            }
        }
    },
    resetAll: function() {
        if(this.data.clicked=='none') {
            for(id of this.data.ids) {
                var entity = document.querySelector(`#${id}`);
                for(var child of entity.children) {
                    if(child.className=='border') {
                        child.setAttribute('material',{
                            color: 'orange',
                            opacity: 0.7
                        });
                    }
                }
                var pos = entity.getAttribute('position');
                entity.setAttribute('position',{
                    x: pos.x,
                    y: pos.y,
                    z: -40
                });
                entity.setAttribute('visible',true);
            };
        }
    }
});