import React, { Fragment } from 'react'
import Sidbar from '../Sidebar/Sidbar'

const Layout = (props) => {
  return <Fragment>
    <Sidbar />
    <div>{ props.children }</div>
  </Fragment>
}

export default Layout