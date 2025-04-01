import { SlashCommandBuilder } from "discord.js";
import { BotCommand } from "../bot-utils.js";

export default {
    data: new SlashCommandBuilder()
        .setName("helloworld")
        .setDescription("Replies with Hello World!"),
    async execute(interaction) {
        await interaction.reply("Hello World!");
    },
} satisfies BotCommand;
