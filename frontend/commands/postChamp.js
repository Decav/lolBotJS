const url = process.env.BACKEND_URL + "champion/"
const myUserID = process.env.USER_ID
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const axios = require("axios")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("newbuild")
		.setDescription("Crea una nueva build de un campeon")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("campeon")
				.setDescription("Nombre del campeon")
				.addStringOption((option) =>
					option.setName("name").setDescription("Campeon").setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("imagebuild")
						.setDescription("Campeon")
						.setRequired(true)
				)
		),
	execute: async ({ client, interaction }) => {
		//post
		let champName = interaction.options.getString("name")
		let imageBuild = interaction.options.getString("imagebuild")
		if (interaction.user.id == myUserID) {
			axios
				.post(url, {
					name: champName,
					imageBuild: imageBuild,
				})
				.then((response) => {
					console.log("request -> " + url)
					console.log("response -> " + response.data[0])
					interaction.reply({
						embeds: [new EmbedBuilder().setDescription(`Campeon añadido`)],
					})
				})
				.catch((error) => {
					console.error("error -> " + error)
					interaction.reply({
						embeds: [
							new EmbedBuilder().setDescription(`ErrorDesconocido -> ${error}`),
						],
					})
				})
		} else {
			interaction.reply({
				embeds: [
					new EmbedBuilder().setDescription(
						"No tienes permiso para ejecutar este comando"
					),
				],
			})
		}
	},
}
