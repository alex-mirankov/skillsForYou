import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      root: {
        color: '#938e8e',
        fontFamily: 'gilroy_extra_bold',
        fontSize: '1.5rem',
      },
      select: {
        padding: '0',
        height: '51px !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    MuiFormControl: {
      root: {
        width: '80%',
        marginBottom: '30px',
      },
    },
    MuiOutlinedInput: {
      root: {
        borderColor: '#acacac',
        border: '2px solid #acacac',
        borderRadius: '9px',
      },
      focused: {
        color: '#acacac',
        borderColor: '#acacac',
      },
    },
    MuiPrivateNotchedOutline: {
      root: {
        display: 'none',
      },
    },
    MuiSvgIcon: {
      root: {
        display: 'none',
      }
    },
    MuiFormLabel: {
      root: {
        color: '#938e8e',
        fontFamily: 'gilroy_extra_bold',
        fontSize: '1.5rem',
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-7px',
        marginLeft: '12px',
      },
      focused: {
        color: '#acacac',
        display: 'none',
      }
    },
    MuiInputLabel: {
      shrink: {
        display: 'none',
      },
    },
  }
})

export class ShareSelect extends React.Component {
  render() {
    let { menuItemObject, label, handleChange } = this.props;
    return (
      <select>
        {
          menuItemObject.map((i) => {
            return (
              <option key={i.id} value={i.id}>{i.name}</option>
            );
          })
        }
      </select>
      // <MuiThemeProvider theme={theme}>
      //   <FormControl variant="outlined">
      //     <InputLabel htmlFor="outlined-age-simple">
      //       {label}
      //     </InputLabel>
      //     <Select
      //       value={label}
      //       onChange={handleChange}
      //       input={<OutlinedInput name="age" id="outlined-age-simple" />}
      //     >
      //       {
      //         menuItemObject.map((i) => {
      //           return (
      //             <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
      //           );
      //         })
      //       }
      //     </Select>
      //   </FormControl>
      // </MuiThemeProvider>
    );
  }
}
