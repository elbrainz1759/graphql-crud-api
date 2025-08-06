export interface User {
	id: string;
	name: string;
	email: string
	createdAt: string;
	createdBy: string;
	password?: string;
	countryId?: string;
	role?: "user" | "admin" | "superAdmin";
}

export interface schoolAdmin {
	id: string;
	name: string;
	email: string;
	schoolId: string;
	createdAt: string;
	createdBy: string;
}

export interface Teacher {
	id: string;
	name: string;
	email: string;
	schoolId: string;
	createdAt: string;
	createdBy: string;
}

export interface Class {
	id: string;
	name: string;
	schoolId: string;
	createdAt: Date;
	createdBy: string;
}

export interface Student {
	id: string;
	name: string;
	email: string;	
	schoolId: string;
	createdAt: string;
	createdBy: string;
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
	createdAt: Date;
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

