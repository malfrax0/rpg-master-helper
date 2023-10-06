

export namespace FormObjectParameters {
    export enum Type {
        Number = 0,
        Image = 1,
        Text = 2,
        LargeText = 3,
        Checkbox = 4,
        Switch = 5,
        Slider = 6,
        Container = 7,
        Object = 8,
        ListBasedObject = 9,
        NullObject = 10,
    };

    export enum Alignment {
        Grid = 1,
        Horizontal = 2,
        Vertical = 3
    }
    
    export interface Base {
        name: string,
        key: string,
        shortDescription: string,
        longDescription?: string,
        required: boolean,
        modifyInGame: boolean,
        calculated?: boolean,
        inGameOnly?: boolean,
        default?: any,
        pinned?: boolean,
        definedByList?:boolean,
        type: Type
    }

    export interface Number extends Base {
        min?: number | string,
        max?: number | string,
    }

    export interface Text extends Base {
        length?: number,
        validation?: RegExp
    }

    export interface LargeText extends Base {
        length?: number,
        row?: number
    }

    export interface Checkbox extends Base {
        disabled: boolean
    }

    export interface Switch extends Base {
        labels?: {
            active: string,
            inactive: string
        }
    }

    export interface Slider extends Number {
        step?: number
    }

    export interface Container {
        align: Alignment,
        spacing?: number,
        column?: number
    }
    
    export interface ListBasedObject extends Base {
        object: Category | string,
        container: Container,
        showAll: boolean,
        canHaveDouble: boolean,
        list: any[]
    }

    export interface Category {
        name: string,
        key: string,
        container: Container,
        components: Base[],
        row?: number,
    }

    export interface ValueExpression {
        expression: string,
        dynamic: boolean
    }

    export const GetType = (data: any): Type => {
        return data.type ?? Type.NullObject;
    }

    export const GetGridSizeFromContainer = (container: Container, length?: number) => {
        switch (container.align)
        {
            case Alignment.Vertical:
                return 1;
            case Alignment.Horizontal:
                return 12 / (Math.max(1, length ?? 1));
            default:
                return container.column ?? 1;
        }
    }

    export const ComputeExpression = <T>(valueExpression: ValueExpression, playerInfo: any, objectInfo?: any) => {
        return Function("Math", "player", "object", `"use strict";return (${valueExpression.expression})`)(Math, playerInfo, objectInfo) as T;
    }

    export type ComponentObjectType = Slider | Number | Text | LargeText | Container | Checkbox | Switch | ListBasedObject | Object; 

}

export default interface RPGInfo {
    name: string,
    key: string,
    shortDescription: string,
    longDescription: string,

    type?: FormObjectParameters.Category[],
    data: FormObjectParameters.Category[],
};