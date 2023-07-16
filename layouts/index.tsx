import { ReactNode } from 'react';
import Head from '../components/head';
import Navbar from '../components/navigations/navbar';

export interface ILayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const { title, description, children } = props;

  return (
    <div id='app-container' className='min-h-screen'>
      <Head title={title} description={description} />
      <div className='mx-auto min-h-screen'>
        <Navbar />
        <div className='mx-auto min-h-screen'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
