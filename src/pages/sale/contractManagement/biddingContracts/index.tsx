//提交审核结果
import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Radio, message, Card } from 'antd';
const { Search } = Input;
import { fakeSubmitDetailForm } from './service';
import { PageContainer } from '@ant-design/pro-layout';
import {
  ProjectApprovalBasicInformation,
  projectApprovalFlowUpInformation,
} from '../../businessOpportunitiesInformation/submitProjectApprovalInformation/index';

//非招标立项合同基础信息
type NonBiddingContractsInformation = ProjectApprovalBasicInformation &
  projectApprovalFlowUpInformation & { projectID: string };
//存入数据库的确认立项信息，有一个自增的projectID，因此要多一个此属性。

//审核之后非招标立项信息新增类型
type ReviewNonBiddingContractsInformation = {
  reviewResult: boolean; //审核结果,true为通过，false为不通过
  reviewRemarks: string; //审核备注
  reviewTime: string; //审核时间
  contractsID: string; //合同ID,上传合同后，由后台与数据量生成唯一的合同ID
};

const ProjectApproval = () => {
  const [data, setData] = useState<NonBiddingContractsInformation[]>([]); //保存完整的相应数据
  const [searchData, setSearchData] = useState<NonBiddingContractsInformation[]>([]); //保存查询的数据
  const [open, setOpen] = useState<boolean>(false); //第一个open，控制第一个模态框的显示与隐藏，第一个模态框是用了显示填写详细信息的模态框。
  const [open02, setOpen02] = useState<boolean>(false); //第二个open，控制第二个模态框的显示与隐藏，第二个模态框是用来显示客户全部基础信息的模态框。
  const [detailForm] = Form.useForm();
  const [basicInfo, setBasicInfo] = useState<NonBiddingContractsInformation>({
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
    status: false, //这个是基础信息跟进状态分为两类：true为已经跟进填写了跟进信息，false为未跟进
    dealIntention: false, //意向度分为两类：true为有意向，false为无意向
    businessOpportunityStatus: false,
    weight: 0,
    detail: '', //客户信息调查跟进阶段的详细信息
    effectiveBusinessOpportunity: false, //有效商机
    businessDetail: '', //详细商机信息。如：客户需求，客户预算，客户购买意愿等
    projectApprovalStatus: false, //商机跟进之后，就会进入项目立项阶段，此为项目立项状态
    projectApprovalDetail: '', //立项阶段的详细信息
    submitTime: '', //提交时间
    transactionMode: false, //交易方式,ture为招投标，false为非招投标
    reviewStatus: false,
  });

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
          weight: 60,
          status: true,
          dealIntention: true,
          businessOpportunityStatus: false,
          detail: '需要解决内网安全问题',
          effectiveBusinessOpportunity: true,
          businessDetail: '需要安全工程师驻厂进行代码审计',
          projectApprovalStatus: false,
          projectApprovalDetail: '确定需要',
          submitTime: '2021/3/2 17:54:12',
          transactionMode: true,
          reviewStatus: false,
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
          weight: 50,
          status: true,
          dealIntention: true,
          businessOpportunityStatus: false,
          detail: '服务器有被DDOS攻击的问题',
          effectiveBusinessOpportunity: true,
          businessDetail: '需要安全工程师驻厂进行代码审计',
          projectApprovalStatus: false,
          projectApprovalDetail: '确定需要',
          submitTime: '2021/3/2 17:54:12',
          transactionMode: true,
          reviewStatus: false,
        },
        {
          projectID: '003',
          customerID: '3',
          name: '周明浩',
          sex: '男',
          dateTime: '1997-01-01',
          birthdate: '1999-12-11',
          address: '乱星海',
          company: '妙音们',
          phone: '520025',
          mail: '9999@qq.com',
          description: '人界第一美女',
          sale: '王五',
          weight: 90,
          status: true,
          dealIntention: true,
          businessOpportunityStatus: false,
          detail: '公司有代码安全审计的需求',
          effectiveBusinessOpportunity: true,
          businessDetail: '需要安全工程师驻厂进行代码审计',
          projectApprovalStatus: false,
          projectApprovalDetail: '确定需要',
          submitTime: '2021/3/2 17:54:12',
          transactionMode: true,
          reviewStatus: false,
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
  const handleEnterDetailModal = (record: NonBiddingContractsInformation) => {
    //console.log(record);
    //record是读取的CustomerBasicInformation类型全部的数据，即一个客户的全部基础数据
    setBasicInfo(record);
    setOpen(true);
  };

  //点击查看客户全部商机基础信息时，弹出的模态框
  const handleShowAllBasicInfo = (record: NonBiddingContractsInformation) => {
    //console.log('rc',record);
    //setBasicInfo(Object.assign({},record));
    //record是读取的CustomerBasicInformation类型全部的数据，即一个客户的全部基础数据
    setBasicInfo(record);
    setOpen02(true);
  };
  //console.log('bi',basicInfo);
  //提交详细跟进信息
  const handleDetailFormSubmit = async (values: ReviewNonBiddingContractsInformation) => {
    const detail: ReviewNonBiddingContractsInformation & NonBiddingContractsInformation = {
      ...basicInfo,
      ...values,
    };
    //添加审核时间
    detail.reviewTime = new Date().toLocaleString();
    detail.reviewStatus = true; //表明已经审核，不管是否通过
    detail.contractsID = '';
    //console.log(detail);
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
      title: '项目编号',
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
      dataIndex: 'transactionMode',
      key: 'transactionMode',
      render: (text: boolean) => (text ? '招投标' : '非招标'),
    },
    {
      title: '立项提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
    },
    {
      title: '立项合同信息',
      key: 'allBasicInfo',
      render: (text: string, record: NonBiddingContractsInformation) => (
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
        record: NonBiddingContractsInformation, //record是读取的CustomerBasicInformation类型全部的数据，即一个客户的全部基础数据。
      ) => (
        <Button type="primary" onClick={() => handleEnterDetailModal(record)}>
          审核立项合同
        </Button>
      ),
    },
  ];
  // const currentTest = (values: any) => {
  //   console.log(values);
  // }
  return (
    <PageContainer content="尊敬的销售员工，在这里查看立项信息（招投标），并且按照公司决议，审核立项合同。">
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
            title="审核立项合同"
            open={open}
            onCancel={() => setOpen(false)}
            onOk={detailForm.submit}
          >
            <Form form={detailForm} onFinish={handleDetailFormSubmit}>
              <Form.Item label="立项编号">
                <Input value={basicInfo.projectID} disabled />
              </Form.Item>
              <Form.Item label="立项提交时间">
                <Input value={basicInfo.submitTime} disabled />
              </Form.Item>
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
              <Form.Item label="详细立项信息">
                <Input value={basicInfo.projectApprovalDetail} disabled />
              </Form.Item>
              <Form.Item
                label="审核结果"
                name="reviewResult"
                rules={[
                  {
                    required: true,
                    message: '请审核是否通过',
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value={true}>通过</Radio.Button>
                  <Radio.Button value={false}>不通过</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="合同存档" name="">
                <Button>存档</Button>
              </Form.Item>
              <Form.Item label="审核备注。" name="reviewRemarks">
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
              <Form.Item label="接洽人员">
                <Input value={basicInfo.sale} disabled />
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
