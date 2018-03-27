// Copyright (c) 2017 Queensland Cyber Infrastructure Foundation (http://www.qcif.edu.au/)
//
// GNU GENERAL PUBLIC LICENSE
//    Version 2, June 1991
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

import { Observable, Pro } from 'rxjs/Rx';
import services = require('../../typescript/services/CoreService.js');
import { Sails, Model } from "sails";
import * as request from "request-promise";
import * as xml2js from "xml2js"

declare var sails: Sails;
declare var Report: Model;
declare var _this;


export module Services {
  /**
   * WorkflowSteps related functions...
   *
   * @author <a target='_' href='https://github.com/shilob'>Shilo Banihit</a>
   *
   */
  export class Nla extends services.Services.Core.Service {

    protected _exportedMethods: any = [
      'searchPeople'
    ];

    public bootstrap = (defBrand) => {

    }

    public searchPeople(givenNames: string, familyName: string, page: number) {
      var url = "http://www.nla.gov.au/apps/srw/search/peopleaustralia?query=pa.surname+%3D+%22Mawson%22&version=1.1&operation=searchRetrieve&recordSchema=urn%3Aisbn%3A1-931666-33-4&maximumRecords=10&startRecord=1&resultSetTTL=300&recordPacking=xml&recordXPath=&sortKeys="
      var options = this.getOptions(url);
      var orcidRes = Observable.fromPromise(request[sails.config.record.api.search.method](options));

      return orcidRes.flatMap(nlaResult => {
        var xml2js = require('xml2js');
        Observable.bindNodeCallback(xml2js.parseString);
        parseString(nlaResult).flatMap(result => {return Observable.of(result)});
      });
    }

    protected mapToPeopleSearchResult(orcidSearchResult) {
      var item = {};

      var profile = orcidSearchResult["orcid-profile"];
      item["givenNames"] = profile["orcid-bio"]["personal-details"]["given-names"]["value"];
      item["familyName"] = profile["orcid-bio"]["personal-details"]["family-name"]["value"];
      item["identifier"] = profile["orcid-identifier"]["uri"];
      item["extendedAttributes"] = [];

      // Process extended attributes
      var otherNames = profile["orcid-bio"]["personal-details"]["other-names"] == null ? null : {};
      if (otherNames != null) {

        var otherNamesArray = profile["orcid-bio"]["personal-details"]["other-names"]["other-name"];

        otherNames = this.getExtendedAttributeObject('orcid-other-names', otherNamesArray);
        item["extendedAttributes"].push(otherNames);
      }

      var biography = profile["orcid-bio"]["biography"] == null ? null : {};
      if (biography != null) {

        var biographyValue = profile["orcid-bio"]["biography"];

        biography = this.getExtendedAttributeObject('orcid-biography', biographyValue);
        item["extendedAttributes"].push(biography);
      }


      var researcherUrls = profile["orcid-bio"]["researcher-urls"] == null ? null : {};
      if (researcherUrls != null) {
        var researcherUrlsValueArray = [];
        var researcherUrlsArray = profile["orcid-bio"]["researcher-urls"]["researcher-url"];

        _.forEach(researcherUrlsArray, function(researcherUrl) {
          var researcherUrlItem = {};
          researcherUrlItem["value"] = researcherUrl["url-name"]["value"];
          researcherUrlItem["url"] = researcherUrl["url"]["value"];
          researcherUrlsValueArray.push(researcherUrlItem);
        });

        researcherUrls = this.getExtendedAttributeObject('orcid-researcher-urls', researcherUrlsValueArray);
        researcherUrls["displayAsLinks"] = true;
        item["extendedAttributes"].push(researcherUrls);
      }

      var keywords = profile["orcid-bio"]["keywords"] == null ? null : {};
      if (keywords != null) {
        var keywordsArray = profile["orcid-bio"]["keywords"]["keyword"];

        keywords = this.getExtendedAttributeObject('orcid-keywords', keywordsArray);
        item["extendedAttributes"].push(keywords);
      }



      return item;
    }

    private getExtendedAttributeObject(label: string, value) {
      var extendedAttributes = {};
      extendedAttributes["label"] = label;
      extendedAttributes["value"] = value;
      return extendedAttributes;
    }

    protected getOptions(url, contentType = 'application/xml; charset=utf-8') {
      return { url: url, headers: { 'Content-Type': contentType } };
    }


  }

}
module.exports = new Services.Nla().exports();
