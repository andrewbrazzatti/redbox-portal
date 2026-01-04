// PeopleSearch configuration
// Maps search provider names to service functions

interface PeopleSearchConfig {
  [key: string]: string;
}

const peopleSearchConfig: PeopleSearchConfig = {
  "orcid": "sails.services.orcidservice.searchOrcid",
  "nla": "sails.services.orcidservice.searchOrcid",
};

module.exports.peopleSearch = peopleSearchConfig;
