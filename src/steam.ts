import * as peer from "peer-dial";

export default class SteamImpl implements peer.App {
    public name: string = "Game";
    public state: string = "stopped";
    public allowStop: boolean = true;
    public pid: string;

    public launch(launchData: string): void {
        // Open steam game here.
        // opn(launchData);
        // TODO: This thing.
    }
}
