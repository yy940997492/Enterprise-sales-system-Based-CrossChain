import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  "navTheme": "realDark",
  "primaryColor": "#1890ff",
  "layout": "top",
  "contentWidth": "Fluid",
  "fixedHeader": false,
  "fixSiderbar": true,
  "pwa": false,
  logo: "https://www.cuit.edu.cn/__local/A/56/12/9D2095DBAF74A06EED40AAAF0E2_44C6156F_138E0.png?e=.png",
  "headerHeight": 48,
  "splitMenus": false,
  title:'销售管理系统(基于区块链跨链技术)',
}

export default Settings;
