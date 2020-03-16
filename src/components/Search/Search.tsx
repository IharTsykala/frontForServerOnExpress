import React, { useState } from "react"
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"
import SearchCSS from "./Search.module.css"
import { connect } from "react-redux"
import {
  setInitialSearchStringStateAction,
  setCurrentSearchStringState
} from "../../Redux/store/searchStringState/searchStringState.actions"

type SearchProps = {
  dispatch: any
}

const Search: React.FunctionComponent<SearchProps> = ({ dispatch }) => {
  const [stateValue, setStateValue] = useState("")
  const handlerInputSearchBox = (e: any) => {
    setStateValue(e.target.value)
    if (e.target.value.length > 2)
      dispatch(setCurrentSearchStringState(e.target.value))
    else dispatch(setInitialSearchStringStateAction())
  }

  return (
    <div className={SearchCSS.all_users__header_block__search_box}>
      <SearchIcon />
      <InputBase
        id="InputBase"
        className={SearchCSS.all_users__header_block__search_box__input}
        value={stateValue}
        onInput={e => handlerInputSearchBox(e)}
        placeholder="Search…"
      />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  searchStringState: state.searchStringState.searchStringState
})

export default connect(mapStateToProps)(Search)
