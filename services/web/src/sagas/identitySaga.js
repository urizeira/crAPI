/*
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { put, takeLatest } from "redux-saga/effects";
import { APIService, requestURLS } from "../constants/APIConstant";
import actionTypes from "../constants/actionTypes";
import responseTypes from "../constants/responseTypes";
import {
  XML_POST_NOT_CREATED,XML_POST_CREATED
} from "../constants/messages";


export function* addXMLPost(param) {
  let recievedResponse = {};
  const { accessToken, callback, post } = param;
  try {
    yield put({ type: actionTypes.FETCHING_DATA });
    
    const postUrl = APIService.JAVA_MICRO_SERVICES + requestURLS.ADD_NEW_XML_POST;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    yield fetch(postUrl, {
      headers,
      method: "POST",
      body: JSON.stringify(post),
    }).then((response) => {
      recievedResponse = response;
      return response.json();
    });

    yield put({ type: actionTypes.FETCHED_DATA, payload: recievedResponse });
    if (recievedResponse.ok) {
      callback(responseTypes.SUCCESS, XML_POST_CREATED);
    } else {
      callback(responseTypes.FAILURE, XML_POST_NOT_CREATED);
    }
  } catch (e) {
    yield put({ type: actionTypes.FETCHED_DATA, payload: recievedResponse });
    callback(responseTypes.FAILURE, XML_POST_NOT_CREATED);
  }
}

export function* identityActionWatcher() {
  yield takeLatest(actionTypes.XML_POST_ACTION, addXMLPost);
  
}
