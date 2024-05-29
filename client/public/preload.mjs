import remote from '@electron/remote';
import { ipcRenderer, webFrame } from "electron";

let cpuCount, threadUtilized, totalmem, cpuPercent, freemem;


const ramText = document.querySelector("#ram .text");

const ramBar = document.querySelector("#ram .bar-inner");

ipcRenderer.send("cpuCount");
ipcRenderer.send("threadUtilized");
ipcRenderer.send("totalmem");
ipcRenderer.on("cpuCount", (_event, { data }) => {
	cpuCount = data;
});
ipcRenderer.on("threadUtilized", (_event, { data }) => {
	threadUtilized = data;
});
ipcRenderer.on("totalmem", (_event, { data }) => {
	totalmem = Math.round(data / 102.4) / 10;
});

setInterval(async () => {
	ipcRenderer.send("cpuUsage");
	ipcRenderer.send("freemem");
}, 1500);


ipcRenderer.on("cpuUsage", (_event, { data }) => {
	cpuPercent = Math.round(data * 100);
  console.log(`CPU: ${cpuPercent}%, ${threadUtilized}/${cpuCount} threads`);
	webFrame.executeJavaScript(`
		document.querySelector("#cpu .text").innerText = 'CPU: ${cpuPercent}%, ${threadUtilized}/${cpuCount} threads';
		document.querySelector("#cpu .bar-inner").style.transform = 'scaleX(${cpuPercent / 100})';
	`)	
});

ipcRenderer.on("freemem", (_event, { data }) => {
	freemem = data;
	webFrame.executeJavaScript(`
		document.querySelector("#ram .text").innerText = 'RAM: ${Math.round((totalmem - freemem) * 10) / 10}GB/${totalmem}GB';
		document.querySelector("#ram .bar-inner").style.transform = 'scaleX(${(totalmem - freemem) / totalmem})';
	`)
});