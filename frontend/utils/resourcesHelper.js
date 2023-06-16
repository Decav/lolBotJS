const validation = require("./validation")

const capitalize = (text) => {
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

const setEmbedDescription = (rank) => {
	let description = `Rango: ${rank.tier + " " + rank.rank} 
                        Puntos: ${rank.leaguePoints}
                        Victorias: ${rank.wins}  Derrotas: ${rank.losses}
                        WR: ${validation.getWinrate(rank.wins, rank.losses)}%`
	return description
}

const getChampionList = (meta) => {
	let description = ""
	meta.champions.forEach((champion) => {
		const championsArray = champion.championsArray.join(", ")
		description += `${champion.role} -> ${championsArray}\n`
	})
	return description
}

const getChampionObject = (data) => {
	const { role, championsArray } = data
	const champions = championsArray.join(", ")
	return `${role} -> ${champions}`
}

const permissionError = () => {
	return "No tienes permiso para ejecutar este comando"
}

const searchNotFoundError = () => {
	return "La version buscada no se ha registrado."
}

const roleNotFoundError = () => {
	return "El rol recibido no existe, asegurate de haberlo escrito bien"
}

const resourcesHelper = {
	capitalize,
	setEmbedDescription,
	setEmbedFields,
	getChampionList,
	getChampionObject,
	permissionError,
	searchNotFoundError,
	roleNotFoundError,
}

module.exports = resourcesHelper
