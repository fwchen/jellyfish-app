import Actions from '../action/actions';
import axios from 'axios';
import { setupAxiosJwtHeader } from '../helper/http-intercetor';
import { API_BASE } from '../env/env';
import NavigationService from '../service/single/navigation.service';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/ignoreElements';

import { mergeMap } from 'rxjs/operators';
import { GET_USER_INFO_REQUEST, getUserInfoSuccess, getUserInfoFailure } from '../action/user';
import { ofType } from 'redux-observable';
import { UserInfo } from '../typing/user';

export const SIGNIN = (action$: any) => {
  return action$.ofType('SIGNIN').pipe(
    mergeMap((action: any) => {
      return axios
        .post(`${API_BASE}/signin`, action.payload)
        .then(response => {
          setupAxiosJwtHeader(response.data.token);
          return Actions.SIGNIN.success(response.data);
        })
        .catch(error => {
          return Actions.SIGNIN.failure(error);
        });
    })
  );
};

export const SIGNIN_SUCCESS = (action$: any) =>
  action$
    .ofType(Actions.SIGNIN.SUCCESS)
    .do(() => {
      NavigationService.navigate('Main');
    })
    .ignoreElements();

export const SIGNIN_FAILURE = (action$: any) =>
  action$
    .ofType(Actions.SIGNIN.FAILURE)
    .do(() => {
      // Toast.fail('\n登录失败，请重试');
    })
    .ignoreElements();

export const GET_USER_INFO = (action$: any) => {
  return action$.pipe(
    ofType(GET_USER_INFO_REQUEST),
    mergeMap((action: any) => {
      return axios
        .get<UserInfo>(`${API_BASE}/user/${action.payload.userId}`)
        .then((resp) => {
          return getUserInfoSuccess(resp.data);
        })
        .catch((error) => {
          return getUserInfoFailure(error);
        });
    })
  );
};

export const REHYDRATE = (action$: any) => {
  return action$
    .ofType('persist/REHYDRATE')
    .do((action: any) => {
      if (action.payload) {
        setupAxiosJwtHeader(action.payload.auth.token);
      }
    })
    .ignoreElements();
};