import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Card, Input } from "antd";

const NewXMLPost = (props) => {
  const [form] = Form.useForm();
  const { hasErrored, errorMessage, onFinish } = props;

  const loadCarParts = () => {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
       <CarParts>
        <CarPart id="1">
          <Name>Brake Pad</Name>
          <Manufacturer>Bosch</Manufacturer>
          <Price>50.00</Price>
          <InStock>true</InStock>
          <Weight>1.2</Weight>
          <Material>&xxe;</Material>
          <Lifespan>2</Lifespan>
        </CarPart>
        <CarPart id="2">
          <Name>Oil Filter</Name>
          <Manufacturer>Fram</Manufacturer>
          <Price>9.99</Price>
          <InStock>true</InStock>
          <Weight>0.5</Weight>
          <Material>Paper</Material>
          <Lifespan>1</Lifespan>
        </CarPart>
        <CarPart id="3">
          <Name>Spark Plug</Name>
          <Manufacturer>NGK</Manufacturer>
          <Price>3.99</Price>
          <InStock>true</InStock>
          <Weight>0.1</Weight>
          <Material>Ceramic</Material>
          <Lifespan>2</Lifespan>
        </CarPart>
        <CarPart id="4">
          <Name>Air Filter</Name>
          <Manufacturer>KN</Manufacturer>
          <Price>45.00</Price>
          <InStock>true</InStock>
          <Weight>0.8</Weight>
          <Material>Fabric</Material>
          <Lifespan>5</Lifespan>
        </CarPart>
        <CarPart id="5">
          <Name>Timing Belt</Name>
          <Manufacturer>Gates</Manufacturer>
          <Price>100.00</Price>
          <InStock>false</InStock>
          <Weight>1.5</Weight>
          <Material>Rubber</Material>
          <Lifespan>6</Lifespan>
        </CarPart>
        <CarPart id="6">
          <Name>Fuel Pump</Name>
          <Manufacturer>Bosch</Manufacturer>
          <Price>120.00</Price>
          <InStock>true</InStock>
          <Weight>2.0</Weight>
          <Material>Metal</Material>
          <Lifespan>10</Lifespan>
        </CarPart>
        <CarPart id="7">
          <Name>Battery</Name>
          <Manufacturer>Optima</Manufacturer>
          <Price>200.00</Price>
          <InStock>true</InStock>
          <Weight>25.0</Weight>
          <Material>Lead Acid</Material>
          <Lifespan>4</Lifespan>
        </CarPart>
      </CarParts>
          
    `;
    form.setFieldsValue({ content: xmlContent });
  };

  return (
    <div className="container">
      <Card title="Car parts editor" bordered={false} className="form-card xml-card">
      {hasErrored && <div className="error-message">{errorMessage}</div>}
        <Form
          form={form}
          name="new-xml-post"
          initialValues={{ remember: true }}
          labelCol={{ sm: { span: 3 } }}
          wrapperCol={{ sm: { span: 16 } }}
          onFinish={onFinish}
        >
          <Form.Item
            name="content"
            label="XML"
            rules={[{ required: true, message: 'XML Content is required' }]}
          >
            <Input.TextArea rows="20" cols="100" />
          </Form.Item>
          <div className="car-parts-button-div">
            <Form.Item wrapperCol={{ sm: { span: 5 } }}>
              <Button type="primary" onClick={loadCarParts} className="form-button">
                Load car parts
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ sm: { span: 5 } }}>
            
              <Button type="primary" htmlType="submit" className="form-button">
                Update parts
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

NewXMLPost.propTypes = {
  onFinish: PropTypes.func,
  hasErrored: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default NewXMLPost;
