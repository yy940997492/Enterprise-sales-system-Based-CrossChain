//提交立项信息
import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Radio, message, Card } from 'antd';
const { Search } = Input;
import { fakeSubmitDetailForm } from './service';
import { PageContainer } from '@ant-design/pro-layout';

const ProjectApproval = () => {
  const [data, setData] = useState<ProjectApprovalBasicInformation[]>([]); //保存完整的相应数据
  const [searchData, setSearchData] = useState<ProjectApprovalBasicInformation[]>([]); //保存查询的数据
  const [open, setOpen] = useState<boolean>(false); //第一个open，控制第一个模态框的显示与隐藏，第一个模态框是用了显示填写详细信息的模态框。
  const [open02, setOpen02] = useState<boolean>(false); //第二个open，控制第二个模态框的显示与隐藏，第二个模态框是用来显示客户全部基础信息的模态框。
  const [detailForm] = Form.useForm();
  const [basicInfo, setBasicInfo] = useState<ProjectApprovalBasicInformation>({
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
    projectApprovalStatus: false,
    weight: 0,
    detail: '', //客户信息调查跟进阶段的详细信息
    businessDetail: '', //商机跟进阶段的详细信息
  });

  //立项基础消息类型
  type ProjectApprovalBasicInformation = {
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
    projectApprovalStatus: boolean; //状态分为两类：true为已经提交了立项信息，false为还没有提交立项信息
    detail: string; //客户信息调查跟进阶段的详细信息
    businessDetail: string; //商机跟进阶段的详细信息
  };

  //提交立项信息类型
  type projectApprovalFlowUpInformation = {
    projectApprovalDetail: string; //立项阶段的详细信息
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
          projectApprovalStatus: false,
          detail: '需要解决内网安全问题',
          businessDetail: '拟采购内网防火墙设备',
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
          projectApprovalStatus: false,
          detail: '服务器有被DDOS攻击的问题',
          businessDetail: '拟采购防火墙设备，为了防止DDOS攻击',
        },
        {
          customerID: '3',
          name: '紫灵',
          sex: '女',
          dateTime: '1997-01-01',
          birthdate: '1999-12-11',
          address: '乱星海',
          company: '妙音们',
          phone: '520025',
          mail: '9999@qq.com',
          description: '人界第一美女',
          sale: '王五',
          weight: 90,
          projectApprovalStatus: false,
          detail: '公司有代码安全审计的需求',
          businessDetail: '需要安全工程师驻厂进行代码审计',
        },
      ],
    };
    setData(res.data);
    setSearchData(res.data);
  };

  //页面刷新时获取商机基础信息列表
  useEffect(() => {
    fetchCustomerList();
  }, []);

  //填写跟进信息，弹出模态框
  const handleEnterDetailModal = (record: ProjectApprovalBasicInformation) => {
    //console.log(record);
    //record是读取的CustomerBasicInformation类型全部的数据，即一个客户的全部基础数据
    setBasicInfo(record);
    setOpen(true);
  };

  //点击查看客户全部商机基础信息时，弹出的模态框
  const handleShowAllBasicInfo = (record: ProjectApprovalBasicInformation) => {
    //console.log('rc',record);
    //setBasicInfo(Object.assign({},record));
    //record是读取的CustomerBasicInformation类型全部的数据，即一个客户的全部基础数据
    setBasicInfo(record);
    setOpen02(true);
  };
  //console.log('bi',basicInfo);
  //提交详细跟进信息
  const handleDetailFormSubmit = async (values: projectApprovalFlowUpInformation) => {
    const detail: projectApprovalFlowUpInformation & ProjectApprovalBasicInformation = {
      ...basicInfo,
      ...values,
    };
    //提交详细信息，将status状态变为true
    detail.projectApprovalStatus = true;
    console.log(detail);
    fakeSubmitDetailForm(detail).then((res) => {
      if (res.data.message === 'Ok') {
        message.success('提交成功');
      } else {
        message.error('提交失败');
      }
    });
    setOpen(false);
  };

  //搜索框查询时，返回相应的查询条目
  const onChangeHandler = (event: any) => {
    const currentSearchData = data.filter((item) => item.name.includes(event.target.value));
    //console.log(event);
    setSearchData(currentSearchData);
  };

  const onChangeHandler02 = (value: string) => {
    const currentSearchData = data.filter((item) => item.name.includes(value));
    //console.log(value);
    setSearchData(currentSearchData);
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
      dataIndex: 'projectApprovalStatus',
      key: 'projectApprovalStatus',
      render: (text: boolean) => (text ? '已经提交立项' : '未提交立项'),
    },
    {
      title: '商机信息',
      key: 'allBasicInfo',
      render: (text: string, record: ProjectApprovalBasicInformation) => (
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
        record: ProjectApprovalBasicInformation, //record是读取的CustomerBasicInformation类型全部的数据，即一个客户的全部基础数据。
      ) => (
        <Button type="primary" onClick={() => handleEnterDetailModal(record)}>
          提交立项信息
        </Button>
      ),
    },
  ];
  // const currentTest = (values: any) => {
  //   console.log(values);
  // }
  return (
    <PageContainer content="尊敬的销售员工，在这里查看有效商机信息，并且提交立项信息。">
      <Card bordered={false}>
        {/*<input type="search" onChange={onChangeHandler}/>*/}
        <Search
          placeholder="亦可以根据姓名进行快速检索"
          enterButton="根据姓名快速检索！"
          size="large"
          // suffix={suffix}
          onChange={onChangeHandler}
          onSearch={onChangeHandler02}
        />
        <>
          <Table columns={columns} dataSource={searchData} />

          <Modal
            title="填写立项信息"
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
              <Form.Item label="详细信息">
                <Input value={basicInfo.detail} disabled />
              </Form.Item>
              <Form.Item label="详细商机信息">
                <Input value={basicInfo.businessDetail} disabled />
              </Form.Item>
              <Form.Item
                label="选择拟交易方式"
                name="transactionMode"
                rules={[
                  {
                    required: true,
                    message: '请选择交易方式',
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value={true}>招投标</Radio.Button>
                  <Radio.Button value={false}>非招标</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="立项信息。" name="projectApprovalDetail">
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
              <Form.Item label="详细信息">
                <Input value={basicInfo.detail} disabled />
              </Form.Item>
              <Form.Item label="接洽人员">
                <Input value={basicInfo.sale} disabled />
              </Form.Item>
              <Form.Item label="权重">
                <Input value={basicInfo.weight} disabled />
              </Form.Item>
              <Form.Item label="详细商机信息">
                <Input value={basicInfo.businessDetail} disabled />
              </Form.Item>
            </Form>
          </Modal>
        </>
      </Card>
    </PageContainer>
  );
};

export default ProjectApproval;
