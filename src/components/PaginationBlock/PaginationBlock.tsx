import React, { useEffect, useState } from "react"
import PaginationBlockCSS from "./PaginationBlock.module.css"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const handleChangeSelect = (str:any) => {
return str
}

function PaginationBlock() {
    const[numberPage, setNumberPage]: any =  useState(1)
    return (
        <section className={PaginationBlockCSS.All_Users__Pagination_Block}>
            <div className={PaginationBlockCSS.All_Users__Pagination_Block__Select_block}>        
        
            <InputLabel htmlFor="outlined-age-native-simple">
          Amount Users
        </InputLabel>
        <Select
          native
          value={8}
          onChange={handleChangeSelect('age')}
          labelWidth={40}
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >          
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
        </Select>
            </div>
            
            <div className={PaginationBlockCSS.All_Users__Pagination_Block__Button_block}>
            <button >prev</button>
            <div>{numberPage}</div>
            <button>next</button>   
            </div>                        
        </section>
    )
}

export default PaginationBlock
