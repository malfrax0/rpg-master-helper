import { JsonArray, JsonObject, JsonValue } from "@prisma/client/runtime/library"

export const isCharacterSheetValid = (characterSheet: any): {valid: boolean, error?: string} => {
    return {valid: true};
}

const getStatWithKeyInArray = (key: string, data: JsonArray): JsonValue|undefined => {
    return data.find((value) => {
        if (!value || typeof value !== "object") return false;
        const obj = value as JsonObject;
        return obj.key && obj.key.toString() === key;
    })
}

export const getStatDefinitionFromKey = (key: string, characterSheet: JsonObject): JsonObject|undefined => {
    enum ParsingState {
        Classic,
        List,
        ListItem
    }

    const searchIntoData = (currentKey: string, currentData: JsonArray, previousState: ParsingState = ParsingState.Classic): JsonObject|undefined => {
        if (currentKey.includes(".")) {
            let splittedKey = currentKey.split(".");
            if (previousState == ParsingState.List) {
                if (isNaN(parseInt(splittedKey[0]))) return undefined;

                return searchIntoData(splittedKey.slice(1).join("."), currentData, ParsingState.ListItem);
            }
            const keyedData = getStatWithKeyInArray(splittedKey[0], currentData) as JsonObject;
            if (!keyedData) return undefined;

            let newDataArray: JsonArray;
            let currentIsList: ParsingState = ParsingState.Classic;
            if (keyedData.type && keyedData.type.toString() === "9") {
                if (typeof(keyedData.object) === "string") {
                    if (!characterSheet.type) return undefined;

                    const objectComponent = (characterSheet.type as JsonArray).find((item) => {
                        const obj = item as JsonObject;
                        return obj.key && obj.key.toString() === keyedData.object.toString();
                    }) as JsonObject;
                    
                    if (!objectComponent) return undefined;
                    newDataArray = objectComponent.components as JsonArray;
                }
                else {
                    // not implemented
                    return undefined;
                }
                currentIsList = ParsingState.List
            }
            else {
                newDataArray = keyedData.components as JsonArray
            }
            
            return searchIntoData(splittedKey.slice(1).join("."), newDataArray, currentIsList);
        }
        const keyedData = getStatWithKeyInArray(currentKey, currentData);

        return keyedData as JsonObject;
    }
    return searchIntoData(key, characterSheet.data as JsonArray);
}

export default {
    isCharacterSheetValid,
    getStatDefinitionFromKey
}