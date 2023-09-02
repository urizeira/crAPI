package com.crapi.service.Impl;

import com.crapi.model.CarPart;
import com.crapi.service.XMLParseService;
import com.crapi.utils.XMLHandler;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

@Service
public class XMLParseServiceImpl implements XMLParseService {

  private static final Logger logger = LoggerFactory.getLogger(XMLParseServiceImpl.class);

  /**
   * Parse the xml content and return the list of employees.
   *
   * @param xmlContent the XML content to parse
   * @return list of parsed employees
   * @throws ParserConfigurationException if a parser configuration exception occurs
   * @throws SAXException if a SAX exception occurs
   * @throws IOException if an I/O exception occurs
   */
  @Override
  public List<CarPart> parseXml(String xmlContent)
      throws ParserConfigurationException, SAXException, IOException {

    SAXParserFactory saxParserFactory = SAXParserFactory.newInstance();
    InputStream targetStream = new ByteArrayInputStream(xmlContent.getBytes());
    SAXParser saxParser = saxParserFactory.newSAXParser();
    XMLHandler handler = new XMLHandler();
    saxParser.parse(targetStream, handler);
    List<CarPart> carPartList = handler.getCarPartList();

    logger.info("Employee list size: " + carPartList.size());

    return carPartList;
  }
}
