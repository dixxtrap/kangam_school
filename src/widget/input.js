import * as React from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
// import {  Visibility ,VisibilityOff,Lock, EditTwoTone} from '@material-ui/icons';
// import { Box } from '@material-ui/system';
import Autocomplete from "@mui/material/Autocomplete";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
// import { Editor } from 'react-draft-wysiwyg';
// import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Editor } from "react-draft-wysiwyg";
import { Box, Select, MenuItem, Typography } from "@mui/material";
import { iconFontSize } from "./header";
import { FiEdit2 } from "react-icons/fi";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { draftData, primary } from "../data";

const style = {
  width: { xs: 300, sm: 380, md: 450, lg: 500 },
};

const CustmiseInputTextArea = ({
  placeholder,
  name,
  value,
  type,
  startIcon,
  onChange,
  sx,
  size,
  color,
  rows,
  minRows,
}) => {
  return (
    <FormControl
      sx={{
        m: 0,
        width: "100%",
        p: 0,
        zIndex: 8,
        borderRadius: "4px",

        "&:hover,&:active ": {
          boxShadow: `${primary[200]}46 0px 10px 18px,${primary[300]}10 0px 15px 12px;`,
        },
        "&::after": {
          opacity: 1,
        },
        ...sx,
      }}
      size={size || "small"}
      variant="outlined"
    >
      <InputLabel sx={{ height: "100%", color: color }} htmlFor={name}>
        {placeholder}
      </InputLabel>
      <OutlinedInput
        id={name}
        type={type}
        value={value}
        multiline
        minRows={minRows | 2}
        rows={rows}
        maxRows={7}
        inputMode="tel"
        sx={{ fontFamily: "poppins", color: color }}
        endAdornment={
          <InputAdornment
            sx={{
              fontSize: { ...iconFontSize },
              color: color,
              mr: "-4px",
            }}
            position="start"
          >
            {startIcon}
          </InputAdornment>
        }
        onChange={onChange}
        // startAdornment={<InputAdornment position="start"><Lock/></InputAdornment>}
        name={name}
        label={placeholder}
      />
    </FormControl>
  );
};
const CustomizeInputPassword = (props) => {
  const [hide, setHide] = React.useState(true);
  const label = (
    <Box
      sx={{
        display: "flex",
        fontSize: 15,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>{props.placeholder}</Box>
    </Box>
  );
  return (
    <Box sx={{ ...props.sx }}>
      <Paper
        elevation={0}
        sx={{
          p: "0px",
          display: "flex",
          alignItems: "center",
          bgcolor: "transparent",
          "&:hover ": {
            boxShadow: `${primary[200]}46 0px 10px 18px,${primary[300]}10 0px 15px 12px;`,
          },
          "&::after": {
            opacity: 1,
          },
        }}
      >
        <FormControl
          sx={{ m: 0, width: "100%", p: 0 }}
          size={props.size || "small"}
          variant="outlined"
        >
          <InputLabel sx={{ height: "100%" }} htmlFor={props.name}>
            {props.placeholder}
          </InputLabel>
          <OutlinedInput
            id={props.name}
            type={hide ? "password" : "text"}
            value={props.value}
            sx={{
              dsplay: "flex",
              alignContent: "center",
              textAlign: "center",
              ...props?.sxInput,
            }}
            onChange={props.onChange}
            name={props.name}
            // startAdornment= {<InputAdornment position="end">
            //   <BsShieldLockFill/>
            // </InputAdornment>}

            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setHide(!hide);
                  }}
                  edge="end"
                  sx={{ fontSize: { ...iconFontSize } }}
                >
                  {hide ? <BsEyeFill /> : <BsEyeSlashFill />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
          />
        </FormControl>
      </Paper>
    </Box>
  );
};

const CustomizeInput = ({
  placeholder,
  name,
  value,
  type,
  startIcon,
  onChange,
  sx,
  sxInput,
  size,
  color,
}) => {
  return (
    <FormControl
      sx={{
        m: 0,
        width: "100%",
        p: 0,
        borderRadius: "4px",

        "&:hover,&:active ": {
          boxShadow: `${primary[200]}46 0px 10px 18px,${primary[300]}10 0px 15px 12px;`,
        },
        "&::after": {
          opacity: 1,
        },
        ...sx,
      }}
      size={size || "small"}
      variant="outlined"
    >
      <InputLabel sx={{ height: "100%", color: color }} htmlFor={name}>
        {placeholder}
      </InputLabel>
      <OutlinedInput
        id={name}
        type={type}
        value={value}
        inputMode="tel"
        sx={{ fontFamily: "poppins", color: color, ...sxInput }}
        endAdornment={
          <InputAdornment
            sx={{
              fontSize: { ...iconFontSize },
              color: color,
              mr: "-4px",
            }}
            position="start"
          >
            {startIcon}
          </InputAdornment>
        }
        onChange={onChange}
        // startAdornment={<InputAdornment position="start"><Lock/></InputAdornment>}
        name={name}
        label={placeholder}
      />
    </FormControl>
  );
};

const CustomizeSelectInput = (props) => {
  React.useEffect(() => {}, [props.value]);
  const label = (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {props.icon}
      {props.placeholder}
    </Box>
  );
  return (
    <Box style={style}>
      <Paper
        component=""
        sx={{ p: "0px", display: "flex", alignItems: "center" }}
        style={{ width: "100%!important" }}
      >
        <Autocomplete
          disablePortal
          sx={style}
          onInputChange={(event, newInputValue) => {
            props.onChange(props.identity, newInputValue);
          }}
          options={props.data}
          inputValue={props.value}
          value={props.value}
          renderInput={(params) => (
            <TextField {...params} label={label} sx={{ width: "100%" }} />
          )}
        />
      </Paper>
    </Box>
  );
};
const CustomizeSelect = ({
  placeholder,
  name,
  value,
  type,
  startIcon,
  onChange,
  sx,
  size,
  list,
}) => {
  return (
    <Box sx={{ ...sx }}>
      <Paper
        elevation={0}
        sx={{
          p: "0px",
          display: "flex",
          alignItems: "center",
          bgcolor: "transparent",
          "&:hover,&:active ": {
            boxShadow: `${primary[200]}46 0px 10px 18px,${primary[300]}10 0px 15px 12px;`,
          },
          "&::after": {
            opacity: 1,
          },
        }}
      >
        <FormControl
          sx={{ m: 0, width: "100%", p: 0 }}
          size={size || "small"}
          variant="outlined"
        >
          <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={placeholder}
            onChange={onChange}
            name={name}
            endAdornment={
              <InputAdornment
                sx={{
                  fontSize: { ...iconFontSize },
                  color: "dimgray",
                  mr: 2,
                }}
                position="end"
              >
                {startIcon}
              </InputAdornment>
            }
          >
            {list.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </Box>
  );
};

const CustomizeRichText = ({
  title,
  value,
  placeholder,
  toolbar,
  identity,
  classe,
  onChange,
  keypress,
}) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        ...style,
        p: "0px",
        borderRadius: 0,
        width: "100%",
        display: "flex",

        flexDirection: "column",
      }}
    >
      <Box>
        {!!title && (
          <Typography
            variant="body1"
            textAlign="left"
            pl="15px"
            py={1}
            justifyContent="left"
            color="initial"
            fontSize={"poppins"}
            fontWeight="bold"
          >
            {title}
          </Typography>
        )}

        <Editor
          editorState={value}
          wrapperClassName={`draft-wrapper ${classe}`}
          editorClassName={`draft-editor ${classe}`}
          toolbar={toolbar || draftData}
          minRows={6}
          onEditorStateChange={(e) => {
            onChange(e, identity);
          }}
          placeholder={placeholder}
          editorStyle={{ fontSize: "inherit" }}
        />
      </Box>
    </Paper>
  );
};

const CustomizeGroupSelectInput = (props) => {
  const label = (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {props.icon}
      {props.placeholder}
    </Box>
  );
  return (
    <Box style={style}>
      <Paper
        component=""
        sx={{ p: "0px", display: "flex", alignItems: "center" }}
        style={{ width: "100%!important" }}
      >
        <Autocomplete
          disablePortal
          sx={style}
          onInputChange={(event, newInputValue) => {
            props.onChange(props.identity, newInputValue);
          }}
          options={props.data}
          value={props.value}
          groupBy={(option) => option.groupBy}
          inputValue={props.value}
          renderInput={(params) => (
            <TextField {...params} label={label} sx={{ width: "100%" }} />
          )}
        />
      </Paper>
    </Box>
  );
};

export default CustomizeInput;
export {
  CustomizeInputPassword,
  CustomizeSelectInput,
  CustmiseInputTextArea,
  CustomizeGroupSelectInput,
  CustomizeSelect,
  CustomizeRichText,
};
