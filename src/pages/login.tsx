import React, { FC } from 'react'
import { Wrapper } from '../layout/wrapper'
import { Header } from '../layout/header/header'
import { CommonBreadcrumb } from '../components/breadcrumb/common-breadcrumb'

export const LoginPage:FC = ():JSX.Element => {
  return (
    <Wrapper>
        <Header />
        <CommonBreadcrumb title='Войти' subtitle='Войти' center={true} />
    </Wrapper>
  )
}
