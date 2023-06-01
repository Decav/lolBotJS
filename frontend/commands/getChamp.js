const url = process.env.BACKEND_URL + "champion/name/"

const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const axios = require("axios");
const resourcesHelper = require("../utils/resourcesHelper")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("build")
        .setDescription("Envia la build de un campeon")
        .addSubcommand(subcommand =>
			subcommand
				.setName("campeon")
				.setDescription("Nombre del campeon")
				.addStringOption(option =>
					option.setName("name").setDescription("Nombre del campeon a buscar").setRequired(true)
				)
		),
    execute: async ({client, interaction}) => {
        //get
        let champName = interaction.options.getString("name")
        axios.get(url + resourcesHelper.capitalize(champName))
            .then(response => {
                console.log("response -> " + response.data[0]);
                let champ = response.data[0]
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Build -> ${champ.name}`)
                            .setImage(champ.imageBuild)
                    ]
                })
            })
            .catch((error) => {
                console.error("error -> " + error);
                let typeError = ""
                if (error instanceof TypeError) {
                    typeError = "Campeon buscado no existe, revisa que esté bien escrito."
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Error -> ${typeError}`)
                        ]
                    }) 
                } else {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`ErrorDesconocido -> ${error}`)
                        ]
                    }) 
                }
            })  
    }
}