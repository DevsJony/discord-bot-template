import "dotenv/config";
import { runDiscordBot } from "./discord/index.js";

console.log("Starting Discord bot...");

await runDiscordBot();
