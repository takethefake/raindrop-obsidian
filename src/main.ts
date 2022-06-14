import { Plugin } from "obsidian";
import { ExampleView, VIEW_TYPE_EXAMPLE } from "./ui/ExampleView";

interface RaindropSyncSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: RaindropSyncSettings = {
	mySetting: "default",
};

export default class RaindropSync extends Plugin {
	settings: RaindropSync;

	async onload() {
		await this.loadSettings();
		this.registerView(
			VIEW_TYPE_EXAMPLE,
			(leaf) => new ExampleView(leaf, this)
		);

		this.addRibbonIcon("dice", "Activate view", () => {
			this.activateView();
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}
	async activateView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);

		await this.app.workspace.getMostRecentLeaf().setViewState({
			type: VIEW_TYPE_EXAMPLE,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE)[0]
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
