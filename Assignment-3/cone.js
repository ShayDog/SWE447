var gl = null;

function init() {
   

    var canvas = document.getElementById( "webgl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    
    cone = new Cone( gl );
    
    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 1.0, 1.0, 0.0, 0.5 );
    render();
}

function render() {
    cone.render();
}

window.onload = init;
