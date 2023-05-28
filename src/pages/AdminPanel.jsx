import React, { useState } from "react";
import { Form, Input, Button, Select, Table, Tag, Space } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Dragger } = Upload;

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <>
          {category.map((cat) => (
            <Tag color="blue" key={cat}>
              {cat.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const addProduct = (values) => {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    } = values;

    axios
      .post("https://dummyjson.com/products/add", {
        title,
        description,
        price: Number(price),
        discountPercentage: Number(discountPercentage),
        rating: Number(rating),
        stock: Number(stock),
        brand,
        category: [category],
        thumbnail,
        images: images.split(","),
      })
      .then((res) => {
        console.log("Product Added:", res.data);
        setProducts([...products, res.data]);
        form.resetFields();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const uploadPreviewImage = (file) => {
    console.log(file);
  };

  return (
    <div className="px-5">
      <h1 className="text-center py-2">Admin Panel</h1>

      <div className="product-form-list">
        <div className="product-form">
          <h2>Add a New Product</h2>

          <Form
            form={form}
            onFinish={addProduct}
            layout="vertical"
            initialValues={{ category: "smartphones" }}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Discount Percentage" name="discountPercentage">
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: "Please input the rating!" }]}
            >
              <Select>
                <Select.Option value="1">⭐(1)</Select.Option>
                <Select.Option value="2">⭐⭐(2)</Select.Option>
                <Select.Option value="3">⭐⭐⭐(3)</Select.Option>
                <Select.Option value="4">⭐⭐⭐⭐(4)</Select.Option>
                <Select.Option value="5">⭐⭐⭐⭐⭐(5)</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Stock"
              name="stock"
              rules={[{ required: true, message: "Please input the stock!" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please input the brand!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select>
                <Select.Option value="">Select Category</Select.Option>
                <Select.Option value="smartphones">Smartphones</Select.Option>
                <Select.Option value="laptops">Laptops</Select.Option>
                <Select.Option value="fragrances">Fragrances</Select.Option>
                <Select.Option value="skincare">Skincare</Select.Option>
                <Select.Option value="groceries">Groceries</Select.Option>
                <Select.Option value="home-decoration">
                  Home decoration
                </Select.Option>
                <Select.Option value="furniture">Furniture</Select.Option>
                <Select.Option value="tops">Tops</Select.Option>
                <Select.Option value="womens-dresses">
                  Womens dresses
                </Select.Option>
                <Select.Option value="womens-shoes">Womens shoes</Select.Option>
                <Select.Option value="mens-shirts">Mens shirts</Select.Option>
                <Select.Option value="mens-shoes">Mens shoes</Select.Option>
                <Select.Option value="mens-watches">Mens watches</Select.Option>
                <Select.Option value="womens-watches">
                  Womens watches
                </Select.Option>
                <Select.Option value="womens-bags">Womens bags</Select.Option>
                <Select.Option value="home-decoration">
                  Home Decoration
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Preview Image"
              name="previewImage"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Dragger
                name="previewImage"
                action="/upload.do"
                beforeUpload={uploadPreviewImage}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Dragger>
            </Form.Item>

            <Form.Item
              label="Images"
              name="images"
              rules={[
                { required: true, message: "Please input the image URLs!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="add-product-btn text-black flex align-center justify-center border border-gray-400"
              >
                Add Product <PlusOutlined />
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="product-list">
          <h2>Product List</h2>

          <Table columns={columns} dataSource={products} />

          <ProductUl>
            <TransitionGroup>
              {products.map((product) => (
                <CSSTransition
                  key={product._id}
                  timeout={500}
                  classNames="item"
                >
                  <ProductLi className="item">
                    <img
                      src={product.images[0]}
                      className="w-40 h-40"
                      alt={product.title}
                    />
                    <ProductInfo>
                      <h3>Title: {product.title}</h3>
                      <p>Description: {product.description}</p>
                      <p>Price: {product.price}$</p>
                    </ProductInfo>
                  </ProductLi>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ProductUl>
        </div>
      </div>
    </div>
  );
};

const ProductUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;

  & .item-enter {
    opacity: 0;
    transform: translateY(50%);
  }

  & .item-enter-active {
    opacity: 1;
    transform: translateY(0%);
    transition: all 0.5s ease-in-out;
  }

  & .item-exit {
    opacity: 1;
    transform: translateY(0%);
  }

  & .item-exit-active {
    opacity: 0;
    transform: translateY(50%);
    transition: all 0.5s ease-in-out;
  }
`;

const ProductLi = styled.li`
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const ProductInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 1rem;
`;

export default AdminPanel;
