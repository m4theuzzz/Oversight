/* eslint-disable jsx-a11y/role-supports-aria-props */
import {
  Autocomplete,
  AutocompleteProps,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextFieldProps,
  Typography,
  TextField,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

import apiRoutes from "src/routes";
import { Control, Controller } from "react-hook-form";
import { pathToUrl } from "src/utils/routerCompile";
import { useApi } from "../hooks/useApi";
import Text from "./Text";
import TextInput from "./TextInput";

type DropdownAsyncRHFProps = {
  asyncProps: {
    endpoint?: string;
    listModel?: string;
    valueTag: string;
    dependency?: any;
    getOptionLabelKey: string;
    isOptionEqualToValueKey: string;
    callback?: any;
    additionalFilter?: any;
    listModelParams?: object;
    getOptionDisabled?: any;
    getOptionLabelFn?: any;
    optionEndBadget?: any;
    dataTag?: string;
    noStaleTime?: boolean;
  };
  enableClearable?: boolean;
  paperEndComponent?: React.ReactNode;
  helperTooltipText?: string;
  changeValueCallback?: (a1: any) => any;
  endBadget?: React.ReactNode;
  control: Control<any>;
  name: string;
} & Omit<AutocompleteProps<any, any, any, any>, "renderInput" | "options"> &
  TextFieldProps;

const DropdownAsyncRHF = (props: DropdownAsyncRHFProps) => {
  const {
    endpoint,
    listModel,
    valueTag,
    dependency,
    getOptionLabelKey,
    isOptionEqualToValueKey,
    additionalFilter,
    listModelParams,
    getOptionDisabled,
    getOptionLabelFn,
    optionEndBadget,
    dataTag,
    noStaleTime,
  } = props.asyncProps;

  const [open, setOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const fetchData = useFetchData(
    valueTag,
    endpoint,
    listModel,
    "",
    additionalFilter,
    listModelParams
  );

  const dropdownQueryKey =
    dependency != undefined
      ? [endpoint, dependency]
      : listModel
      ? [listModel]
      : [endpoint];

  const adaptData = (data: any) => {
    console.log("%cXABLAU", "color: purple", data);
    const newOptions = data?.data?.data;
    return newOptions;
  };

  const { isFetching, data, refetch } = useQuery({
    queryKey: [...dropdownQueryKey],
    queryFn: fetchData,
    keepPreviousData: true,
    onError: (err: any) => {
      toast.error("Erro ao requisitar dados");
      toast.error(err.response?.data);
    },

    staleTime: noStaleTime ? 0 : Infinity,
  });

  const options = data ? adaptData(data) : [];

  const handleInputChange = (e: any) => {
    if (listModel && e) {
      setSearchText(e.target.value);
    }
  };

  const handleChange = (rhfChange: any) => (ev: any, val: any) => {
    console.log("%cXABLAU", "color: blue", ev, val);
    rhfChange(val === null ? null : val[valueTag]);

    !!props.changeValueCallback && props.changeValueCallback(val);
  };

  const handleOpen = () => {
    refetch();
    setOpen(true);
    setSearchText("");
  };

  const handleClose = () => {
    setOpen(false);
    setSearchText("");
  };

  console.log(
    "%cXABLfewefwfewAU",
    "color: red",
    options.find((option: any) => {
      return option["name"] == "Matheus";
    })
  );

  return (
    <Controller
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexWrap: "no-wrap",
              justifyContent: "center",
            }}
          >
            <Autocomplete
              {...props}
              open={open}
              options={options}
              loading={isFetching}
              loadingText="Carregando..."
              onOpen={handleOpen}
              onClose={handleClose}
              onChange={handleChange(onChange)}
              onInputChange={handleInputChange}
              fullWidth
              ListboxProps={{ style: { maxHeight: 300 } }}
              getOptionDisabled={getOptionDisabled ?? null}
              filterOptions={listModel ? (x) => x : props.filterOptions}
              renderOption={(props, option: any) => {
                return (
                  <li
                    {...props}
                    key={option[valueTag]}
                    aria-selected={option[valueTag] == value}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span
                      style={{
                        width: !!optionEndBadget ? "80%" : "90%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {!!getOptionLabelFn
                        ? getOptionLabelFn(option)
                        : option[getOptionLabelKey]}
                    </span>
                    {!!optionEndBadget ? optionEndBadget(option) : null}
                  </li>
                );
              }}
              disableClearable={!props.enableClearable}
              getOptionLabel={(option: any) =>
                !!getOptionLabelFn
                  ? getOptionLabelFn(option)
                  : option[getOptionLabelKey] || ""
              }
              isOptionEqualToValue={(option: any, value: any) =>
                option[isOptionEqualToValueKey] ==
                value[isOptionEqualToValueKey]
              }
              value={{
                ...options.find((option: any) => {
                  return option[valueTag] ==value;
                }),
              }}
              noOptionsText={props.noOptionsText || <>Sem resultados</>}
              renderInput={(params: any) => {
                return (
                  <form autoComplete="off">
                    <TextField
                      {...params}
                      sx={{
                        "& input, .MuiInputBase-root ": {
                          cursor: open ? "text" : "pointer",
                        },
                      }}
                      required={props.required}
                      name={props.name}
                      errorMsg={error?.message}
                      label={props.label}
                      placeholder={open ? "Pesquise..." : ""}
                      helperTooltipText={props.helperTooltipText}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <Fragment>
                            {!!props.InputProps?.endAdornment &&
                              props.InputProps.endAdornment}
                            {isFetching ? (
                              <CircularProgress
                                color="primary"
                                sx={{ marginRight: 5 }}
                                size={20}
                              />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </Fragment>
                        ),
                      }}
                      inputContainerSx={{
                        paddingLeft: "10px",
                        paddingTop: "3px",
                        paddingBottom: "4px",
                      }}
                    />
                  </form>
                );
              }}
            />
            {!!props.endBadget && (
              <Box sx={{ mt: !!error?.message ? "12px" : "24px", ml: "5px" }}>
                {props.endBadget}
              </Box>
            )}
          </Box>
        );
      }}
      control={props.control}
      name={props.name}
    />
  );
};

export default DropdownAsyncRHF;

const useFetchData = (
  valueTag: string,
  endpoint?: string,
  listModel?: string,
  searchText = "",
  additionalFilter = [],
  listModelsParams = {}
) => {
  const api = useApi();

  const fetchData = async () => {
    if (!!endpoint) return await api.get(endpoint);
  };

  return fetchData;
};
