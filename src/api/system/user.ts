import { defHttp } from '/@/utils/http/axios';
import { UserParams, UserListItemGetResultModel } from './model/userModel';

enum Api {
  USER_LIST = '/system/userList',
}

/**
 * @description: Get sample list value
 */

export const userListApi = (params: UserParams) =>
  defHttp.get<UserListItemGetResultModel>({
    url: Api.USER_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
