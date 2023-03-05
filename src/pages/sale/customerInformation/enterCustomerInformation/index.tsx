//销售方法：录入客户信息。
import { Card, message } from 'antd';
import ProForm, {
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormDateTimePicker,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';

const BasicForm: FC<Record<string, any>> = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    run(values);
  };

  return (
    <PageContainer content="尊敬的销售员工，请从销售、电销、公司渠道认真录入客户档案信息，以便后续开展销售工作。">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark={false}
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          layout="vertical"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入客户姓名',
              },
            ]}
            placeholder="输入客户姓名"
          />
          <ProFormRadio.Group
            name="sex"
            label="性别"
            radioType="button"
            rules={[
              {
                required: true,
                message: '请选择客户的性别',
              },
            ]}
            options={[
              {
                label: '女',
                value: 'women',
              },
              {
                label: '男',
                value: 'man',
              },
              {
                label: '其他性别',
                value: 'other',
              },
            ]}
          />
          {/*<ProFormDateRangePicker*/}
          {/*  label="起止日期"*/}
          {/*  width="md"*/}
          {/*  name="date"*/}
          {/*  rules={[*/}
          {/*    {*/}
          {/*      required: true,*/}
          {/*      message: '请选择起止日期',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*  placeholder={['开始日期', '结束日期']}*/}
          {/*/>*/}
          <ProFormDateTimePicker
            name="dateTime"
            label="接洽日期"
            width="md"
            rules={[
              {
                required: true,
                message: '请选择日期',
              },
            ]}
            fieldProps={{
              format: (value) => value.format('YYYY-MM-DD'),
            }}
            placeholder={'请输入最后一次与客户接洽的时间日期'}
          />
          <ProFormDatePicker
            name="birthday"
            label="生日"
            width="md"
            fieldProps={{
              format: (value) => value.format('YYYY-MM-DD'),
            }}
            placeholder={'客户的生日'}
          />
          <ProFormText width="md" name="address" label="住址" placeholder={'客户住址'} />
          <ProFormText width="md" name="company" label="公司" placeholder={'客户所在公司'} />
          <ProFormDigit
            width="md"
            name="phone"
            label="电话"
            rules={[
              {
                required: true,
                message: '请输入电话联系方式',
              },
            ]}
            placeholder={'电话号码'}
          />
          <ProFormText
            width="md"
            name="mail"
            label="邮箱"
            rules={[
              {
                required: true,
                message: '请输入邮箱',
              },
            ]}
            placeholder={'邮箱'}
          />
          <ProFormTextArea
            label="简要描述"
            width="xl"
            name="description"
            rules={[
              {
                required: true,
                message: '请输入简要描述',
              },
            ]}
            placeholder="请简要描述客户的需求等相关情况。"
          />

          <ProFormText
            width="md"
            label={
              <span>
                接洽人员
                <em className={styles.optional}>（选填）</em>
              </span>
            }
            name="sale"
            placeholder="输入接洽此客户的员工工号号"
          />
          <ProFormDigit
            label={
              <span>
                权重
                <em className={styles.optional}>（选填）</em>
              </span>
            }
            name="weight"
            placeholder="请输入"
            min={0}
            max={100}
            width="xs"
            fieldProps={{
              formatter: (value) => `${value || 0}%`,
              parser: (value) => (value ? value.replace('%', '') : '0'),
            }}
          />

          {/*<ProFormRadio.Group*/}
          {/*  options={[*/}
          {/*    {*/}
          {/*      value: '1',*/}
          {/*      label: '公开',*/}
          {/*    },*/}
          {/*    {*/}
          {/*      value: '2',*/}
          {/*      label: '部分公开',*/}
          {/*    },*/}
          {/*    {*/}
          {/*      value: '3',*/}
          {/*      label: '不公开',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*  label="目标公开"*/}
          {/*  help="客户、邀评人默认被分享"*/}
          {/*  name="publicType"*/}
          {/*/>*/}
          {/*<ProFormDependency name={['publicType']}>*/}
          {/*  {({ publicType }) => {*/}
          {/*    return (*/}
          {/*      <ProFormSelect*/}
          {/*        width="md"*/}
          {/*        name="publicUsers"*/}
          {/*        fieldProps={{*/}
          {/*          style: {*/}
          {/*            margin: '8px 0',*/}
          {/*            display: publicType && publicType === '2' ? 'block' : 'none',*/}
          {/*          },*/}
          {/*        }}*/}
          {/*        options={[*/}
          {/*          {*/}
          {/*            value: '1',*/}
          {/*            label: '同事甲',*/}
          {/*          },*/}
          {/*          {*/}
          {/*            value: '2',*/}
          {/*            label: '同事乙',*/}
          {/*          },*/}
          {/*          {*/}
          {/*            value: '3',*/}
          {/*            label: '同事丙',*/}
          {/*          },*/}
          {/*        ]}*/}
          {/*      />*/}
          {/*    );*/}
          {/*  }}*/}
          {/*</ProFormDependency>*/}
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default BasicForm;
