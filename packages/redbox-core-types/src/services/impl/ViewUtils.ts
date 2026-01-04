// Copyright (c) 2025 Queensland Cyber Infrastructure Foundation (http://www.qcif.edu.au/)
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

import { existsSync } from 'fs';
import { Sails } from 'sails';
import { Services as services } from '../../index';

declare var sails: Sails;

export module Services {
  export class ViewUtils extends services.Core.Service {
    protected _exportedMethods: any = ['displayValue', 'resolvePartialPath'];

    public displayValue(value: string, req: any, defaultValue: string = ''): any {
      const keyArray = value.split('.');
      let returnValue: any = defaultValue;
      for (let i = 0; i < keyArray.length; i++) {
        returnValue = req.options.locals[keyArray[i]];
        if (returnValue == null) {
          return defaultValue;
        }
      }
      return returnValue;
    }

    public resolvePartialPath(
      value: string,
      branding: string,
      portal: string,
      templatePath: string,
      fromTemplate: boolean = false
    ): string | undefined {
      let partialLocation = value;
      const viewsDir = `${sails.config.appPath}/views`;
      const masterTemplateLocation = templatePath.substring(viewsDir.length, templatePath.length);
      const splitUrl = masterTemplateLocation.split('/');
      if (splitUrl.length > 2) {
        let locationToTest = `${sails.config.appPath}/views/${branding}/${portal}/${value}`;
        sails.log.debug(`testing :${locationToTest}`);
        if (existsSync(locationToTest)) {
          partialLocation = `${branding}/${portal}/${value}`;
        }

        if (partialLocation == value) {
          locationToTest = `${sails.config.appPath}/views/default/${portal}/${value}`;
          sails.log.debug(`testing :${locationToTest}`);
          if (existsSync(locationToTest)) {
            partialLocation = `default/${portal}/${value}`;
          }
        }

        if (partialLocation == value) {
          locationToTest = `${sails.config.appPath}/views/default/default/${value}`;
          sails.log.debug(`testing :${locationToTest}`);
          if (existsSync(locationToTest)) {
            partialLocation = `default/default/${value}`;
          }
        }

        if (partialLocation != value) {
          const numberOfLevels = fromTemplate ? 2 : splitUrl.length - 2;
          for (let i = 0; i < numberOfLevels; i++) {
            partialLocation = `../${partialLocation}`;
          }
        }
        return partialLocation;
      }
      return undefined;
    }
  }
}
