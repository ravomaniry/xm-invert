const { XMLParser, XMLBuilder } = require('fast-xml-parser');

const attrPrefix = '__';

function invertXml(raw) {
  const xml = newXmlParser();
  const xmlData = xml.parse(raw);
  const updated = transform(xmlData);
  return xml.build(updated);
}

function newXmlParser() {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: attrPrefix,
  });
  const builder = new XMLBuilder({
    format: true,
    ignoreAttributes: false,
    attributeNamePrefix: attrPrefix,
  });
  return {
    parse: (raw) => parser.parse(raw),
    build: (data) => builder.build(data).replace('?>', '?>\n'),
  };
}

function isScalar(value) {
  return typeof (value) === 'number' || typeof (value) === 'string';
}

function transformObject(node) {
  const copy = {};
  Object.keys(node).forEach((key) => {
    const value = node[key];
    if (key.startsWith(attrPrefix)) {
      copy[key] = value;
    } else if (isScalar(value)) {
      copy[attrPrefix + key] = value;
    } else {
      copy[key] = transform(value);
    }
  });
  return copy;
}

function transform(node) {
  if (node instanceof Array) {
    return node.map(transform);
  }
  if (typeof node === 'object') {
    return transformObject(node);
  }
  return node;
}

module.exports = {
  invertXml,
};
