export function prefix(property, el) {
	const propertyUC = property.slice(0, 1).toUpperCase() + property.slice(1);
	const vendors = ['Webkit', 'Moz', 'O', 'ms'];
	for(let i = 0, len = vendors.length; i < len; i++) {
		const vendor = vendors[i];
		if(typeof (el || document.body).style[vendor + propertyUC] !== 'undefined') return vendor + propertyUC;
	}
	return property;
}
export const add_class = (element, name) => element.className = element.className.replace(/\s+$/gi, '') + ' ' + name;
export const remove_class =(element, name) => element.className = element.className.replace(name, '');
