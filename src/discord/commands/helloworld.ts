import { SlashCommandBuilder } from "discord.js";
import { defineBotCommand } from "../bot-utils.js";

export default defineBotCommand({
    data: new SlashCommandBuilder() // Specify command data here
        .setName("helloworld")
        .setDescription("Replies with Hello World!"),
    async execute(interaction) {
        await interaction.reply("Hello World!");
    },
});
