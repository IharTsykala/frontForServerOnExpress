import React from 'react'
import { connect } from 'react-redux'
import { User } from './interfaces/user.interface';

const ReduxPage = ({user}: {user: User}) => (
    <div>
        {`${user.login} ${user.role}`}
    </div>
)

const mapStateToProps = (state: any) => ({
    user: state.common.user
  })

export default connect(mapStateToProps)(ReduxPage)
