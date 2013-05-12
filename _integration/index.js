var global_canvas = document.getElementById('canvas');
var global_ctx = canvas.getContext('2d');
/*	Game Center
	Is faster to initialize Game Center before calling construct to allow GC loading before the actual game.
*/
var gameCenter = new Ejecta.GameCenter();
gameCenter.authenticate(function(error){
    if( error ) {
        console.log( 'Auth failed' );
    } else {
        console.log( 'Auth successful' );
    }
});
/*	Construct 2
	Required files and initialization of runtime
*/
ejecta.include('c2runtime.js');
cr_createRuntime('canvas');
//This Suspended state when game is not shown (triggers also when GC window is being displayed)
document.addEventListener('pageshow', function() {
    cr_setSuspended(false);
});
document.addEventListener('pagehide', function() {
    cr_setSuspended(true);
})