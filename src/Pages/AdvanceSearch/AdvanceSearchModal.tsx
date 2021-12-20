import React, { useEffect, useState } from "react";
// import styles from "./AdvanceSearchModal.module.css";
import { Modal, Button, Row, TreeSelect, Select, Form } from "antd";
import BackendService from "../../Backend/backend";

type SearchModalProps = {
  setId: React.Dispatch<React.SetStateAction<number>>;
  // setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  // setSentiment: React.Dispatch<React.SetStateAction<any>>;
  // setSourceId: React.Dispatch<React.SetStateAction<any>>;
  // setCategoryId: React.Dispatch<React.SetStateAction<any>>;
};

const AdvanceSearchModal: React.FC<SearchModalProps> = (props) => {
  const { setId } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [sources, setSources] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [formkey, setFormkey] = useState<number>(1);

  const [selectedCategory, setSelectedCategory] = useState<any>([
    "13010000,04018000",
  ]);
  const [selectedSource, setSelectedSource] = useState<any>(["277,4171"]);
  const [selectedSentiment, setSelectedSentiment] =
    useState<string>("Positive");

  const [form] = Form.useForm();

  const apiCallSources = () => {
    BackendService.getAllSources().then((data: any) => {
      console.log("sources :>> ", data.sources);
      const mappedsources = data.sources.map((item: any) => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ));
      setSources(mappedsources);
    });
  };
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const apiCallCategory = () => {
    BackendService.getAllCategory().then((data: any) => {
      const mappedcategory = data.map((item: any) => ({
        title: capitalizeFirstLetter(item?.category),
        value: item?.iptc_code,
        children: item?.sub_categories.map((subitem: any) => ({
          title: capitalizeFirstLetter(subitem?.category),
          value: subitem?.iptc_code,
        })),
      }));
      setCategory(mappedcategory);
    });
  };
  useEffect(() => {
    apiCallSources();
    apiCallCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    setFormkey(Math.random());
    // setSearchTerm("Iphone");
    // setSentiment("Positive");
    // setSourceId("277,4171");
    // setCategoryId("13010000,04018000");
    localStorage.setItem("searchString", "Iphone");
    localStorage.setItem("sentiment", "Positive");
    localStorage.setItem("sourceId", "277,4171");
    localStorage.setItem("categoryId", "13010000,04018000");
    setId(Math.random());
    setVisible(false);
  };
  const onFinish = (values: any) => {
    // setSearchTerm("");
    // setSentiment(selectedSentiment);
    // setSourceId(selectedSource.toString());
    // setCategoryId(selectedCategory.toString());
    localStorage.setItem("sentiment", selectedSentiment);
    localStorage.setItem("sourceId", selectedSource.toString());
    localStorage.setItem("categoryId", selectedCategory.toString());
    setId(Math.random());
    setVisible(false);
  };

  const onChangeCategory = (value: any) => {
    setSelectedCategory(value);
  };
  const onChangeSentiment = (value: any) => {
    setSelectedSentiment(value);
  };
  const onSourceChange = (value: any) => {
    setSelectedSource(value);
  };

  const { Option } = Select;
  return (
    <>
      <Button size="large" onClick={() => setVisible(true)}>
        Advanced Search
      </Button>

      <Modal
        visible={visible}
        title="Advanced Search"
        width="700px"
        maskClosable={false}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          key={formkey}
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          autoComplete="off"
        >
          {/* <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                <Form.Item>
                  <Button onClick={() => add()} icon={<PlusOutlined />}>
                    Add New Filter
                  </Button>
                </Form.Item>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "first"]}
                      fieldKey={[fieldKey, "first"]}
                      // rules={[
                      //   { required: true, message: "Missing first name" },
                      // ]}
                    >
                      <Select
                        defaultValue="category"
                        style={{ width: 250 }}
                        onChange={(e) => setFirst(e)}
                      >
                        <Option value="category">Category</Option>
                        <Option value="sentimnet">Sentiment</Option>
                        <Option value="source">Source</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "last"]}
                      fieldKey={[fieldKey, "last"]}
                      // rules={[{ required: true, message: "Missing last name" }]}
                    >
                      {console.log("fisrst item value :>> ", first)}
                      <Input placeholder="Last Name" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
              </>
            )}
          </Form.List> */}
          <Form.Item label="Category">
            <TreeSelect
              multiple
              placeholder="Select a Category"
              treeData={category}
              onChange={onChangeCategory}
            />
          </Form.Item>
          <Form.Item label="Sentiment">
            <Select
              onChange={onChangeSentiment}
              placeholder="Select a Sentiment"
            >
              <Select.Option value="Positive">Positive</Select.Option>
              <Select.Option value="Negative">Negative</Select.Option>
              <Select.Option value="Neutral">Neutral</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Source">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Select a Sources"
              onChange={onSourceChange}
            >
              {sources}
            </Select>
          </Form.Item>
          <Row justify="end">
            <Form.Item>
              <Button onClick={handleCancel}>Return</Button>
            </Form.Item>
            <Form.Item style={{ marginLeft: "10px" }}>
              <Button type="primary" htmlType="submit">
                Show Results
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AdvanceSearchModal;
