import React from 'react';
import Header from './header';
import Footer from './footer';

interface IProps {
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Layout: React.FC<IProps> = ({
  children,
  hideHeader,
  hideFooter,
}) => {
  return (
    <>
      {!hideHeader && <Header />}
      {children}
      {!hideFooter && <Footer />}
    </>
    );
};

Layout.defaultProps = {
  hideHeader: false,
  hideFooter: false,
};

export default Layout;
