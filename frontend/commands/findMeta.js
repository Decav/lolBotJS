const url = process.env.BACKEND_URL + "meta/patch/"
const urlBase = process.env.BACKEND_URL + "meta/"
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const axios = require("axios")
const resourcesHelper = require("../utils/resourcesHelper")
const validation = require("../utils/validation")
const colorResources = require("../utils/colorResources")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("meta")
		.setDescription("Envia el meta de una version")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("parche")
				.setDescription("Version del parche")
				.addStringOption((option) =>
					option.setName("parche").setDescription("Version").setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("rol")
						.setDescription("Por rol (TOP, JG, MID, ADC, SUPP)")
						.setRequired(false)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand.setName("actual").setDescription("Version actual del meta")
		),
	execute: async ({ client, interaction }) => {
		//Obtener datos del comando seleccionado
		let patch = interaction.options.getString("parche")
		let role = interaction.options.getString("rol")
		console.log("patch -> " + patch)
		console.log("role -> " + role)
		if (patch != null) {
			if (role == null) {
				axios
					.get(url + patch)
					.then((response) => {
						console.log("request -> " + url + patch)
						console.log("response -> " + JSON.stringify(response.data))
						let meta = response.data[0]
						let description = resourcesHelper.getChampionList(meta)
						interaction.reply({
							embeds: [
								new EmbedBuilder()
									.setTitle(`Meta parche:  ${meta.patch}`)
									.setDescription(description)
									.setColor(colorResources.orange),
							],
						})
					})
					.catch((error) => {
						console.error("error -> " + error)
						if (error instanceof TypeError) {
							interaction.reply({
								embeds: [
									new EmbedBuilder()
										.setDescription(
											`Error -> ${resourcesHelper.searchNotFoundError()}`
										)
										.setColor(colorResources.red),
								],
							})
						} else {
							interaction.reply({
								embeds: [
									new EmbedBuilder()
										.setDescription(`ErrorDesconocido -> ${error}`)
										.setColor(colorResources.red),
								],
							})
						}
					})
			} else {
				axios
					.get(url + `role/${patch}/${role.toUpperCase()}`)
					.then((response) => {
						console.log(
							"request -> " + url + `role/${patch}/${role.toUpperCase()}`
						)
						console.log("response -> " + JSON.stringify(response.data))
						let meta = response.data
						let description = resourcesHelper.getChampionObject(meta)
						interaction.reply({
							embeds: [
								new EmbedBuilder()
									.setTitle(`Meta parche:  ${patch}`)
									.setDescription(description)
									.setColor(colorResources.yellow),
							],
						})
					})
					.catch((error) => {
						console.error("error -> " + error)
						if (error instanceof TypeError) {
							if (!validation.isValidRole(role)) {
								interaction.reply({
									embeds: [
										new EmbedBuilder()
											.setDescription(
												`Error -> ${resourcesHelper.roleNotFoundError()}`
											)
											.setColor(colorResources.red),
									],
								})
							} else {
								interaction.reply({
									embeds: [
										new EmbedBuilder()
											.setDescription(
												`Error -> ${resourcesHelper.searchNotFoundError()}`
											)
											.setColor(colorResources.red),
									],
								})
							}
						} else {
							interaction.reply({
								embeds: [
									new EmbedBuilder()
										.setDescription(`ErrorDesconocido -> ${error}`)
										.setColor(colorResources.red),
								],
							})
						}
					})
			}
		} else {
			axios
				.get(urlBase)
				.then((response) => {
					console.log("request -> " + urlBase)
					console.log(
						"response -> " +
							JSON.stringify(response.data[response.data.length - 1])
					)
					let meta = response.data[response.data.length - 1]
					let description = resourcesHelper.getChampionList(meta)
					interaction.reply({
						embeds: [
							new EmbedBuilder()
								.setTitle(`Meta parche:  ${meta.patch}`)
								.setDescription(description)
								.setColor(colorResources.orange),
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
		}
	},
}
