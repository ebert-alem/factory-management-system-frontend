import { useState } from "react";
import { TextField, MenuItem } from "@mui/material";

interface Option {
  id?: number;
  name: string;
}

interface Props {
  options: Option[];
  inputLabel: string;
  defaultValue?: string;
}

export const CustomSelectComponent = ({ options, inputLabel, defaultValue }: Props) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue ? defaultValue : "");

  const handleOptionChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (event) => {
    setSelectedOption(event.target.value);
  };

  const CustomSelect = () => {
    return (
      <TextField
        select
        label={inputLabel}
        value={selectedOption}
        onChange={handleOptionChange}
        margin="normal"
        fullWidth
        required
        size="small"
      >
        {options.map((option) => (
          <MenuItem key={option.id ? option.id : option.name} value={option.id ? option.id : option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    )
  }

  return {
    CustomSelect,
    selectedOption
  }
};

