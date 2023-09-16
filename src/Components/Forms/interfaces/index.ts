export interface FormBaseProps {
    onChange: (newValue: any) => Promise<void>,
    value: string
}