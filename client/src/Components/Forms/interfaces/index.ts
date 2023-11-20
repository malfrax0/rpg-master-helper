export interface FormBaseProps {
    onChange: (newValue: any, overrideKey?: string) => Promise<void>,
    realKey: string,
    value: string
}