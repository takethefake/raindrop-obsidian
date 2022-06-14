import { ItemView, WorkspaceLeaf } from "obsidian";
import { createRoot } from "react-dom/client";
import { ReactView } from "./ReactView";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import RaindropSync from "../main";

export const VIEW_TYPE_EXAMPLE = "example-view";

const theme = extendTheme({ config: { initialColorMode: "dark" } });

export class ExampleView extends ItemView {
	plugin: RaindropSync;
	constructor(leaf: WorkspaceLeaf, plugin: RaindropSync) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return "Example view";
	}

	async onOpen() {
		const root = createRoot(this.containerEl.children[1]);
		console.log(this.plugin);
		root.render(
			<ChakraProvider theme={theme}>
				<ReactView plugin={this.plugin} />
			</ChakraProvider>
		);
	}

	async onClose() {
		ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
		// Nothing to clean up.
	}
}
