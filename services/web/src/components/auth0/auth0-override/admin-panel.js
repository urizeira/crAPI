import React, { useEffect } from "react";  // Import useEffect for side-effects
import PropTypes from "prop-types";
import { Button, Form, Card, Input } from "antd";

const AdminPanel = (props) => {
  const [form] = Form.useForm();
  const { hasErrored, errorMessage, onFinish } = props;
  
  useEffect(() => {
    const xmlContent = "your XML content here";  // Define or fetch your XML content
    // form.setFieldsValue({ content: xmlContent });  // Use it inside useEffect or some other function
  }, []);  // Empty dependency array means this will run once when the component mounts

  return (
    <div className="container">
      <Card title="Hello admin" bordered={false} className="form-card admin-card">
        
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
