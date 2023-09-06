/*
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

package com.crapi.controller;

import com.crapi.constant.UserMessage;
import com.crapi.model.CRAPIResponse;
import com.crapi.model.CarPart;
import com.crapi.service.XMLParseService;
import com.nimbusds.jose.util.JSONObjectUtils;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.xml.parsers.ParserConfigurationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.xml.sax.SAXException;

@CrossOrigin
@RestController
@RequestMapping("/identity/api/v2")
public class IdentityController {

  @Autowired private XMLParseService xmlParseService;

  /**
   * Handles XML post requests.
   *
   * @param request the HTTP request
   * @return the response entity
   */
  @PostMapping("/identity/xml-posts")
  public ResponseEntity<?> postXML(@Valid HttpServletRequest request) {
    try {
      String requestContent =
          request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
      Map<String, Object> requestObjectMap = JSONObjectUtils.parse(requestContent);
      String xmlContent = String.valueOf(requestObjectMap.get("content"));
      List<CarPart> carPartList = xmlParseService.parseXml(xmlContent);

      if (carPartList != null) {
        return ResponseEntity.status(HttpStatus.OK).body(carPartList);
      }
    } catch (IOException | ParserConfigurationException | SAXException | ParseException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new CRAPIResponse(UserMessage.COULD_NOT_PROCESS_XML, 500));
    }
    return ResponseEntity.status(HttpStatus.OK).body(new CRAPIResponse("Okay", 200));
  }
}
