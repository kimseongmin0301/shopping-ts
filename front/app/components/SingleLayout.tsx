import Head from "next/head";
const SingleLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Head>
      <title>My App</title>
      <link rel="stylesheet" href="/static/css/style.css" />
    </Head>
    <div style={{ height: '800px' }}>
      {children}
    </div>
  </div>
);
export default SingleLayout;
