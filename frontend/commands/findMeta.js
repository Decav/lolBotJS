const url = process.env.BACKEND_URL + "meta/patch/"

const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const axios = require("axios");
const resourcesHelper = require("../utils/resourcesHelper");
const validation = require("../utils/validation");
const colorResources = require("../utils/colorResources")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meta")
        .setDescription("Envia el meta de una version")
        .addSubcommand(subcommand =>
			subcommand
				.setName("parche")
				.setDescription("Version del parche")
				.addStringOption(option =>
					option.setName("parche").setDescription("Version").setRequired(true)
				)
                .addStringOption(option =>
                    option.setName("rol").setDescription("Por rol (TOP, JG, MID, ADC, SUPP)").setRequired(false)
                )
        ),
    execute: async ({client, interaction}) => {
        //get
        let patch = interaction.options.getString("parche")
        let role = interaction.options.getString("rol")
        console.log("patch -> " + patch)
        console.log("role -> " + role)
        console.log("request -> " + url + patch)
        if (role == null) {
            axios.get(url + patch)
            .then(response => {
                console.log("request -> " + url + patch)
                console.log("response -> " + JSON.stringify(response.data));
                let meta = response.data[0]
                let description = resourcesHelper.getChampionList(meta)
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Meta parche:  ${meta.patch}`)
                            .setDescription(description)
                            .setColor(colorResources.Naranja)
                    ]
                })
            })
            .catch((error) => {
                console.error("error -> " + error);
                let typeError = ""
                if (error instanceof TypeError) {
                    typeError = "La version buscada no se ha registrado."
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Error -> ${typeError}`)
                                .setColor(colorResources.Rojo)
                        ]
                    }) 
                } else {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`ErrorDesconocido -> ${error}`)
                                .setColor(colorResources.Rojo)
                        ]
                    }) 
                }
            })  
        } else {
            axios.get(url + `role/${patch}/${role.toUpperCase()}`)
            .then(response => {
                console.log("request -> " + url + `role/${patch}/${role.toUpperCase()}`)
                console.log("response -> " + JSON.stringify(response.data));
                let meta = response.data
                let description = resourcesHelper.getChampionObject(meta)
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Meta parche:  ${patch}`)
                            .setDescription(description)
                            .setColor(colorResources.Amarillo)
                    ]
                })
            })
            .catch((error) => {
                console.error("error -> " + error);
                let typeError = ""
                if (error instanceof TypeError) {
                    if (!validation.isValidRole(role)) {
                        typeError = "El rol recibido no existe, asegurate de haberlo escrito bien"
                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Error -> ${typeError}`)
                                    .setColor(colorResources.Rojo)
                            ]
                        }) 
                    } else {
                        typeError = "La version buscada no se ha registrado."
                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Error -> ${typeError}`)
                                    .setColor(colorResources.Rojo)
                            ]
                        }) 
                    }
                } else {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`ErrorDesconocido -> ${error}`)
                                .setColor(colorResources.Rojo)
                        ]
                    }) 
                }
            })  
        }
    }
}