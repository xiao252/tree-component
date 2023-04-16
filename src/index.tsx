import { createRoot } from "react-dom/client";
import { SelectTree } from "./DepartmentSelect";
import { Form,Input,Button } from 'antd'
import "./index.css";
import "antd/dist/antd.css";

const App = () => {
  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ 
      tree:[{id:1211,path:'1/12/121/1211',name:'子1211',pathName:'1/12/121/1211'}],
      //[{id:111,path:'1/11/111',name:'xxx111',pathName:'1/11/111'},{id:112,path:'1/11/112',name:'xxx112',pathName:'1/11/112'}]
      password: '123' }}
    onFinish={(values)=>{
      console.log('onFinish,values', values)
    }}
    onFinishFailed={({ values, errorFields, outOfDate })=>{
      console.log('onFinishFailed, errorFields, outOfDate',  values, errorFields, outOfDate)
    }}
    autoComplete="off"
  >
    <Form.Item
      label="部门选择"
      name="tree"
      rules={[{ required: true, message: 'Please input your 部门选择!' }]}
    >
      <SelectTree  />
    </Form.Item>
    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  );
};

const dom:any = document.getElementById("container")
createRoot(dom).render(<App />);
