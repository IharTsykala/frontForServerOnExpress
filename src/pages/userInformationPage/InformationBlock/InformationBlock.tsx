import React from "react"
import { connect } from "react-redux"
import InformationBlockCSS from "./InformationBlock.module.css"
import { User } from "../../../Redux/interfaces/user.interface"
import { UserOwnerThisPageInterface } from "../../../Redux/interfaces/userOwnerThisPage.interface"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"

type InformationBlockProps = {
  user: User
  userOwnerThisPage: UserOwnerThisPageInterface
}

const InformationBlock: React.FC<InformationBlockProps> = ({
  user,
  userOwnerThisPage
}) => {
  const handleSubmit = (e: any) => {}
  return (
    <section className={InformationBlockCSS.user_profile__user_information}>
      <h4>USER INFORMATION</h4>
      <Box
        className={
          InformationBlockCSS.user_profile__user_information__block_information
        }
      >
        <List component="ul" aria-label="mailbox folders">
          <ListItem button>
            <ListItemText
              primary="Login:"
              secondary={`${userOwnerThisPage.login}`}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="FirstName:"
              secondary={`${userOwnerThisPage.firstName}`}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="LastName:"
              secondary={`${userOwnerThisPage.lastName}`}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="Email:"
              secondary={`${userOwnerThisPage.email}`}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="Phone:"
              secondary={`${userOwnerThisPage.phone}`}
            />
          </ListItem>
        </List>
        <Box
          className={
            InformationBlockCSS.user_profile__user_information__block_button
          }
        >
          <Link to={`/user/${userOwnerThisPage._id}/edit`}>
          <Button
            variant="outlined"
            component="button"
            onClick={(e: any) => handleSubmit(e)}
          >
            EDIT INFORMATION
          </Button>
          </Link>          
          <Button
            variant="outlined"
            component="button"
            onClick={(e: any) => handleSubmit(e)}
          >
            SOME BUTTON
          </Button>
        </Box>
      </Box>
    </section>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPage.userOwnerThisPage
})

export default connect(mapStateToProps)(InformationBlock)
