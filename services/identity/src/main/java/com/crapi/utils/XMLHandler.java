package com.crapi.utils;

import com.crapi.model.CarPart;
import java.util.ArrayList;
import java.util.List;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class XMLHandler extends DefaultHandler {

  // List to hold CarPart object
  private List<CarPart> carPartList = null;
  private CarPart carPart = null;
  private StringBuilder data = null;

  // getter method for carPart list
  public List<CarPart> getCarPartList() {
    return carPartList;
  }

  boolean bName = false;
  boolean bManufacturer = false;
  boolean bPrice = false;
  boolean bInStock = false;
  boolean bWeight = false;
  boolean bMaterial = false;
  boolean bLifespan = false;

  @Override
  public void startElement(String uri, String localName, String qName, Attributes attributes)
      throws SAXException {

    if (qName.equalsIgnoreCase("CarPart")) {
      // create a new Employee and put it in Map
      String id = attributes.getValue("id");
      // initialize Employee object and set id attribute
      carPart = new CarPart();
      carPart.setId(Integer.parseInt(id));
      // initialize list
      if (carPartList == null) carPartList = new ArrayList<>();
    } else if (qName.equalsIgnoreCase("Name")) {
      bName = true;
    } else if (qName.equalsIgnoreCase("Manufacturer")) {
      bManufacturer = true;
    } else if (qName.equalsIgnoreCase("Price")) {
      bPrice = true;
    } else if (qName.equalsIgnoreCase("InStock")) {
      bInStock = true;
    } else if (qName.equalsIgnoreCase("Weight")) {
      bWeight = true;
    } else if (qName.equalsIgnoreCase("Material")) {
      bMaterial = true;
    } else if (qName.equalsIgnoreCase("lifespan")) {
      bLifespan = true;
    }

    // create the data container
    data = new StringBuilder();
  }

  @Override
  public void endElement(String uri, String localName, String qName) throws SAXException {

    if (bLifespan) {
      carPart.setLifespan(Double.parseDouble(data.toString()));
      bLifespan = false;
    }
    if (bMaterial) {
      carPart.setMaterial(data.toString());
      bMaterial = false;
    }
    if (bWeight) {
      carPart.setWeight(Double.parseDouble(data.toString()));
      bWeight = false;
    }
    if (bInStock) {
      carPart.setInStock(Boolean.parseBoolean(data.toString()));
      bInStock = false;
    }
    if (bPrice) {
      carPart.setPrice(Double.parseDouble(data.toString()));
      bPrice = false;
    }
    if (bManufacturer) {
      carPart.setManufacturer(data.toString());
      bManufacturer = false;
    }
    if (bName) {
      carPart.setName(data.toString());
      bName = false;
    }
    if (qName.equalsIgnoreCase("CarPart")) {
      // add Employee object to list
      carPartList.add(carPart);
    }
  }

  @Override
  public void characters(char ch[], int start, int length) throws SAXException {
    data.append(new String(ch, start, length));
  }
}
