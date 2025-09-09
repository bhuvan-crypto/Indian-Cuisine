import * as React from "react";
import type { JSXElement } from "@fluentui/react-components";
import {
    Dropdown,
    makeStyles,
    Option,
    useId,
    Persona,
} from "@fluentui/react-components";
import type { DropdownProps } from "@fluentui/react-components";

const useStyles = makeStyles({
    root: {
        // Stack the label above the field with a gap
        display: "grid",
        justifyItems: "start",
        gap: "20px",
        maxWidth: "400px",
        '& .fui-Dropdown': {
            minWidth: '150px'
        }
    },
    field: {
        display: "grid",
        justifyItems: "start",
        gap: "2px",
    },
    
});

 const Controlled = (props: Partial<DropdownProps> & { value: string, setValue: (d: string) => void, options: string[],label:string }): JSXElement => {
    const { value, setValue, label,options } = props;
    const comboId = useId("combo-controlled");
    const styles = useStyles();
    const onOptionSelect: (typeof props)["onOptionSelect"] = (ev, data) => {
        setValue(data.optionText ?? "");
    };
    return (
        <div className={styles.root}>
            <div className={styles.field}>
                <label htmlFor={`${comboId}-controlled`}>
                   {label}
                </label>
                <Dropdown
                    id={`${comboId}-controlled`}
                    {...props}
                    value={value || 'All'}
                    onOptionSelect={onOptionSelect}
                    defaultValue={value}
                >
                    {options.map((opt) => (<Option text={opt} value={opt} >{opt ? opt.charAt(0).toUpperCase() + opt.slice(1) : 'All'}</Option>))}
                </Dropdown>
            </div>
        </div>
    );
};

export default Controlled;