// This file is part of cxml, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import {Base, BaseClass} from './Base';
import {State} from '../State';
import {QName} from '../QName';
import * as schema from '../../schema';

export class TypeBase extends Base {
	init(state: State) {
		this.qName = this.define(state, 'type');
		this.scope.setParentType(this);
		this.surrogateKey = TypeBase.nextKey++;
	}

	getOutType() {
		var outType = this.outType;

		if(!outType) {
			var qName = this.qName;
			outType = new schema.Type();

			if(qName) {
				var namespace = qName.namespace;
				outType.namespace = schema.Namespace.register(namespace.id, namespace.name);
			}

			outType.name = this.name;

			this.outType = outType;
		}

		return(outType);
	}

	/** Find parent type inheriting from a base type. */

	getParent(base: BaseClass, breakAtContent: boolean) {
		var next: TypeBase | QName = this;
		var type: TypeBase | QName;
		/** Maximum iterations in case type inheritance forms a loop. */
		var iter = 100;

		while(--iter) {
			type = next;

			if(!(type instanceof TypeBase)) break;
			else if(type instanceof base) return(type);
			else if(breakAtContent && type.scope && type.scope.hasAttributes()) break;
			else next = type.parent;
		}

		return(null);
	}

	id: string = null;
	name: string = null;

	// Internally used members
	parent: TypeBase | QName;
	qName: QName;
	surrogateKey: number;
	private static nextKey = 0;

	outType: schema.Type;

	// TODO: remove this and detect circular types (anonymous types inside elements referencing the same element) before exporting.
	exported: boolean;
}
