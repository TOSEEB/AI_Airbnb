const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

module.exports = dns;
