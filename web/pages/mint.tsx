export default function Mint() {
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    // <PageContainer>
    //   <>
    //     <Form
    //       name="Mint"
    //       layout="vertical"
    //       labelCol={{ span: 4 }}
    //       wrapperCol={{ span: 14 }}
    //     >
    //       <Form.Item
    //         label="Title"
    //         name="title"
    //         rules={[
    //           { required: true, message: "Please give a title to your track" },
    //         ]}
    //       >
    //         <Input />
    //       </Form.Item>

    //       <Form.Item>
    //         <Form.Item
    //           label="Track"
    //           style={{ display: "inline-block", width: "calc(50%)" }}
    //           rules={[
    //             { required: true, message: "Please upload the track file" },
    //           ]}
    //         >
    //           <Form.Item
    //             name="track"
    //             valuePropName="file"
    //             getValueFromEvent={normFile}
    //             noStyle
    //           >
    //             <Upload.Dragger name="files" action="/upload.do">
    //               <p className="ant-upload-drag-icon">
    //                 <SoundOutlined />
    //               </p>
    //               <p className="ant-upload-text">
    //                 Click or drag file to this area to upload
    //               </p>
    //               <p className="ant-upload-hint">
    //                 Support for a single or bulk upload.
    //               </p>
    //             </Upload.Dragger>
    //           </Form.Item>
    //         </Form.Item>
    //         <Form.Item
    //           label="Cover"
    //           style={{ display: "inline-block", width: "calc(50%)" }}
    //         >
    //           <Form.Item
    //             name="cover"
    //             valuePropName="file"
    //             getValueFromEvent={normFile}
    //             noStyle
    //           >
    //             <Upload.Dragger name="files" action="/upload.do">
    //               <p className="ant-upload-drag-icon">
    //                 <PictureOutlined />
    //               </p>
    //               <p className="ant-upload-text">
    //                 Click or drag file to this area to upload
    //               </p>
    //               <p className="ant-upload-hint">
    //                 Support for a single or bulk upload.
    //               </p>
    //             </Upload.Dragger>
    //           </Form.Item>
    //         </Form.Item>
    //       </Form.Item>

    //       <Form.Item name="description" label="Description">
    //         <Input.TextArea showCount maxLength={100} />
    //       </Form.Item>
    //       <Form.Item
    //         name="initialSupply"
    //         label="Initial Supply"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please provide an initial supply for this track",
    //           },
    //         ]}
    //       >
    //         <InputNumber style={{ width: "100%" }} min={1} max={10000} />
    //       </Form.Item>
    //     </Form>
    //   </>
    // </PageContainer>
    <></>
  );
}
