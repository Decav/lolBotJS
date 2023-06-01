const resourcesHelper = require("./resourcesHelper")
const iconResources = require("./iconResources")

const validateTierIcon = (tier) => {
    switch (tier) {
        case "IRON":
            return iconResources.ironIcon
        case "BRONZE":
            return iconResources.bronzeIcon
        case "SILVER":
            return iconResources.silverIcon
        case "GOLD":
            return iconResources.goldIcon
        case "PLATINUM":
            return iconResources.platinumIcon
        case "DIAMOND":
            return iconResources.diamondIcon
        case "MASTER":
            return iconResources.masterIcon
        case "GRANDMASTER":
            return iconResources.gMasterIcon
        case "CHALLENGER":
            return iconResources.challengerIcon
        default:
            break
    }
}

const getFlexRanks = (list) => {
    if (list[0].queueType == queueType.FLEXRANKS)
        return list[0]
    else 
        return list [1]
}

const getSoloRanks = (list) => {
    if (list[0].queueType == queueType.SOLORANKS)
        return list[0]
    else 
        return list [1]
}

const getTFTRanks = (list) => {
    if (list[0].queueType == queueType.TFT)
        return list[0]
    else 
        return list [1]
}

const getAllTFT = (list) => {
    if (list[0].queueType == queueType.TFT)
        return list[0]
    else if (list[1].queueType == queueType.TFT)
        return list[1]
    else 
        return list[2]
}

const getAllSolo = (list) => {
    if (list[0].queueType == queueType.SOLORANKS)
        return list[0]
    else if (list[1].queueType == queueType.SOLORANKS)
        return list[1]
    else 
        return list[2]
}

const getAllFlex = (list) => {
    if (list[0].queueType == queueType.FLEXRANKS)
        return list[0]
    else if (list[1].queueType == queueType.FLEXRANKS)
        return list[1]
    else 
        return list[2]
}

const hasSoloAndFlex = (list) => {
    return list.length == 2
}

const hasOneQueue = (list) => {
    return list.length == 1
}

const hasAllQueueTypes = (list) => {
    return list.length == 3
}

const hasJustSolo = (list) => {
    if (list[0].queueType == queueType.SOLORANKS)
        return true
    else 
        return false
}

const hasJustFlex = (list) => {
    if (list[0].queueType == queueType.FLEXRANKS)
        return true
    else 
        return false
}

const hasJustTFT = (list) => {
    if (list[0].queueType == queueType.TFT)
        return true
    else 
        return false
}

const getWinrate = (wins, losses) => {
    let totalGames = wins + losses
    let winrate = (wins / totalGames) * 100
    return Math.round(winrate)
}

const isValidRole = (role) => {
    return role == roleTypes.TOP && role == roleTypes.JG && role == roleTypes.MID 
        && role == roleTypes.ADC && role == roleTypes.SUPP
}

const queueType = {
    SOLORANKS: "RANKED_SOLO_5x5",
    FLEXRANKS: "RANKED_FLEX_SR",
    TFT: "RANKED_TFT_DOUBLE_UP"
}

const roleTypes = {
    TOP: "TOP",
    JG: "JG",
    MID: "MID",
    ADC: "ADC",
    SUPP: "SUPP"
}

const validation = {
    getFlexRanks, getSoloRanks, getTFTRanks,
    getAllTFT, getAllFlex, getAllSolo,
    hasOneQueue, hasSoloAndFlex, hasAllQueueTypes,
    hasJustSolo, hasJustFlex, hasJustTFT,
    validateTierIcon, getWinrate, isValidRole
}

module.exports = validation
