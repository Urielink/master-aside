<?php
/**
 * Plugin Name:     Master Aside
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     master-aside
 *
 * @package         create-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_master_aside_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/master-aside" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-master-aside-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'create-block-master-aside-block-editor', 'master-aside' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-master-aside-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-master-aside-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'create-block/master-aside', array(
		'editor_script' => 'create-block-master-aside-block-editor',
		'editor_style'  => 'create-block-master-aside-block-editor',
		'style'         => 'create-block-master-aside-block',
	) );
}
add_action( 'init', 'create_block_master_aside_block_init' );



function jstest(){
	?>
<script>

var margen = ['m','mt','mr','mb','ml','mx','my','p','pt','pr','pb','pl','px','py'];
// var title = [];
// // for (var i=0; i<5; i++) {
// for (var i=0; i<margen.length; i++) {
//     title[i] = {
//         // label: margen[i] + '-' + (i),
//         label: margen[i],
//         value: i,
//     };
// }
// console.log(title);

// // https://stackoverflow.com/questions/50672126/repeat-an-array-with-multiple-elements-multiple-times-in-javascript
// const makeRepeated = (arr, repeats) =>
// //   Array.from({ length: repeats }, () => arr).flat();
// 	Array.from({ length: repeats }, () => arr).flat().sort();
// console.log( makeRepeated(margen, 5) );

// // https://stackoverflow.com/questions/12503146/create-an-array-with-same-element-repeated-multiple-times/24665085
// function fillArray(value, len) {
//   var arr = [];
//   for (var i = 0; i < len; i++) {
//     arr.push(value);
//   }
//   return arr;
// }
// console.log( fillArray(margen, 5) );


var prefijos = ['m','mt','mr','mb','ml','mx','my','p','pt','pr','pb','pl','px','py'];
var i = 0; // Set up contador.
// var text = ""; // prueba solo con string
var options = []; // array nuevo.

// Loop, por cada item en mi array.
while ( prefijos[i] ) {

	var elmnt = prefijos[i];
	var copy = '';
	var times = 6; // sufijo, indice.

	while (times > 0) {
		// options.push( elmnt + '-' + (times - 1) );
		// copy += elmnt + '-' + times + ',';
		options.push({
			label: elmnt + '-' + (times - 1),
			value: elmnt + '-' + (times - 1),
		});
		times--;
	}

	// text += copy;
	i++;

	// options = options.sort();

}
// console.log(text);
console.log(options);


</script>
	<?php
}

// add_action('wp_footer','jstest',100);