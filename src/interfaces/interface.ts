export interface User {
	id:string;
	name: string;
	email: string
	createdAt: string;
	createdBy: string;
	password?: string;
	role?: "user" | "admin" | "superAdmin";
}

export interface School {
	id: string;
	name: string;
	address: string;
	country: string;
	phone: string;
	website: string;
	state: string;
		createdAt: string;
	createdBy: string;

}

export interface Country {
	id: string;
	name: string;
	code: string;
		createdAt: string;
	createdBy: string;

}

export interface State {
	id: string;
	name: string;
	countryId: string;
		createdAt: string;
	createdBy: string;

}

export interface Roles {
	id: string;
	name: string;
	description: string;
	permissions: string[];
		createdAt: string;
	createdBy: string;

}
export interface Permission {
	id: string;
	name: string;
	description: string;
		createdAt: string;
	createdBy: string;

}

