import * as cp from "child_process";
import * as express from "express";
import * as http from "http";
import * as peer from "peer-dial";
import SteamImpl from "./steam";

const PORT = 3000;
const MANUFACTURER = "James Tooley";
const MODEL_NAME = "Steam Dial Server";

const expApp = express();
const httpServer = http.createServer(expApp);

const steamImpl = new SteamImpl();

class DelegateImpl implements peer.Delegate {
    public getApp(appName: string): peer.App {
        return steamImpl;
    }
    public launchApp(appName: string, launchData: string, callback: (data: string) => void): void {
        if (appName === steamImpl.name) {
            if (expApp) {
                steamImpl.pid = "run";
                steamImpl.state = "starting";
                steamImpl.launch(launchData);
                steamImpl.state = "running";
            }
            callback(steamImpl.pid);
        }
    }
    public stopApp(appName: string, pid: string, callback: (data: boolean) => void): void {
        if (steamImpl && steamImpl.pid === pid) {
            steamImpl.pid = "";
            steamImpl.state = "stopped";
            callback(true);
        } else {
            callback(false);
        }
    }
}

const server = new peer.Server({
    expressApp: expApp,
    prefix: "/dial",
    port: PORT,
    corsAllowOrigins: "*",
    manufacturer: MANUFACTURER,
    modelName: MODEL_NAME,
    delegate: new DelegateImpl(),
});

httpServer.listen(PORT, () => {
    server.start();
});
