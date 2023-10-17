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
    const searchIntoData = (currentKey: string, currentData: JsonArray): JsonObject|undefined => {
        if (currentKey.includes(".")) {
            let splittedKey = currentKey.split(".");
            const keyedData = getStatWithKeyInArray(splittedKey[0], currentData) as JsonObject;
            if (!keyedData) return undefined;

            let newDataArray: JsonArray;
            if (keyedData.type && keyedData.type.toString() === "9") {
                newDataArray = keyedData.list as JsonArray;
            }
            else {
                newDataArray = keyedData.components as JsonArray
            }
            
            return searchIntoData(splittedKey.slice(1).join("."), newDataArray);
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