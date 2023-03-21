import { request } from 'umi';

export async function fakeSubmitDetailForm(params: any) {
  return request('/api/sale/projectApprovalInformation/showProjectApprovalInformation', {
    method: 'POST',
    data: params,
  });
}
