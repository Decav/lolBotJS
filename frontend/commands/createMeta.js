const url = process.env.BACKEND_URL + "meta/"
const myUserID = process.env.USER_ID
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const axios = require("axios")
const colorResources = require("../utils/colorResources")
const resourcesHelper = require("../utils/resourcesHelper")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nuevo_meta")
		.setDescription("Crea el meta de una version")
		.addStringOption((option) =>
			option.setName("parche").setDescription("Version").setRequired(true)
		)
		.addStringOption((option) =>
			option.setName("top").setDescription("Campeones TOP").setRequired(true)
		)
		.addStringOption((option) =>
			option.setName("jg").setDescription("Campeones JG").setRequired(true)
		)
		.addStringOption((option) =>
			option.setName("mid").setDescription("Campeones MID").setRequired(true)
		)
		.addStringOption((option) =>
			option.setName("adc").setDescription("Campeones ADC").setRequired(true)
		)
		.addStringOption((option) =>
			option.setName("supp").setDescription("Campeones SUPP").setRequired(true)
		),
	execute: async ({ client, interaction }) => {
		//Obtener datos del comando seleccionado
		let patch = interaction.options.getString("parche")
		let topChampions = interaction.options.getString("top")
		let jgChampions = interaction.options.getString("jg")
		let midChampions = interaction.options.getString("mid")
		let adcChampions = interaction.options.getString("adc")
		let suppChampions = interaction.options.getString("supp")
		let jsonPostContent = {
			patch: patch,
			champions: [
				{
					role: "TOP",
					championsArray: topChampions.split(", "),
				},
				{
					role: "JG",
					championsArray: jgChampions.split(", "),
				},
				{
					role: "MID",
					championsArray: midChampions.split(", "),
				},
				{
					role: "ADC",
					championsArray: adcChampions.split(", "),
				},
				{
					role: "SUPP",
					championsArray: suppChampions.split(", "),
				},
			],
		}
		if (interaction.user.id == myUserID) {
			axios
				.post(url, {
					patch: jsonPostContent.patch,
					champions: jsonPostContent.champions,
				})
				.then((response) => {
					console.log("request -> " + url)
					console.log("response -> " + JSON.stringify(response.data))
					interaction.reply({
						embeds: [
							new EmbedBuilder()
								.setDescription(`Meta v${jsonPostContent.patch} agregado.`)
								.setColor(colorResources.purple),
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
