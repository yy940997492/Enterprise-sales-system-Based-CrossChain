import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'cuit',
    defaultMessage: 'Powered By\n先进密码技术与系统安全\n' + '四川省重点实验室\n'+ '区块链小组'
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'CUIT',
          title: '成都信息工程大学',
          href: 'https://www.cuit.edu.cn/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/yy940997492/Enterprise-sales-system-Based-CrossChain',
          blankTarget: true,
        },
        {
          key: 'CUIT',
          title: '网络空间安全学院',
          href: 'https://cyber.cuit.edu.cn/index.htm',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
