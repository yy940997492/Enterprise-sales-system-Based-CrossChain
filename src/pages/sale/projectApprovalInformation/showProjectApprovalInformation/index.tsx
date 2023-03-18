//查看立项信息
import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Card } from 'antd';
const { Search } = Input;
import { PageContainer } from '@ant-design/pro-layout';

const BusinessOpportunitiesList = () => {
  const [data, setData] = useState<ProjectApprovalInformation[]>([]); //保存完整的相应数据
  const [searchData, setSearchData] = useState<ProjectApprovalInformation[]>([]); //保存查询的数据
  const [open02, setOpen02] = useState<boolean>(false); //第二个open，控制第二个模态框的显示与隐藏，第二个模态框是用来显示客户全部基础信息的模态框。
  const [basicInfo, setBasicInfo] = useState<ProjectApprovalInformation>({
    projectID: '',
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
    detail: '', //客户信息调查跟进阶段的详细信息
    businessDetail: '', //商机跟进阶段的详细信息
    projectApprovalDetail: '', //立项阶段的详细信息
    transactionMod: false, //交易模式 Ture为招投标，False为非招投标
    submitTime: '', //立项提交时间
  });

  //商机基础消息类型
  type ProjectApprovalInformation = {
    projectID: string; //立项ID
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
    detail: string; //客户信息调查跟进阶段的详细信息
    businessDetail: string; //商机跟进阶段的详细信息
    projectApprovalDetail: string; //立项阶段的详细信息
    transactionMod: boolean; //交易模式 Ture为招投标，False为非招投标
    submitTime: string; //立项提交时间
  };

  const fetchCustomerList = () => {
    const res = {
      data: [
        {
          projectID: '001',
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
          detail: '需要解决内网安全问题',
          businessDetail: '需要内网防火墙', //商机跟进阶段的详细信息
          projectApprovalDetail: '确定需要', //立项阶段的详细信息
          transactionMod: false, //交易模式 Ture为招投标，False为非招投标
          submitTime: '2023/3/18 17:54:12', //立项提交时间
        },
        {
          projectID: '002',
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
          detail: '服务器有被DDOS攻击的问题',
          businessDetail: '需要内网防火墙', //商机跟进阶段的详细信息
          projectApprovalDetail: '确定需要', //立项阶段的详细信息
          transactionMod: true, //交易模式 Ture为招投标，False为非招投标
          submitTime: '2022/3/2 17:54:12', //立项提交时间
        },
        {
          projectID: '003',
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
          detail: '公司有代码安全审计的需求',
          businessDetail: '需要内网防火墙', //商机跟进阶段的详细信息
          projectApprovalDetail: '确定需要', //立项阶段的详细信息
          transactionMod: false, //交易模式 Ture为招投标，False为非招投标
          submitTime: '2003/12/11 17:54:12', //立项提交时间
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

  //点击查看客户全部商机基础信息时，弹出的模态框
  const handleShowAllBasicInfo = (record: ProjectApprovalInformation) => {
    //console.log('rc',record);
    //setBasicInfo(Object.assign({},record));
    //record是读取的CustomerBasicInformation类型全部的数据，即一个客户的全部基础数据
    setBasicInfo(record);
    setOpen02(true);
  };
  //console.log('bi',basicInfo);
  //提交详细跟进信息

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
      title: '立项编号',
      dataIndex: 'projectID',
      key: 'projectID',
    },
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
      title: '交易方式',
      dataIndex: 'transactionMod',
      key: 'transactionMod',
      render: (text: boolean) => (text ? '招投标' : '非招标'),
    },
    {
      title: '立项提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
    },
    {
      title: '此客户全部基础信息',
      key: 'allBasicInfo',
      render: (text: string, record: ProjectApprovalInformation) => (
        <Button type="primary" onClick={() => handleShowAllBasicInfo(record)}>
          查看
        </Button>
      ),
    },
  ];
  // const currentTest = (values: any) => {
  //   console.log(values);
  // }
  return (
    <PageContainer content="尊敬的销售员工，在这里查看立项信息。非招标的由销售部提交合同审批，招投标的由商务部门审核">
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
            title="此客户全部基础信息"
            open={open02}
            onCancel={() => setOpen02(false)}
            onOk={() => setOpen02(false)}
          >
            <Form>
              <Form.Item label="立项编号">
                <Input value={basicInfo.projectID} disabled />
              </Form.Item>
              <Form.Item label="立项提交时间">
                <Input value={basicInfo.submitTime} disabled />
              </Form.Item>
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
              <Form.Item label="详细商机信息">
                <Input value={basicInfo.businessDetail} disabled />
              </Form.Item>
              <Form.Item label="详细立项信息">
                <Input value={basicInfo.projectApprovalDetail} disabled />
              </Form.Item>
              <Form.Item label="接洽人员">
                <Input value={basicInfo.sale} disabled />
              </Form.Item>
              <Form.Item label="状态">
                <Input value={String(basicInfo.transactionMod)} disabled />
              </Form.Item>
            </Form>
          </Modal>
        </>
      </Card>
    </PageContainer>
  );
};

export default BusinessOpportunitiesList;
