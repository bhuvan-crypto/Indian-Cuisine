import * as React from "react";
import type { JSXElement } from "@fluentui/react-components";
import {
  Field,
  InputOnChangeData,
  SearchBox,
} from "@fluentui/react-components";
import type { SearchBoxChangeEvent } from "@fluentui/react-components";

 const SearchBoxx = ({value,setValue,label}:{
    label: string;
    value: string;
    setValue: (d: string) => void;
 }): JSXElement => {
  const [valid, setValid] = React.useState(true);

  const onChange: (
    ev: SearchBoxChangeEvent,
    data: InputOnChangeData
  ) => void = (_, data) => {
    if (data.value.length <= 20) {
      setValue(data.value);
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <Field
      label={label}
      validationState={valid ? "none" : "warning"}
      validationMessage={valid ? "" : "Input is limited to 20 characters."}
    >
      <SearchBox value={value} onChange={onChange} />
    </Field>
  );
};

export default SearchBoxx;