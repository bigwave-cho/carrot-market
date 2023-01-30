import Button from '@/components/button';
import Layout from '@/components/layout';
import TextArea from '@/components/textarea';
import { NextPage } from 'next';

const Write: NextPage = () => {
  return (
    <Layout canGoBack title="Write Post">
      <form className="px-4 py-10">
        <TextArea placeholder="Ask a question!"></TextArea>
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
