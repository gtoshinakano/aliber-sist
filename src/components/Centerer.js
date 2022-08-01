import React from 'react'
import {FlexboxGrid, Col} from 'rsuite'

const Centerer = ({children, lg, xs, sm, md}) => {
  return (
    <FlexboxGrid justify="center" align="middle" style={{height: '100vh'}}>
      <FlexboxGrid.Item
        componentClass={Col}
        lg={lg} xs={xs} sm={sm} md={md}
      >{children}</FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

export default Centerer
