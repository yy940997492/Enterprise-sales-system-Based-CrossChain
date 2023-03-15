import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Radio, message, Card } from 'antd';
import { fakeSubmitDetialForm } from './service';
import { PageContainer } from '@ant-design/pro-layout';

const CustomerList = () => {
  const [data, setData] = useState<CustomerBasicInformation[]>([]);
  const [open, setOpen] = useState<boolean>(false); //第一个open，控制第一个模态框的显示与隐藏，第一个模态框是用了显示填写详细信息的模态框。
  const [open02, setOpen02] = useState<boolean>(false); //第二个open，控制第二个模态框的显示与隐藏，第二个模态框是用来显示客户全部基础信息的模态框。
  const [detailForm] = Form.useForm();
  const [basicInfo, setBasicInfo] = useState<CustomerBasicInformation>({
    customerID: '',
    address: '',
    birthdate: '',
    company: '',
    dateTime: '',
    description: '',
    mail: '',
    name: '',
    phone: '',
    sale: '',
    sex: '',
    status: false,
    weight: 0,
  });

  //客户基础消息类型
  type CustomerBasicInformation = {
    customerID: string;
    name: string;
    sex: string;
    dateTime: string; //接洽日期
    birthdate: string;
    address: string; //客户住址
    company: string; //客户单位
    phone: string;
    mail: string;
    description: string; //简要描述
    sale: string; //接洽人员
    weight: number; //权重
    status: boolean; //状态分为两类：true为已经跟进填写了跟进信息，false为未跟进
  };
  //客户跟进信息类型
  type CustomerFlowUpInformation = {
    dealIntention: boolean; //意向
    detail: string; //详细信息
  };
  const fetchCustomerList = () => {
    const res = {
      data: [
        {
          customerID: '1',
          name: '韩立',
          sex: '男',
          dateTime: '2021-01-01',
          birthdate: '1990-01-01',
          address: '北京市海淀区',
          company: '北京大学',
          phone: '123',
          mail: '520@qq.com',
          description: '这是一个好人',
          sale: '张三',
          weight: 60,
          status: false,
        },
        {
          customerID: '2',
          name: '南宫婉',
          sex: '女',
          dateTime: '2001-01-01',
          birthdate: '1990-11-11',
          address: '四川省旺苍县',
          company: '成都信息工程大学',
          phone: '456',
          mail: '123@qq.com',
          description: '这是一个美女',
          sale: '李四',
          weight: 50,
          status: false,
        },
      ],
    };
    setData(res.data);
  };

  //页面刷新时获取客户基础信息列表
  useEffect(() => {
    fetchCustomerList();
  }, []);

  //填写跟进信息，弹出模态框
  const handleEnterDetailModal = (record: CustomerBasicInformation) => {
    //console.log(record);
    setBasicInfo(record);
    setOpen(true);
  };

  //点击查看客户全部基础信息时，弹出的模态框
  const handleShowAllBasicInfo = (record: CustomerBasicInformation) => {
    //console.log('rc',record);
    //setBasicInfo(Object.assign({},record));
    setBasicInfo(record);
    setOpen02(true);
  };
  //console.log('bi',basicInfo);
  //提交详细跟进信息
  const handleDetailFormSubmit = async (values: CustomerFlowUpInformation) => {
    const detail: CustomerFlowUpInformation & CustomerBasicInformation = {
      ...basicInfo,
      ...values,
    };
    //提交详细信息，将status状态变为true
    detail.status = true;
    console.log(detail);
    fakeSubmitDetialForm(detail).then((res) => {
      if (res.data.message === 'Ok') {
        message.success('提交成功');
      } else {
        message.error('提交失败');
      }
    });
    setOpen(false);
  };

  const columns = [
    {
      title: '客户编号',
      dataIndex: 'customerID',
      key: 'customerID',
    },
    {
      title: '客户姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '权重',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: boolean) => (text ? '已跟进' : '未跟进'),
    },
    {
      title: '此客户全部基础信息',
      key: 'allBasicInfo',
      render: (text: string, record: CustomerBasicInformation) => (
        <Button type="primary" onClick={() => handleShowAllBasicInfo(record)}>
          查看
        </Button>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (
        text: string,
        record: CustomerBasicInformation, //record是读取的CustomerBasicInformation类型全部的数据，即一个客户的全部基础数据。
      ) => (
        <Button type="primary" onClick={() => handleEnterDetailModal(record)}>
          填写详细信息
        </Button>
      ),
    },
  ];
  // const currentTest = (values: any) => {
  //   console.log(values);
  // }
  return (
    <PageContainer content="尊敬的销售员工，请认真填写跟进客户信息，方便后续与客户达成合作。">
      <Card bordered={false}>
        <>
          <Table columns={columns} dataSource={data} />

          <Modal
            title="填写详细信息"
            open={open}
            onCancel={() => setOpen(false)}
            onOk={detailForm.submit}
          >
            <Form form={detailForm} onFinish={handleDetailFormSubmit}>
              <Form.Item label="客户编号" valuePropName="id">
                <Input value={basicInfo.customerID} disabled />
              </Form.Item>
              <Form.Item label="客户姓名">
                <Input value={basicInfo.name} disabled />
              </Form.Item>
              <Form.Item label="联系方式">
                <Input value={basicInfo.phone} disabled />
              </Form.Item>
              <Form.Item label="地址">
                <Input value={basicInfo.address} disabled />
              </Form.Item>
              <Form.Item label="简要描述">
                <Input value={basicInfo.description} disabled />
              </Form.Item>
              <Form.Item
                label="有无成交意愿"
                name="dealIntention"
                rules={[
                  {
                    required: true,
                    message: '请选择是否有成交意向',
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value={true}>有成交意向</Radio.Button>
                  <Radio.Button value={false}>无成交意向</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="详细描述客户需求" name="detail">
                <Input.TextArea />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="此客户全部基础信息"
            open={open02}
            onCancel={() => setOpen02(false)}
            onOk={() => setOpen02(false)}
          >
            <Form>
              <Form.Item label="客户编号">
                <Input value={basicInfo.customerID} disabled />
              </Form.Item>
              <Form.Item label="客户姓名">
                <Input value={basicInfo.name} disabled />
              </Form.Item>
              <Form.Item label="性别">
                <Input value={basicInfo.sex} disabled />
              </Form.Item>
              <Form.Item label="接洽时间">
                <Input value={basicInfo.dateTime} disabled />
              </Form.Item>
              <Form.Item label="生日">
                <Input value={basicInfo.birthdate} disabled />
              </Form.Item>
              <Form.Item label="地址">
                <Input value={basicInfo.address} disabled />
              </Form.Item>
              <Form.Item label="公司">
                <Input value={basicInfo.company} disabled />
              </Form.Item>
              <Form.Item label="电话">
                <Input value={basicInfo.phone} disabled />
              </Form.Item>
              <Form.Item label="邮箱">
                <Input value={basicInfo.mail} disabled />
              </Form.Item>
              <Form.Item label="简要描述">
                <Input value={basicInfo.description} disabled />
              </Form.Item>
              <Form.Item label="接洽人员">
                <Input value={basicInfo.sale} disabled />
              </Form.Item>
              <Form.Item label="权重">
                <Input value={basicInfo.weight} disabled />
              </Form.Item>
              <Form.Item label="状态">
                <Input value={String(basicInfo.status)} disabled />
              </Form.Item>
            </Form>
          </Modal>
        </>
      </Card>
    </PageContainer>
  );
};

export default CustomerList;
