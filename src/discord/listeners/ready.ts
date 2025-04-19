import { defineBotEvent } from "../bot-utils.js";
import { ActivitiesOptions, Client, Events, ActivityType } from "discord.js";

const BOT_STATUSES: ActivitiesOptions[] = [
    {
        type: ActivityType.Custom,
        name: "tak",
    },
];

function setupCustomStatus(client: Client) {
    // Setup custom status
    client.user?.setPresence({
        activities: [BOT_STATUSES[0]!],
        status: "dnd",
    });

    if (BOT_STATUSES.length == 1) {
        return;
    }

    let nextIndex = 1; // Index is 1 because the first activity is already displayed
    setInterval(
        () => {
            // Set next custom status
            client.user?.setPresence({
                activities: [BOT_STATUSES[nextIndex]!],
                status: "dnd",
            });

            if (nextIndex == BOT_STATUSES.length - 1) {
                nextIndex = 0;
            } else {
                nextIndex++;
            }
        },
        15 * 60 * 1000
    ); // 15 minutes
}

export default defineBotEvent({
    name: Events.ClientReady,
    once: true,
    execute: (client: Client) => {
        console.log(`Ready! Logged in as ${client.user?.tag} in ${client.guilds.cache.size} guilds`);

        //client.user?.setStatus("dnd");
        setupCustomStatus(client);
    },
});
