import * as React from "react";
import { useEffect } from "react";
import {
	Collection,
	CollectionDetailResponse,
	CollectionItem,
	CollectionResponse,
} from "./types";
import { Box, Button, Heading, Select, Tag, Text } from "@chakra-ui/react";
import RaindropSync from "../main";
const headers = {
	Authorization: "",
};
const loadCollections = async () =>
	await fetch("https://api.raindrop.io/rest/v1/collections", {
		headers,
	}).then((res) => (res.json() as unknown) as CollectionResponse);

const loadCollectionItems = async (collectionId: string) =>
	await fetch(`https://api.raindrop.io/rest/v1/raindrops/${collectionId}`, {
		headers,
	}).then((res) => (res.json() as unknown) as CollectionDetailResponse);

export const ReactView = ({ plugin }: { plugin: RaindropSync }) => {
	const [collections, setCollections] = React.useState<Collection[]>([]);
	const [collectionDetail, setCollectionDetail] = React.useState<
		CollectionItem[]
	>([]);
	const [selectedCollection, setSelectedCollection] = React.useState<
		string | null
	>(null);

	const createFile = async (item: CollectionItem) => {
		console.log(plugin.app.vault, item);
		const res = await plugin.app.vault.create(
			`./raindrop/${item.title}.md`,
			`# ${item.title}
Tags: ${item.tags.map((tag) => `[[${tag}]]`).join(" ")}
Created: ${new Date(item.created).toISOString()}
Excerpt: ${item.excerpt}
Link: ${item.link}

## Highlights
${item.highlights
	.map((highlight) => {
		return `- ${highlight}`;
	})
	.join("\n")}
`
		);
	};

	const loadInitialCollections = async () => {
		const collections = await loadCollections();
		setCollections(collections.items);
		setSelectedCollection(String(collections.items[0]._id));
	};

	const loadDetailCollections = async () => {
		const collectionItems = await loadCollectionItems(selectedCollection);
		setCollectionDetail(collectionItems.items);
	};

	useEffect(() => {
		loadInitialCollections();
	}, []);

	useEffect(() => {
		if (selectedCollection) {
			loadDetailCollections();
		}
	}, [selectedCollection]);
	return (
		<>
			<h4>Hello, React!</h4>
			<Select
				onChange={(e) => {
					setSelectedCollection(e.target.value);
				}}
			>
				{collections.map((col) => (
					<option value={col._id}>
						<img
							alt="the cover"
							height="16px"
							width="16px"
							src={col.cover}
						/>
						{col.title} {col.count}
					</option>
				))}
			</Select>
			{collectionDetail.map((item) => {
				return (
					<Box key={item._id}>
						<Heading size="md">{item.title}</Heading>
						{item.tags.map((tag) => (
							<Tag>{tag}</Tag>
						))}
						<Text>{item.excerpt}</Text>
						<Button
							onClick={() => {
								createFile(item);
							}}
						>
							Create new
						</Button>
					</Box>
				);
			})}
		</>
	);
};
