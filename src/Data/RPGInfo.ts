

export namespace FormObjectParameters {
    export enum Type {
        Number = 0,
        Image = 1,
        Text,
        LargeText,
        Checkbox,
        Switch,
        Slider,
        Container,
        Object,
        ListBasedObject,
        NullObject,
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
        default?: any,
        pinned?: boolean,
        definedByList?:boolean,
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
        length?: number
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

    export interface Object extends Base {
        container: Container,
        components: Base[]
    }
    
    export interface ListBasedObject extends Base {
        object: Object | string,
        showAll: boolean,
        canHaveDouble: boolean,
        list: any[]
    }

    export interface Category {
        name: string,
        key: string,
        container: Container,
        components: Base[],
    }

    export interface ValueExpression {
        expression: string,
        dynamic: boolean
    }

    export const GetType = (data: Base): Type => {
        if ("step" in data) return Type.Slider;
        if ("min" in data) return Type.Number;
        if ("validation" in data) return Type.Text;
        if ("length" in data) return Type.LargeText;
        if ("align" in data) return Type.Container;
        if ("disabled" in data) return Type.Checkbox;
        if ("labels" in data) return Type.Switch;
        if ("components" in data) return Type.Object;
        if ("list" in data) return Type.ListBasedObject;
        return Type.NullObject;
    }

    export type ComponentObjectType = Slider | Number | Text | LargeText | Container | Checkbox | Switch | ListBasedObject | Object; 
}

export default interface RPGInfo {
    name: string,
    key: string,
    shortDescription: string,
    longDescription: string,

    type?: FormObjectParameters.Object[],
    data: FormObjectParameters.Category[],
};