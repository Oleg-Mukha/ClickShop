import React from "react";
import { Modal } from "antd";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #1890ff;
  color: #fff;
  border: none;
  padding: 10px 20px;

  &:hover {
    background-color: #40a9ff;
    color: #fff;
    border: none;
  }
`;

const OrderModal = ({ visible, onClose }) => {
  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Order Placed Successfully"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <>
          <StyledButton key="ok" onClick={handleOk}>
            OK
          </StyledButton>
        </>,
      ]}
    >
      <h2 className="text-lg">
        Your order has been placed successfully. Thank you for shopping with us!
      </h2>
    </Modal>
  );
};

export default OrderModal;
