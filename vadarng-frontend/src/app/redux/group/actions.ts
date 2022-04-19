import {
  EActionTypes as EMiddlewareActionTypes,
  IPayload as IMiddlewarePayload,
  IAction as IMiddlewareAction
} from "src/app/redux/middleware";
import { IGroupPagingRequest, IGroupRequest, IAddGroupToGroupRequest } from ".";
import { IHostQueryConditions } from "../host";

export enum EActionTypes {
  GET_GROUP_PAGING = "[GROUP]_GET_GROUP_PAGING",
  CREATE_GROUP_SUCCESS = "[GROUP]_CREATE_GROUP_SUCCESS",
  ADD_HOST_TO_GROUP_SUCCESS = "[GROUP]_ADD_HOST_TO_GROUP_SUCCESS",
  UPDATE_GROUP_SUCCESS = "[GROUP]_UPDATE_GROUP_SUCCESS",
  DELETE_GROUP_SUCCESS = "[GROUP]_DELETE_GROUP_SUCCESS",
  DELETE_GROUP_BY_LIST_ID_SUCCESS = "[GROUP]_DELETE_GROUP_BY_LIST_ID_SUCCESS",
  GET_GROUP_DETAIL = "[GROUP]_GET_GROUP_DETAIL"
}

export class Get implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IGroupPagingRequest,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/group",
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_GROUP_PAGING,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Detail implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IHostQueryConditions,
    next?: (res) => void,
    nextError?: () => void
  ) {
    this.payload = {
      url: `/host`, // todo
      method: "GET",
      params: payload,
      successType: EActionTypes.GET_GROUP_DETAIL,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Create implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IGroupRequest,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/group`,
      method: "POST",
      data: payload,
      successType: EActionTypes.CREATE_GROUP_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Update implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: IGroupRequest,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/group`,
      method: "PUT",
      data: payload,
      successType: EActionTypes.UPDATE_GROUP_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class Delete implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { groupId: string },
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/group/${payload.groupId}`,
      method: "DELETE",
      successType: EActionTypes.DELETE_GROUP_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class DeleteByListId implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: { groupIds: string[] },
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: "/group/DeleteGroupByIds",
      method: "POST",
      data: payload.groupIds,
      successType: EActionTypes.DELETE_GROUP_BY_LIST_ID_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}

export class DeleteGroup implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: any,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/HostGroupManage/RemoveHostFromGroup`,
      method: "POST",
      data: payload,
      successType: EActionTypes.DELETE_GROUP_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}
export class AddHostToGrroup implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: any,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/HostGroupManage/AddHostToGroupById`,
      method: "POST",
      data: payload,
      successType: EActionTypes.ADD_HOST_TO_GROUP_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}
export class CheckHostAlreadyExistsInGroup implements IMiddlewareAction {
  public readonly type = EMiddlewareActionTypes.CALL_API;
  readonly payload: IMiddlewarePayload;

  constructor(
    payload?: any,
    next?: (res?: any) => void,
    nextError?: (error?: any) => void
  ) {
    this.payload = {
      url: `/HostGroupManage/CheckHostAlreadyExistsInGroup`,
      method: "POST",
      data: payload,
      successType: EActionTypes.ADD_HOST_TO_GROUP_SUCCESS,
      afterSuccess: next,
      afterError: nextError
    };
  }
}
