import React from 'react';
import { Modal } from 'antd';
const ModalWrapper = ({children, open, handleOk, title, handleCancel}) => {
  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {
            children    
        }
      </Modal>
    </>
  );
};
export default ModalWrapper;