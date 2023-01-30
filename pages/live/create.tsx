import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import TextArea from '@/components/textarea';
import { NextPage } from 'next';

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="Go Live">
      <form className="space-y-5 px-4 py-10">
        <Input name="name" label="Name" type="text"></Input>
        <Input
          name="price"
          label="Price"
          kind="price"
          type="text"
          placeholder="0"
        ></Input>
        <TextArea label="Description" name="description"></TextArea>
        <Button text="Go Live"></Button>
      </form>
    </Layout>
  );
};

export default Create;
