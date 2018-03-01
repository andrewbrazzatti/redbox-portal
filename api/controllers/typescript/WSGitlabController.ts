declare var module;
declare var sails, Model;
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
const url = require('url');

declare var WSGitlabService, BrandingService;
/**
* Package that contains all Controllers.
*/
import controller = require('../../../typescript/controllers/CoreController.js');

export module Controllers {

  /**
  * Workspace related features....
  *
  *
  */
  export class WSGitlabController extends controller.Controllers.Core.Controller {
    /**
    * Exported methods, accessible from internet.
    */
    protected _exportedMethods: any = [
      'token',
      'user',
      'projects',
      'link',
      'checkRepo',
      'revokeToken',
      'create',
      'createWithTemplate',
      'project',
      'updateProject',
      'projectsRelatedRecord',
      'groups',
      'templates'
    ];
    protected config: any;

    constructor(){
      super();
      this.config = {
        host: sails.config.local.workspaces.gitlab.host,
        recordType: sails.config.local.workspaces.recordType,
        formName: sails.config.local.workspaces.formName,
        parentRecord: sails.config.local.workspaces.parentRecord,
        provisionerUser: sails.config.local.workspaces.provisionerUser,
        //TODO: get the brand url with config service
        brandingAndPortalUrl: '',
        redboxHeaders:  {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          'Authorization': '',
        }
      }
    }

    public token(req, res) {
      sails.log.debug('get token:');

      //TODO: do we need another form of security?
      const username = req.param('username');
      const password = req.param('password');

      let accessToken = {};
      let user = {};
      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        const userId = req.user.id;
        return WSGitlabService.userInfo(userId)
        .flatMap(response => {
          user = response;
          return WSGitlabService.token(this.config, username, password)
        })
        .flatMap(response => {
          sails.log.debug('token');
          accessToken = response;
          sails.log.debug(accessToken);
          return WSGitlabService.user(this.config, accessToken.access_token);
        }).flatMap(response => {
          sails.log.debug('user');
          sails.log.debug(response);
          const gitlabUser = {
            username: response.username,
            id: response.id
          };
          return WSGitlabService.updateUser(user.id, {user: gitlabUser, accessToken: accessToken});
        })
        .subscribe(response => {
          sails.log.debug('updateUser');
          sails.log.debug(response);
          this.ajaxOk(req, res, null, {status: true});
        }, error => {
          sails.log.error(error);
          const errorMessage = `Failed to get token for user: ${username}`;
          sails.log.error(errorMessage);
          this.ajaxFail(req, res, errorMessage, error);
        });
      }
    }

    public revokeToken(req, res) {
      sails.log.debug('revokeToken');
      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        const userId = req.user.id;
        return WSGitlabService
        .userInfo(userId)
        .flatMap(user => {
          return WSGitlabService.revokeToken(user.id);
        })
        .subscribe(response => {
          sails.log.debug('updateUser');
          sails.log.debug(response);
          this.ajaxOk(req, res, null, {status: true});
        }, error => {
          sails.log.error(error);
          const errorMessage = `Failed to get token for user: ${user.username}`;
          sails.log.error(errorMessage);
          this.ajaxFail(req, res, errorMessage, error);
        });
      }
    }

    public user(req, res) {
      sails.log.debug('get user:');

      sails.log.error('token');
      let gitlab = {};
      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        const userId = req.user.id;
        return WSGitlabService.userInfo(userId)
        .flatMap(user => {
          gitlab = user.accessToken.gitlab;
          return WSGitlabService.user(this.config, gitlab.accessToken.access_token)
        }).subscribe(response => {
          response.status = true;
          this.ajaxOk(req, res, null, response);
        }, error => {
          sails.log.error(error);
          const errorMessage = `Failed to get info for with token: ${gitlab.accessToken.access_token}`;
          sails.log.error(errorMessage);
          this.ajaxFail(req, res, null, error);
        });
      }
    }

    public projects(req, res) {
      sails.log.debug('get projects');
      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        const userId = req.user.id;
        return WSGitlabService
        .userInfo(userId)
        .flatMap(user => {
          const gitlab = user.accessToken.gitlab;
          return WSGitlabService.projects(this.config, gitlab.accessToken.access_token)
        }).subscribe(response => {
          response.status = true;
          this.ajaxOk(req, res, null, response);
        }, error => {
          sails.log.error(error);
          const errorMessage = `Failed to get projects for token: ${token}`;
          sails.log.error(errorMessage);
          this.ajaxFail(req, res, errorMessage, error);
        });
      }
    }

    public projectsRelatedRecord(req, res) {
      sails.log.debug('get related projects');

      let currentProjects = [];
      let projectsWithInfo = [];
      let gitlab = {};
      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        const userId = req.user.id;
        return WSGitlabService
        .userInfo(userId)
        .flatMap(user => {
          gitlab = user.accessToken.gitlab;
          return WSGitlabService.projects(this.config, gitlab.accessToken.access_token)
        })
        .flatMap(response => {
          let obs = [];
          currentProjects = response.slice(0);
          for (let r of currentProjects) {
            obs.push(WSGitlabService.readFileFromRepo(this.config, gitlab.accessToken.access_token, r.path_with_namespace, 'stash.workspace'));
          }
          return Observable.merge(...obs);
        })
        .subscribe(response => {
          const parsedResponse = this.parseResponseFromRepo(response);
          projectsWithInfo.push({
            path: parsedResponse.path,
            info: parsedResponse.content ? this.workspaceInfoFromRepo(parsedResponse.content) : {}
          });
        }, error => {
          const errorMessage = `Failed to get projectsRelatedRecord for token: ${gitlab.accessToken.access_token}`;
          sails.log.debug(errorMessage);
          this.ajaxFail(req, res, errorMessage, error);
        }, () => {
          sails.log.debug('complete');
          currentProjects.map(p => {
            p.rdmp = projectsWithInfo.find(pwi => pwi.path === p.path_with_namespace);
          });
          this.ajaxOk(req, res, null, currentProjects);
        });
      }
    }

    public link(req, res) {
      sails.log.debug('get link');
      sails.log.debug('createWorkspaceRecord')
      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        this.config.brandingAndPortalUrl = sails.getBaseUrl() + BrandingService.getBrandAndPortalPath(req);
        const project = req.param('project');
        const rdmpId = req.param('rdmpId');

        let workspaceId = null;
        let gitlab = {};

        return WSGitlabService.provisionerUser(this.config.provisionerUser)
        .flatMap(response => {
          this.config.redboxHeaders['Authorization'] = 'Bearer ' + response.token;
          const userId = req.user.id;
          return WSGitlabService.userInfo(userId)
        })
        .flatMap(user => {
          gitlab = user.accessToken.gitlab;
          return WSGitlabService.createWorkspaceRecord(this.config, project, 'draft');
        }).flatMap(response => {
          workspaceId = response.oid;
          sails.log.debug('addWorkspaceInfo');
          return WSGitlabService.addWorkspaceInfo(this.config, gitlab.accessToken.access_token, project, rdmpId + '.' + workspaceId, 'stash.workspace');
        })
        .flatMap(response => {
          sails.log.debug('addParentRecordLink');
          return WSGitlabService.getRecordMeta(this.config, rdmpId);
        })
        .flatMap(recordMetadata => {
          sails.log.debug('recordMetadata');
          if(recordMetadata && recordMetadata.workspaces) {
            const wss = recordMetadata.workspaces.find(id => workspaceId === id);
            if(!wss) {
              recordMetadata.workspaces.push({id: workspaceId});
            }
          }
          return WSGitlabService.updateRecordMeta(this.config, recordMetadata, rdmpId);
        })
        .subscribe(response => {
          this.ajaxOk(req, res, null, response);
        }, error => {
          sails.log.error(error);
          const errorMessage = `Failed to link workspace with ID: ${project.id}` ;
          sails.log.error(errorMessage);
          this.ajaxFail(req, res, errorMessage, error);
        });
      }
    }

    public checkRepo(req, res) {
      sails.log.debug('check link');
      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        const projectNameSpace = req.param('projectNameSpace');
        let gitlab = {};
        const userId = req.user.id;

        return WSGitlabService
        .userInfo(userId)
        .flatMap(user => {
          gitlab = user.accessToken.gitlab;
          return WSGitlabService.readFileFromRepo(this.config, gitlab.accessToken.access_token, projectNameSpace, 'stash.workspace');
        }).subscribe(response => {
          sails.log.debug('checkLink:getRecordMeta');
          const parsedResponse = this.parseResponseFromRepo(response);
          const wI = parsedResponse.content ? this.workspaceInfoFromRepo(parsedResponse.content) : {rdmp: null, workspace: null};
          sails.log.debug(wI);
          this.ajaxOk(req, res, null, wI);
        }, error => {
          sails.log.error(error);
          const errorMessage = `Failed check link workspace project: ${projectNameSpace}`;
          sails.log.error(errorMessage);
          this.ajaxFail(req, res, errorMessage, error);
        });
      }
    }

    public compareLink(req, res) {
      const rdmpId = req.param('rdmpId');
      const projectNameSpace = req.param('projectNameSpace');
      const workspaceId = req.param('workspaceId');

      this.config.brandingAndPortalUrl = sails.getBaseUrl() + BrandingService.getBrandAndPortalPath(req);

      return WSGitlabService.provisionerUser(this.config.provisionerUser)
      .flatMap(response => {
        this.config.redboxHeaders['Authorization'] = 'Bearer ' + response.token;
        return WSGitlabService.getRecordMeta(this.config, rdmpId)
      })
      .subscribe(recordMetadata => {
        sails.log.debug('recordMetadata');
        if(recordMetadata && recordMetadata.workspaces) {
          const wss = recordMetadata.workspaces.find(id => workspaceId === id);
          let message = 'workspace match';
          if(!wss) {
            message = 'workspace not found';
          }
          this.ajaxOk(req, res, null, {workspace: wss, message: message});
        } else{
          const errorMessage = `Failed compare link workspace project: ${projectNameSpace}` ;
          this.ajaxFail(req, res, null, errorMessage);
        }
      }, error => {
        const errorMessage = `Failed compare link workspace project: ${projectNameSpace}`;
        sails.log.error(errorMessage);
        this.ajaxFail(req, res, errorMessage, error);
      });
    }

    public create(req, res) {
      const creation = req.param('creation');

      let workspaceId = '';
      const group = creation.group;
      const namespace = group.path + '/' + creation.name;
      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        const userId = req.user.id;

        return WSGitlabService.userInfo(userId)
        .flatMap(user => {
          const gitlab = user.accessToken.gitlab;
          return WSGitlabService.create(this.config, gitlab.accessToken.access_token, creation);
        }).subscribe(response => {
          sails.log.debug('updateRecordMeta');
          this.ajaxOk(req, res, null, response);
        }, error => {
          sails.log.error(error);
          const errorMessage = `Failed to create workspace with: ${namespace}` ;
          sails.log.error(errorMessage);
          const data = {status: false, message: {description: errorMessage, error: error}}
          this.ajaxFail(req, res, null, data);
        });
      }
    }

    public createWithTemplate(req, res) {
      //Needs to fork project
      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        const creation = req.param('creation');
        const userId = req.user.id;
        return WSGitlabService.userInfo(userId)
        .flatMap(user => {
          const gitlab = user.accessToken.gitlab;
          return WSGitlabService.fork(this.config, gitlab.accessToken.access_token, creation);
        }).subscribe(response => {
          sails.log.debug('fork');
          this.ajaxOk(req, res, null, response);
        }, error => {
          sails.log.error(error);
          const errorMessage = `Failed to fork project with Id: ${creation.template.id}`;
          sails.log.error(errorMessage);
          const data = {status: false, message: {description: errorMessage, error: error}}
          this.ajaxFail(req, res, null, data);
        });
      }
    }

    public updateProject(req, res) {
      //TODO: In this case only name can be updated for FORK, should it have more?
      //Remove fork relationship?
      //change name
      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        const creation = req.param('creation');
        //TODO: make some validations on each case of the update
        const project = {};
        const projectId = creation.group.path + '/' + creation.template.name; //Can also be the id
        project['name'] = creation.template.name;
        project['group'] = creation.group;
        project['attributes'] = [{name: 'name', newValue: creation.name}, {name: 'path', newValue: creation.name}];
        const userId = req.user.id;
        return WSGitlabService.userInfo(userId)
        .flatMap(user => {
          const gitlab = user.accessToken.gitlab;
          return WSGitlabService.updateProject(this.config, gitlab.accessToken.access_token, projectId, project);
        }).subscribe(response => {
          sails.log.debug('updateProject');
          this.ajaxOk(req, res, null, response);
        }, error => {
          sails.log.error(error);
          const errorMessage = `Failed to update project with: ${creation}`;
          sails.log.error(errorMessage);
          const data = {status: false, message: {description: errorMessage, error: error}}
          this.ajaxFail(req, res, null, data);
        });
      }
    }

    public project(req, res) {
      const pathWithNamespace = req.param('pathWithNamespace');

      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        const userId = req.user.id;
        return WSGitlabService.userInfo(userId)
        .flatMap(user => {
          const gitlab = user.accessToken.gitlab;
          return WSGitlabService.project(this.config, gitlab.accessToken.access_token, pathWithNamespace);
        })
        .subscribe(response => {
          sails.log.debug('project');
          this.ajaxOk(req, res, null, response);
        }, error => {
          sails.log.error(error);
          const errorMessage = `Failed to check project with: ${pathWithNamespace}` ;
          sails.log.error(errorMessage);
          this.ajaxFail(req, res, errorMessage, error);
        });
      }
    }

    public templates(req, res) {
      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        const userId = req.user.id;
        return WSGitlabService.userInfo(userId)
        .flatMap(user => {
          const gitlab = user.accessToken.gitlab;
          return WSGitlabService.templates(this.config, gitlab.accessToken.access_token, 'provisioner_template');
        }).subscribe(response => {
          let simple = [];
          if(response.value){
            simple = response.value.map(p => {return {id: p.id, pathWithNamespace: p.path_with_namespace, name: p.path, namespace: p.namespace.path}});
          }
          this.ajaxOk(req, res, null, simple);
        }, error => {
          sails.log.error(error);
          const errorMessage = `Failed to check templates`;
          sails.log.error(errorMessage);
          this.ajaxFail(req, res, errorMessage, error);
        });
      }
    }

    public groups(req, res) {
      if (!req.isAuthenticated()) {
        this.ajaxFail(req, res, `User not authenticated`);
      } else {
        const userId = req.user.id;
        return WSGitlabService.userInfo(userId)
        .flatMap(user => {
          const gitlab = user.accessToken.gitlab;
          return WSGitlabService.groups(this.config, gitlab.accessToken.access_token)
        }).subscribe(response => {
          sails.log.debug('groups');
          this.ajaxOk(req, res, null, response);
        }, error => {
          sails.log.error(error);
          const errorMessage = `Failed to get groups`;
          sails.log.error(errorMessage);
          this.ajaxFail(req, res, errorMessage, error);
        });
      }
    }

    workspaceInfoFromRepo(content: string) {
      const workspaceLink = Buffer.from(content, 'base64').toString('ascii');
      if(workspaceLink) {
        const workspaceInfo = workspaceLink.split('.');
        return {rdmp: _.first(workspaceInfo), workspace: _.last(workspaceInfo)};
      } else{
        return {rdmp: null, workspace: null};
      }
    }

    parseResponseFromRepo(response) {
      const result = {content: null, path:''};
      if(response.body && response.body.content) {
        result.content = response.body.content;
        var url_parts = url.parse(response.request.uri.href, true);
        var query = url_parts.query;
        result.path = query.namespace;
      } else {
        result.content = null;
        result.path = response.path;
      }
      return result;
    }

  }
}

module.exports = new Controllers.WSGitlabController().exports();
