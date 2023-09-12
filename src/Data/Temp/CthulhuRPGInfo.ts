import RPGInfo, { FormObjectParameters } from "../RPGInfo";
import CthulhuRPGInfoCompetence from "./CthulhuRPGInfoCompetence";

const CthulhuRPGInfo: RPGInfo = {
    name: "Cthulhu V7",
    key: "cthulhu-v7",
    shortDescription: "L’Appel de Cthulhu plonge les joueurs dans les écrits et les mondes torturés de l’auteur américain Howard Phillips Lovecraft.",
    longDescription: `À la frontière de la folie des hommes, L’Appel de Cthulhu plonge les joueurs dans les écrits et les mondes torturés de l’auteur américain Howard Phillips Lovecraft : le cosmos est régi par des entités élevées au rang de dieux, conscience pure ou monstruosité maligne, dont les intentions nous échappent. À la recherche de secrets perdus et confronté à l’innommable, basculerez-vous dans la folie ou parviendrez-vous à repousser les horreurs sans nom ? Voici le genre d’enjeux auxquels sont confrontés les courageux investigateurs !`,
    type: [
        {
            name: "Compétence",
            key: "competence-type",
            container: {
                align: FormObjectParameters.Alignment.Horizontal,
            },
            components: [
                <FormObjectParameters.Switch>{
                    default: false,
                    name: "Peut level up",
                    key: "level-up",
                    modifyInGame: true,
                    required: true,
                    shortDescription: "Level up"
                },
                <FormObjectParameters.Text>{
                    definedByList: true,
                    name: "Nom",
                    key: "name",
                    modifyInGame: false,
                    required: true,
                    shortDescription: "Nom",
                    default: {
                        expression: `object['name'] + (object['specification'] != undefined ? (' ' + object['specification']) : '')`
                    }
                },
                <FormObjectParameters.Number>{
                    definedByList: true,
                    name: "Defaut value",
                    key: "defaut",
                    min: 0,
                    max: 100,
                    modifyInGame: false,
                    required: true,
                    shortDescription: "Defaut"
                },
                <FormObjectParameters.Number>{
                    default: {
                        expression: `object['defaut']`,
                        dynamic: false
                    },
                    name: "Valeur",
                    key: "value",
                    modifyInGame: true,
                    required: true,
                    shortDescription: "Valeur de la compétence"
                },
            ],
            required: false,
            modifyInGame: true,
            shortDescription: "Une compétence",
            default: {}
        }
    ],
    data: [
        {
            name: "Etat civil",
            key: "etat-civil",
            container: {
                align: FormObjectParameters.Alignment.Vertical
            },
            components: [
                <FormObjectParameters.Text>{
                    name: "Nom",
                    key: "nom",
                    shortDescription: "Nom du personnage",
                    required: true,
                    modifyInGame: false,
                    default: "HP. Lovecraft"
                },
                <FormObjectParameters.Text>{
                    name: "Joueur",
                    key: "joueur",
                    shortDescription: "Nom du joueur",
                    required: true,
                    modifyInGame: false,
                    default: ""
                },
                <FormObjectParameters.Text>{
                    name: "Occupation",
                    key: "occupation",
                    shortDescription: "Metier du personnage",
                    required: true,
                    modifyInGame: false,
                    default: "Ecrivant"
                },
                <FormObjectParameters.Number>{
                    name: "Age",
                    key: "age",
                    shortDescription: "Age du personnage",
                    required: true,
                    modifyInGame: true,
                    default: 35,
                    min: 14,
                    max: 120
                },
                <FormObjectParameters.Text>{
                    name: "Sexe",
                    key: "sexe",
                    shortDescription: "Sexe du personnage",
                    required: true,
                    modifyInGame: false,
                    default: ""
                },
                <FormObjectParameters.Text>{
                    name: "Résidence",
                    key: "residence",
                    shortDescription: "Résidence principal du personnage",
                    required: true,
                    modifyInGame: false,
                    default: ""
                },
                <FormObjectParameters.Text>{
                    name: "Lieu de naissance",
                    key: "lieu-naissance",
                    shortDescription: "Lieu de naissance du personnage",
                    required: true,
                    modifyInGame: false,
                    default: ""
                },
            ]
        },
        {
            name: "Caractéristiques",
            key: "caracteristiques",
            container: {
                align: FormObjectParameters.Alignment.Grid,
                column: 2
            },
            components: [
                <FormObjectParameters.Number>{
                    name: "Force",
                    key: "for",
                    shortDescription: "Représente la force du personnage.",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 100
                },
                <FormObjectParameters.Number>{
                    name: "Dextérité",
                    key: "dex",
                    shortDescription: "Représente la capacité du personnage à courir, grimper ou esquiver.",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 100
                },
                <FormObjectParameters.Number>{
                    name: "Pouvoir",
                    key: "pou",
                    shortDescription: "Représente la force mental du personnage.",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 100
                },
                <FormObjectParameters.Number>{
                    name: "Constitution",
                    key: "con",
                    shortDescription: "Représente la résistance physique du personnage.",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 100
                },
                <FormObjectParameters.Number>{
                    name: "Apparence",
                    key: "app",
                    shortDescription: "Représente la beauté et le charisme du personnage.",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 100
                },
                <FormObjectParameters.Number>{
                    name: "Education",
                    key: "edu",
                    shortDescription: "Représente l'éducation que le personnage à reçu.",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 100
                },
                <FormObjectParameters.Number>{
                    name: "Taille",
                    key: "tai",
                    shortDescription: "Représente la taille et le poids du personnage.",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 100
                },
                <FormObjectParameters.Number>{
                    name: "Intelligeance",
                    key: "int",
                    shortDescription: "Représente l'intélligence du personnage.",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 100
                },
                <FormObjectParameters.Number>{
                    name: "Mouvement",
                    key: "mvt",
                    shortDescription: "Représente le déplacement du personnage.",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 20
                },
                <FormObjectParameters.Number>{
                    name: "Chance",
                    key: "chance",
                    shortDescription: "Représente la chance du personnage.",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 100
                },
            ]
        },
        {
            name: "Santé",
            key: "sante",
            container: {
                align: FormObjectParameters.Alignment.Vertical
            },
            components: [
                <FormObjectParameters.Number>{
                    name: "PV max",
                    key: "pv-max",
                    shortDescription: "Points de vie maximum",
                    required: true,
                    modifyInGame: false,
                    min: 0,
                    max: 20,
                    default: {
                        expression: `Math.floor((player['con'] + player['tai'])/10)`,
                        dynamic: false
                    }
                },
                <FormObjectParameters.Slider>{
                    name: "PV",
                    key: "pv",
                    shortDescription: "Points de vie",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 20,
                    step: 1,
                    default: {
                        expression: `player['pv-max']`,
                        dynamic: false
                    }
                },
                <FormObjectParameters.Text>{
                    name: "Blessure grave",
                    key: "blessure-grave",
                    shortDescription: "Blessure grave que le joueur a durant la partie.",
                    required: false,
                    modifyInGame: true,
                    default: ""
                },
            ]
        },
        {
            name: "Magie",
            key: "magie",
            container: {
                align: FormObjectParameters.Alignment.Vertical
            },
            components: [
                <FormObjectParameters.Number>{
                    name: "PM max",
                    key: "pm-max",
                    shortDescription: "Points de magie maximum",
                    required: true,
                    modifyInGame: false,
                    min: 0,
                    max: 24,
                    default: {
                        expression: `Math.floor((player['con'] + player['tai'])/10)`,
                        dynamic: false
                    }
                },
                <FormObjectParameters.Slider>{
                    name: "PM",
                    key: "pm",
                    shortDescription: "Points de magie",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 24,
                    step: 1,
                    default: {
                        expression: `player['pm-max']`,
                        dynamic: false
                    }
                },
            ]
        },
        {
            name: "Santé Mentale",
            key: "sante-mentale",
            container: {
                align: FormObjectParameters.Alignment.Vertical
            },
            components: [
                <FormObjectParameters.Number>{
                    name: "Santé Mental initial",
                    key: "sm-max",
                    shortDescription: "Santé mental initial",
                    required: true,
                    modifyInGame: false,
                    min: 0,
                    max: 100,
                    default: {
                        expression: `player['pou']`,
                        dynamic: false
                    }
                },
                <FormObjectParameters.Slider>{
                    name: "Santé Mental",
                    key: "sm",
                    shortDescription: "Santé mental",
                    required: true,
                    modifyInGame: true,
                    min: 0,
                    max: 100,
                    step: 1,
                    default: {
                        expression: `player['sm-max']`,
                        dynamic: false
                    }
                },
                <FormObjectParameters.Text>{
                    name: "Folie temporaire",
                    key: "folie-temporaire",
                    shortDescription: "Folie temporaire",
                    required: false,
                    modifyInGame: true,
                    default: ""
                },
                <FormObjectParameters.Text>{
                    name: "Folie persistante",
                    key: "folie-persistante",
                    shortDescription: "Folie persistante.",
                    required: false,
                    modifyInGame: true,
                    default: ""
                },
            ]
        },
        {
            name: "Compétences",
            key: "competence",
            container: {
                align: FormObjectParameters.Alignment.Grid,
                column: 3
            },
            components: [
                <FormObjectParameters.ListBasedObject>{
                    name: "Compétences",
                    key: "competence-list",
                    required: true,
                    modifyInGame: false,
                    showAll: true,
                    canHaveDouble: true,
                    object: "competence-type",
                    list: CthulhuRPGInfoCompetence
                },
            ]
        }
    ]
}

export default CthulhuRPGInfo;