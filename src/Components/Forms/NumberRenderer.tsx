import { FormObjectParameters } from "../../Data/RPGInfo";
import { FormBaseProps } from "./interfaces";

export interface NumberRendererProps extends FormBaseProps {
    object: FormObjectParameters.Number
}

const NumberRenderer = (props: NumberRendererProps) => {
    
    let inputInfo: {maxlength?: number} = {};
    
    if (FormObjectParameters.GetType(props.object) == FormObjectParameters.Type.Text) {
        inputInfo['maxlength'] = (props.object as FormObjectParameters.Text).length
    }

    return (
        <>
        </>
    );
}

export default NumberRenderer;