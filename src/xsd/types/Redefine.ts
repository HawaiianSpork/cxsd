// This file is part of cxsd, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import {State} from '../State';
import * as types from '../types';


/** <xsd:redefine> */

export class Redefine extends types.Base {
	static mayContain: () => types.BaseClass[] = () => [
		types.Annotation,
		types.SimpleType,
		types.ComplexType,
		types.AttributeGroup,
		types.Group
	];

	resolve(state: State) {
		this.scope.addAllToParent('element');
		this.scope.addAllToParent('attribute');
		this.scope.addAllToParent('group');
		this.scope.addAllToParent('attributeGroup');
	}

	id: string = null;
	schemaLocation: string = null;
}
