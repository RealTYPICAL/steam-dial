
import * as dial from "peer-dial";

const dialClient = new dial.Client();

dialClient.on("found", (device, ssdpHeader) => {
    dialClient.getDialDevice(device, (dialDevice) => {
        if (dialDevice) {
            dialDevice.getAppInfo("Game", (appInfo) => {
                if (appInfo) {
                    dialDevice.launchApp("Game", "2630", "text/plain", (launchRes) => {
                        if (launchRes) {
                            console.log("Call made successfully: " + launchRes);
                        }
                    });
                }
            });

        }
    });
});
setTimeout(() => {
    dialClient.start();
}, 2000); // Wait for server to start up.
