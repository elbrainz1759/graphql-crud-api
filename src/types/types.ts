export interface User {
	id:string;
	name: string;
	email: string
}

export interface School {
	id: string;
	name: string;
	address: string;
	country: string;
	phone: string;
	website: string;
	state: string;
}

export interface Country {
	id: string;
	name: string;
	code: string;
}

export interface State {
	id: string;
	name: string;
	countryId: string;
}

export interface Roles {
	id: string;
	name: string;
	description: string;
	permissions: string[];
}
export interface Permission {
	id: string;
	name: string;
	description: string;
}

