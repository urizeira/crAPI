import React from "react";  // Import useEffect for side-effects
import PropTypes from "prop-types";
import {  Form, Card } from "antd";

const AdminPanel = (props) => {
  const [form] = Form.useForm();
  const {  onFinish } = props;
  
  
  return (
    <div className="container">
      <Card title="Hello Admin" bordered={false} className="form-card admin-card">
        
        <Form
          form={form}
          name="admin-panel"
          initialValues={{ remember: true }}
          labelCol={{ sm: { span: 3 } }}
          wrapperCol={{ sm: { span: 16 } }}
          onFinish={onFinish}
        >
          This feature will be released soon
        </Form>
      </Card>
    </div>
  );
};

AdminPanel.propTypes = {
  onFinish: PropTypes.func,
  hasErrored: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default AdminPanel;
