import { bool } from "prop-types";

export interface Collection {
	title: string;
	description: string;
	public: boolean;
	view: string;
	count: number;
	cover: string[];
	expanded: boolean;
	_id: number;
	sort: number;
	user: User;
	creatorRef: CreatorRef;
	lastAction: Date;
	created: Date;
	lastUpdate: Date;
	slug: string;
	color: string;
	access: Access;
	author: boolean;
}

export type CollectionResponse = {
	result: boolean;
	items: Collection[];
};
export interface Access {
	for: number;
	level: number;
	root: boolean;
	draggable: boolean;
}

export interface CreatorRef {
	_id: number;
	name: string;
	email: string;
}

export interface User {
	$ref: string;
	$id: number;
	$db: string;
}

export interface CollectionDetailResponse {
	result: boolean;
	items: CollectionItem[];
	count: number;
	collectionId: number;
}

export interface CollectionItem {
	excerpt: string;
	note: string;
	type: ItemType;
	cover: string;
	tags: string[];
	removed: boolean;
	_id: number;
	title: string;
	collection: Collection;
	link: string;
	created: Date;
	lastUpdate: Date;
	important: boolean;
	media: Media[];
	user: Collection;
	highlights: any[];
	domain: string;
	creatorRef: CreatorRef;
	sort: number;
	collectionId: number;
}

export interface Collection {
	$ref: Ref;
	$id: number;
	$db: string;
}

export enum Ref {
	Collections = "collections",
	Users = "users",
}

export interface CreatorRef {
	avatar: string;
	_id: number;
	name: string;
	email: string;
}

export interface Media {
	type: string;
	link: string;
}

export enum ItemType {
	Article = "article",
}
