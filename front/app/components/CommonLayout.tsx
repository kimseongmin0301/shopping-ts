import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export const metadata = {
  title: '1234',
  description: 'Generated by create next app',
}

const CommonLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Head>
      <title>My App</title>
      <link rel="stylesheet" href="/static/css/style.css" />
    </Head>
    <Header />
    {children}
    <Footer />
  </div>
);
export default CommonLayout;
