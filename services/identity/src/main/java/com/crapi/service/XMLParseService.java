package com.crapi.service;

import com.crapi.model.Employee;
import java.io.IOException;
import java.util.List;
import javax.xml.parsers.ParserConfigurationException;
import org.xml.sax.SAXException;

public interface XMLParseService {

  List<Employee> parseXml(String xmlContent)
      throws ParserConfigurationException, SAXException, IOException;
}