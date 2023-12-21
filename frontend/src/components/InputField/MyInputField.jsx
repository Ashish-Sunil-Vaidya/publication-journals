import React, { useState } from "react";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";

const MyInputField = ({
  fieldType = "password",
  value,
  valueState,
  error = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  console.log("=== value MyInputField.jsx [19] ===", value);

  return (
    <TextField
      type={
        fieldType === "password"
          ? showPassword
            ? "text"
            : "password"
          : fieldType
      }
      name="password"
      id="password"
      placeholder={fieldType === "password" ? "Password" : "example@gmail.com"}
      className={
        "bg-gray-50 border-2 text-gray-900 sm:text-sm rounded-lgblock w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " +
        (error ? " border-red-500" : " border-gray-300")
      }
      onChange={(e) => {
        valueState(e.target.value);
      }}
      value={value}
      InputProps={
        fieldType === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <PersonIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }
      }
      error={!!error}
      sx={{
        "& .Mui-focused .MuiInputBase-input": {
          "border-color": "transparent",
          "box-shadow": "none",
        },
      }}
    />
  );
};

export default MyInputField;
