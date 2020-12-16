/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'create-block/master-aside', {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Master Aside', 'master-aside' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'Example block written with ESNext standard and JSX support – build step required.',
		'master-aside'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'widgets',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'smiley',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );


/**
 * Crear un sidebar, apoyado con docuemntacion oficial y un articulo.
 * Un sidebar en el editor requiere de coordinar varias instancias para
 * una buena ejecución y experiencia de uso.
 * Existe ya una funcion que agrupa cada instancia:
 * https://developer.wordpress.org/block-editor/developers/slotfills/plugin-sidebar-more-menu-item/
 */
import { registerPlugin } from '@wordpress/plugins'; // Registra el plugin.
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post'; // Importa los modulos necesarios.
import { Fragment } from '@wordpress/element'; // Importa un elemento para agrupar.
// Segmenta los componentes en paneles:
import { PanelBody, PanelRow } from '@wordpress/components'; // Importa un elemento para agrupar.

/**
 * Agregar boton para mostrar grid:
 * https://developer.wordpress.org/block-editor/components/button/.
 */
// import { Button } from '@wordpress/components';

/**
 * Agregar control de toggle.
 * https://awhitepixel.com/blog/add-a-custom-inspector-sidebar-in-wordpress-gutenberg-with-post-meta/
 * https://developer.wordpress.org/block-editor/components/form-toggle/
 */
import { ToggleControl } from '@wordpress/components';
import { withState } from '@wordpress/compose';

const MyToggleControl = withState( {
    hasFixedBackground: false,
} )( ( { hasFixedBackground, setState } ) => (
    <ToggleControl
        label={ __('Ver bloques', 'lang') }
        // help={ hasFixedBackground ? 'Has fixed background.' : 'No fixed background.' }
        help={ hasFixedBackground ? showGrid : deleteGrid }
        checked={ hasFixedBackground }
        onChange={ () => setState( ( state ) => ( { hasFixedBackground: ! state.hasFixedBackground } ) ) }
    />
) );

/**
 * Agregar control caja de margen
 * pendiente implementar medidas en bloque.
 */
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const MarginBox = () => {
    const [ values, setValues ] = useState( {
        top: '5px',
        left: '5px',
        right: '5px',
        bottom: '5px',
    } );

    return (
        <BoxControl
			label={ __('Margen a medida', 'lang') }
            values={ values }
            onChange={ ( nextValues ) => setValues( nextValues ) }
        />
    );
};

const PaddingBox = () => {
    const [ values, setValues ] = useState( {
        top: '5px',
        left: '5px',
        right: '5px',
        bottom: '5px',
    } );

    return (
        <BoxControl
			label={ __('Padding a medida', 'lang') }
            values={ values }
            onChange={ ( nextValues ) => setValues( nextValues ) }
        />
    );
};

/**
 * Agregar control de clases con un select para margen y padding
 * 0,1,2,3,4,5,m,mt,mr,mb,ml,mx,my
 * margen = [m,mt,mr,mb,ml,mx,my]
 * i = margen.length < 5
 */
import { SelectControl } from '@wordpress/components';
// import { withState } from '@wordpress/compose';

const MarginControl = withState( {
    size: 'm-0',
} )( ( { size, setState } ) => (
    <SelectControl
        label={ __('Margin', 'lang') }
        value={ size }
        // options={ [
        //     { label: 'Big', value: '100%' },
        //     { label: 'Medium', value: '50%' },
        //     { label: 'Small', value: '25%' },
        // ] }
        options={ style_options_b4(['m','mt','mr','mb','ml','mx','my'],6,1) }
        onChange={ ( size ) => { setState( { size } ) } }
    />
) );

const PaddingControl = withState( {
    size: 'p-0',
} )( ( { size, setState } ) => (
    <SelectControl
        label={ __('Padding', 'lang') }
        value={ size }
        options={ style_options_b4(['p','pt','pr','pb','pl','px','py'],6,1) }
        onChange={ ( size ) => { setState( { size } ) } }
    />
) );

/**
 * Agregar control de clases con un select para display
 * 1) Display, aplica en bloques
 * 2) Vertical align, aplica en row de columns.
 * 2) Vertical align, aplica en row de columns.
 */
const DisplayControl = withState( {
    size: 'd-inline',
} )( ( { size, setState } ) => (
    <SelectControl
        label={ __('Display (select item)', 'lang') }
        value={ size }
        // options={ display_options_b4() }
        options={ options_to_select_b4('d-',['none','inline','inline-block','block','table','table-cell','table-row','flex','inline-flex']) }
        onChange={ ( size ) => { setState( { size } ) } }
    />
) );

const AlgnVerControl = withState( {
    size: 'align-items-start',
} )( ( { size, setState } ) => (
    <SelectControl
        label={ __('Vertical align (select row)', 'lang') }
        value={ size }
        // options={ display_options_b4() }
        options={ options_to_select_b4('',['align-items-start','align-items-center','align-items-end','no-gutters']) }
        onChange={ ( size ) => { setState( { size } ) } }
    />
) );

const AlgnHorControl = withState( {
    size: 'justify-content-start',
} )( ( { size, setState } ) => (
    <SelectControl
        label={ __('Horizontal align (select row)', 'lang') }
        value={ size }
        // options={ display_options_b4() }
        options={ options_to_select_b4('',['justify-content-start','justify-content-center','justify-content-end','justify-content-around','justify-content-between','no-gutters']) }
        onChange={ ( size ) => { setState( { size } ) } }
    />
) );

const ColWidthControl = withState( {
    size: 'col-1',
} )( ( { size, setState } ) => (
    <SelectControl
        label={ __('Column width', 'lang') }
        value={ size }
		options={ style_options_b4(['col','col-sm','col-md','col-lg','col-xl'],12,0) }
        onChange={ ( size ) => { setState( { size } ) } }
    />
) );

const ColOffsetControl = withState( {
    size: 'offset-1',
} )( ( { size, setState } ) => (
    <SelectControl
        label={ __('Column offset', 'lang') }
        value={ size }
		options={ style_options_b4(['offset','offset-sm','offset-md','offset-lg','offset-xl'],6,0) }
        onChange={ ( size ) => { setState( { size } ) } }
    />
) );

const PluginSidebarMoreMenuItemTest = () => (
    <Fragment>

        <PluginSidebarMoreMenuItem
			target="master-aside-panel"
			icon="image-filter"
		>
			{ __('Abrir Master Aside', 'lang') }
        </PluginSidebarMoreMenuItem>

        <PluginSidebar
			name="master-aside-panel"
			icon="image-filter"
			title="Master Aside"
		>
			{/* Paneles de apoyo visual */}
			<PanelBody
				title={__('Apoyo visual', 'lang')}
				initialOpen={ false }
			>
				{/* Mostrar grid */}
				<PanelRow>
					<MyToggleControl/>
				</PanelRow>

				{/* prueba random */}
				{/* <PanelRow>
					<Button
						isSecondary
						icon="grid-view"
						onClick={ clicButton }
					>
						{ __('Ver grid', 'lang') }
					</Button>
				</PanelRow> */}

			</PanelBody>

			<PanelBody
				title={__('Margin and padding', 'lang')}
				initialOpen={ false }
			>
				{/* Prueba de margenes y padding */}
				<PanelRow>
					<MarginControl/>
					<PaddingControl/>
				</PanelRow>
				<PanelRow>
					<MarginBox/>
				</PanelRow>
				<PanelRow>
					<PaddingBox/>
				</PanelRow>
			</PanelBody>

			<PanelBody
				title={__('Layout Utilities', 'lang')}
				initialOpen={ true }
			>
				<PanelRow>
					<DisplayControl/>
				</PanelRow>
				<PanelRow>
					<AlgnVerControl/>
				</PanelRow>
				<PanelRow>
					<AlgnHorControl/>
				</PanelRow>
				<PanelRow>
					<ColWidthControl/>
				</PanelRow>
				<PanelRow>
					<ColOffsetControl/>
				</PanelRow>

			</PanelBody>

        </PluginSidebar>
    </Fragment>
);

registerPlugin( 'plugin-sidebar-expanded-test', {
    render: PluginSidebarMoreMenuItemTest,
} );

/**
 * Funciones complementarias
 */
function clicButton(){
	alert( 'ver grid boton' );
}

/**
 * Crea una etiqueta style con instrucciones css en head.
 * @param {*} styles string, estilos css auxiliares.
 */
function appendStyle(styles){
	// crear etiqueta.
	var css = document.createElement('style');
		css.type = 'text/css';
		css.id = 'ekiline-grid';

	if (css.styleSheet) css.styleSheet.cssText = styles;
	else css.appendChild(document.createTextNode(styles));
	document.getElementsByTagName("head")[0].appendChild(css);
}
/**
 * Elimina algun objeto creado por medio de ID
 * @param {*} elementId string, nombre de objeto.
 */
function removeElement(elementId) {
	// Elige el objeto.
    // var element = document.getElementById(elementId);
	// Si existe eliminar.
	// if (element) element.parentNode.removeChild(element);

	// Existe una acumalacion, al agregar bloques de manera consecutiva,
	// o cuardar repetidas veces se acumulan las etiquetas de estilo por ello las elimino con un loop.
	const elements = document.querySelectorAll(elementId);
	if (elements){
		Array.from(elements).forEach(
			(element, index) => {
				element.parentNode.removeChild(element);
			}
		);
	}
}
/**
 * Mostrar grid, estado de ToggleControl.
 */
function showGrid(){
	var styles = '.wp-block{border:1px dotted #ccc;padding:.25em;}'
	appendStyle( styles )
}
/**
 * Eliminar grid, estado de ToggleControl.
 */
function deleteGrid(){
	removeElement('#ekiline-grid');
}

/**
 * Crear opciones para el controlador de margenes y padding.
 * margen: 'm','mt','mr','mb','ml','mx','my'
 * padding: 'p','pt','pr','pb','pl','px','py'
 * @param {Array} prefijos clases css margen o padding
 */
function style_options_b4(prefijos,indice,start){
	var i = 0; // Set up contador.
	var options = []; // array nuevo.

	// Loop, por cada item en mi array.
	while ( prefijos[i] ) {

		var elmnt = prefijos[i];
		var times = indice; // sufijo, indice.

		while (times > 0) {
			options.push({
				label: elmnt + '-' + (times - start),
				value: elmnt + '-' + (times - start),
			});
			times--;
		}
		i++;
	}
	// console.log(options);
	return options;
}
/**
 * Opciones para selector de display.
 * @param {prefix} string, prefijo de la clase bootsrap.
 * @param {values} array, valores que generan la opcion.
 */

function options_to_select_b4(prefix,values){
	// var values,prefix;
	var display = [];

	for (var i=0; i<values.length; i++) {
		display[i] = {
			label: values[i],
			value: prefix + values[i],
		};
	}
	// console.log(display);
	return display;
}