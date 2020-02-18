import React from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SearchCSS from './Search.module.css'

type handlerInputSearchBoxProps = {
    handlerInputSearchBox: any
    valueSearchBox: any   
  }

const Search: React.FC<handlerInputSearchBoxProps>=({handlerInputSearchBox, valueSearchBox})=>{    
    return (         
            <div className={SearchCSS.all_users__header_block__search_box}>
            <SearchIcon />           
            <InputBase            
            id="InputBase"
            className={ SearchCSS.all_users__header_block__search_box__input }
            value={valueSearchBox}
            onInput={(e)=>handlerInputSearchBox(e)}            
              placeholder="Search…" 
             />
          </div>
    )        
}

export default Search



