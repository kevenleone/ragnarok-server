module.exports.getMonsterBackground = function(race){
    let background

    switch(race){
        case "Amorfo": {
            background = "#abb";
            break;
        }

        case "Morto-Vivo": {
            background = '#7159C1'
            break;
        }

        case "Bruto": {
            background = "#fab"
            break;
        }

        case "Planta": {
            background = "#9a9a"
            break;
        }

        case "Inseto": {
            background = "#afa"
            break;
        }

        case "Peixe": {
            background = "#008080"
            break;
        }

        case "Demônio": {
            background = "#D7BDE2"
            break;
        }

        case "Anjo": {
            background = "#E9F7EF"
            break;
        }

        case "Dragão": {
            background = "#5D6D7E"
            break;
        }

        case "Humanóide": {
            background = "#F6DDCC";
            break;
        }

        default: {
            background = '#abb'
            break;
        }
    }
    return background
}
