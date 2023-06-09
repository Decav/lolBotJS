const RIOT_KEY = process.env.RIOT_KEY
const riotDataURL = process.env.RIOT_BASE_URL + "league/v4/entries/by-summoner/"
const riotSummonerDataURL =
	process.env.RIOT_BASE_URL + "summoner/v4/summoners/by-name/"
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const axios = require("axios")
const validation = require("../utils/validation")
const resourcesHelper = require("../utils/resourcesHelper")
const colorResources = require("../utils/colorResources")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("invocador")
		.setDescription("Envia los datos de liga de un perfil")
		.addStringOption((option) =>
			option
				.setName("nombre")
				.setDescription("Nombre del invocador a buscar")
				.setRequired(true)
		),
	execute: async ({ client, interaction }) => {
		//Obtener datos del comando seleccionado
		let summonerName = interaction.options.getString("nombre")
		const getSummonerRanks = (summonerId) => {
			axios
				.get(riotDataURL + summonerId + "?api_key=" + RIOT_KEY)
				.then((response) => {
					console.log("request -> " + riotDataURL + summonerId)
					console.log("response -> " + JSON.stringify(response.data))
					if (!response.data.length == 0) {
						if (validation.hasAllQueueTypes(response.data)) {
							let soloRanks = validation.getAllSolo(response.data)
							let flexRanks = validation.getAllFlex(response.data)
							let tftRanks = validation.getAllTFT(response.data)
							interaction.reply({
								embeds: [
									new EmbedBuilder()
										.setTitle(
											"Clasificatoria Solo/Duo " + soloRanks.summonerName
										)
										.setDescription(
											resourcesHelper.setEmbedDescription(soloRanks)
										)
										.setThumbnail(validation.validateTierIcon(soloRanks.tier))
										.setColor(colorResources.blue),
									new EmbedBuilder()
										.setTitle(
											"Clasificatoria Flexible " + flexRanks.summonerName
										)
										.setDescription(
											resourcesHelper.setEmbedDescription(flexRanks)
										)
										.setThumbnail(validation.validateTierIcon(flexRanks.tier))
										.setColor(colorResources.purple),
									new EmbedBuilder()
										.setTitle("Clasificatoria TFT " + tftRanks.summonerName)
										.setDescription(
											resourcesHelper.setEmbedDescription(tftRanks)
										)
										.setThumbnail(validation.validateTierIcon(tftRanks.tier))
										.setColor(colorResources.green),
								],
							})
						} else if (validation.hasSoloAndFlex(response.data)) {
							let soloRanks = validation.getSoloRanks(response.data)
							let flexRanks = validation.getFlexRanks(response.data)
							interaction.reply({
								embeds: [
									new EmbedBuilder()
										.setTitle(
											"Clasificatoria Solo/Duo " + soloRanks.summonerName
										)
										.setDescription(
											resourcesHelper.setEmbedDescription(soloRanks)
										)
										.setThumbnail(validation.validateTierIcon(soloRanks.tier))
										.setColor(colorResources.blue),
									new EmbedBuilder()
										.setTitle(
											"Clasificatoria Flexible " + flexRanks.summonerName
										)
										.setDescription(
											resourcesHelper.setEmbedDescription(flexRanks)
										)
										.setThumbnail(validation.validateTierIcon(flexRanks.tier))
										.setColor(colorResources.purple),
								],
							})
						} else if (validation.hasOneQueue(response.data)) {
							let soloRanks
							let flexRanks
							let tftRanks
							let embed
							if (validation.hasJustSolo(response.data)) {
								soloRanks = validation.getSoloRanks(response.data)
								embed = new EmbedBuilder()
									.setTitle("Clasificatoria Solo/Duo " + soloRanks.summonerName)
									.setDescription(
										resourcesHelper.setEmbedDescription(soloRanks)
									)
									.setThumbnail(validation.validateTierIcon(soloRanks.tier))
									.setColor(colorResources.blue)
							} else if (validation.hasJustFlex(response.data)) {
								flexRanks = validation.getFlexRanks(response.data)
								embed = new EmbedBuilder()
									.setTitle("Clasificatoria Flexible " + flexRanks.summonerName)
									.setDescription(
										resourcesHelper.setEmbedDescription(flexRanks)
									)
									.setThumbnail(validation.validateTierIcon(flexRanks.tier))
									.setColor(colorResources.purple)
							} else if (validation.hasJustTFT(response.data)) {
								tftRanks = validation.getTFTRanks(response.data)
								embed = new EmbedBuilder()
									.setTitle("Clasificatoria TFT " + tftRanks.summonerName)
									.setDescription(resourcesHelper.setEmbedDescription(tftRanks))
									.setThumbnail(validation.validateTierIcon(tftRanks.tier))
									.setColor(colorResources.green)
							}

							interaction.reply({
								embeds: [embed],
							})
						}
					} else {
						interaction.reply({
							embeds: [
								new EmbedBuilder()
									.setTitle(summonerName)
									.setDescription(
										`El invocador aun no se ha clasificado en ninguna liga`
									)
									.setColor(colorResources.red),
							],
						})
					}
				})
				.catch((error) => {
					console.error("error -> " + error)
					console.log("request -> " + riotDataURL + summonerId)
					interaction.reply({
						embeds: [
							new EmbedBuilder()
								.setDescription(
									`Error -> no se encontraron datos de el invocador`
								)
								.setColor(colorResources.red),
						],
					})
				})
		}
		axios
			.get(riotSummonerDataURL + summonerName + "?api_key=" + RIOT_KEY)
			.then((response) => {
				console.log("request -> " + riotSummonerDataURL + summonerName)
				console.log("response -> " + JSON.stringify(response.data))
				let summonerId = response.data.id
				console.log("summonerID -> " + summonerId)
				getSummonerRanks(summonerId)
			})
			.catch((error) => {
				console.error("error -> " + error)
				console.log("request -> " + riotSummonerDataURL + summonerName)
				interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setDescription(`Error -> no se encontró el invocador`)
							.setColor(colorResources.red),
					],
				})
			})
	},
}
