const url = process.env.BACKEND_URL + "champion/"
const myUserID = process.env.USER_ID
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const axios = require("axios")
const resourcesHelper = require("../utils/resourcesHelper")
const colorResources = require("../utils/colorResources")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nueva_build")
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
						embeds: [
							new EmbedBuilder()
								.setDescription(`Build de campeon añadida`)
								.setColor(colorResources.gray),
						],
					})
				})
				.catch((error) => {
					console.error("error -> " + error)
					interaction.reply({
						embeds: [
							new EmbedBuilder()
								.setDescription(`ErrorDesconocido -> ${error}`)
								.setColor(colorResources.red),
						],
					})
				})
		} else {
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setDescription(resourcesHelper.permissionError)
						.setColor(colorResources.red),
				],
			})
		}
	},
}
