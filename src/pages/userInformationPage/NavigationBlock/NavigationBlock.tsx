import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined"
import FolderSharedOutlinedIcon from "@material-ui/icons/FolderSharedOutlined"
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined"
import EmojiPeopleOutlinedIcon from "@material-ui/icons/EmojiPeopleOutlined"
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined"
import Divider from "@material-ui/core/Divider"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { User } from "../../../Redux/interfaces/user.interface"
import { UserOwnerThisPageInterface } from "../../../Redux/interfaces/userOwnerThisPage.interface"
import NavigationBlockCSS from "./NavigationBlock.module.css"

type NavigationBlockProps = {
  user: User
  userOwnerThisPage: UserOwnerThisPageInterface
}

const NavigationBlock: React.FC<NavigationBlockProps> = ({
  user,
  userOwnerThisPage
}) => {
  return (
    <List className={NavigationBlockCSS.user_information__navigation_block}>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <PeopleAltOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Friends" secondary="Jan 9, 2014" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <EmojiPeopleOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Subscriptions" secondary="Jan 7, 2014" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <GroupAddOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Subscribers" secondary="July 20, 2014" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <Link to={`/user/${user._id}/allAlbums`}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <FolderSharedOutlinedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Albums" secondary="Jan 7, 2014" />
        </ListItem>
      </Link>
      <Divider variant="inset" component="li" />
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <PhotoLibraryOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="July 20, 2014" />
      </ListItem>
    </List>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPage.userOwnerThisPage
})

export default connect(mapStateToProps)(NavigationBlock)
