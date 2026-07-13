import { tags } from 'ziko/dom';

export function AuroraText(
	{ 
        colors = [ '#FF0080', '#7928CA', '#0070F3', '#38bdf8' ], 
        speed = 10,
        tag = 'h1',
        fontSize 
    } = {},
	text = 'hello  from aurora'
) {
	return tags[tag]( { class: 'mt-aurora' }, text ).style( {
		backgroundImage: `linear-gradient(135deg, ${ colors
			.filter( Boolean )
			.join( ', ' ) }, ${ colors[ 0 ] })`,
		animationDuration: `${ 10 / speed }s`,
        fontSize
	} );
}