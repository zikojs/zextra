#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";

const args = process.argv.slice(2);
const command = args[0];
const name = args[1];

if (command === "add") {
    switch(name){
        case 'lottie' : install(["@lottiefiles/lottie-player"]) ; break;
        default : console.warn('Not existed')
    }
}

function install(deps) {
    const pm = getPM();
    const cmd =
        pm === "npm"
            ? `npm install ${deps.join(" ")}`
            : pm === "pnpm"
            ? `pnpm add ${deps.join(" ")}`
            : `yarn add ${deps.join(" ")}`;

    execSync(cmd, { stdio: "inherit" });

    console.log("✅ Done!");
}

function getPM() {
    if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
    if (fs.existsSync("yarn.lock")) return "yarn";
    return "npm";
}