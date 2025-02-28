import React, { FC } from 'react'
import { Wrapper } from '../layout/wrapper'
import { Header } from '../layout/header/header';
import { Footer } from '../layout/footer/footer';
import { CommonBreadcrumb } from '../components/breadcrumb/common-breadcrumb';
import { RegisterArea } from '../components/login-register/register-area';


export const RegisterPage:FC = (): JSX.Element => {
  return (
    <Wrapper>
        <Header />
        <CommonBreadcrumb title='Регистрация' subtitle='Регистрация' center={true} />
        <RegisterArea />
        <Footer />
    </Wrapper>
  )
}
