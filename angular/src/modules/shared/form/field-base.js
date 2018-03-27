var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from '../translation-service';
import * as _ from "lodash-es";
var FieldBase = (function () {
    function FieldBase(options, injector) {
        if (options === void 0) { options = {}; }
        this.onValueUpdate = new EventEmitter();
        this.injector = injector;
        this.translationService = this.getFromInjector(TranslationService);
        this.setOptions(options);
    }
    FieldBase.prototype.getFromInjector = function (token) {
        return this.injector.get(token);
    };
    FieldBase.prototype.setOptions = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.value = this.getTranslated(options.value, undefined);
        this.name = options.name || '';
        this.id = options.id || '';
        this.label = this.getTranslated(options.label, '');
        this.help = this.getTranslated(options.help, undefined);
        this.required = !!options.required;
        this.controlType = options.controlType || '';
        this.cssClasses = options.cssClasses || {};
        this.groupClasses = options['groupClasses'] || '';
        this.groupName = options.groupName || null;
        this.editMode = options.editMode || false;
        this.readOnly = options.readOnly || false;
        this.onChange = options['onChange'] || null;
        this.publish = options['publish'] || null;
        this.subscribe = options['subscribe'] || null;
        if (this.groupName) {
            this.hasGroup = true;
        }
        this.options = options;
        this.hasControl = true;
        this.validationMessages = {};
        _.forOwn(options['validationMessages'] || {}, function (messageKey, messageName) {
            _this.validationMessages[messageName] = _this.getTranslated(messageKey, messageKey);
        });
        this.defaultValue = this.getTranslated(options.defaultValue, undefined);
        if ((_.isUndefined(this.value) || _.isEmpty(this.value)) && !_.isUndefined(this.defaultValue)) {
            this.value = this.defaultValue;
        }
    };
    FieldBase.prototype.getTranslated = function (key, defValue) {
        if (!_.isEmpty(key) && !_.isUndefined(key)) {
            if (_.isFunction(key.startsWith) && key.startsWith('@') && this.translationService) {
                return this.translationService.t(key);
            }
            else {
                return key;
            }
        }
        else {
            return defValue;
        }
    };
    Object.defineProperty(FieldBase.prototype, "isValid", {
        get: function () {
            if (this.form && this.form.controls) {
                return this.form.controls[this.name].valid;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    FieldBase.prototype.createFormModel = function () {
        this.formModel = this.required ? new FormControl(this.value || '', Validators.required)
            : new FormControl(this.value || '');
        return this.formModel;
    };
    FieldBase.prototype.getGroup = function (group, fieldMap) {
        this.fieldMap = fieldMap;
        var retval = null;
        _.set(fieldMap, this.getFullFieldName() + ".field", this);
        var control = this.createFormModel();
        _.set(fieldMap, this.getFullFieldName() + ".control", control);
        if (this.hasGroup && this.groupName) {
            if (group[this.groupName]) {
                group[this.groupName].addControl(this.name, control);
            }
            else {
                var fg = {};
                fg[this.name] = control;
                group[this.groupName] = new FormGroup(fg);
            }
            retval = group[this.groupName];
        }
        else {
            if (this.hasControl) {
                group[this.name] = control;
                retval = group[this.name];
            }
        }
        return retval;
    };
    FieldBase.prototype.triggerValidation = function () {
        if (this.formModel) {
            this.formModel.markAsTouched();
            this.formModel.updateValueAndValidity({ onlySelf: false, emitEvent: false });
        }
    };
    FieldBase.prototype.valueNotNull = function (data) {
        return !_.isNull(data) && (_.isArray(data) ? (!_.isNull(data[0])) : true);
    };
    FieldBase.prototype.setupEventHandlers = function () {
        var _this = this;
        if (!_.isEmpty(this.formModel)) {
            var publishConfig = this.publish;
            var subscribeConfig = this.subscribe;
            if (!_.isEmpty(publishConfig)) {
                _.forOwn(publishConfig, function (eventConfig, eventName) {
                    console.log("Setting up " + eventName + " handlers for field: " + _this.name);
                    var eventSource = eventConfig.modelEventSource;
                    _this.formModel[eventSource].subscribe(function (value) {
                        if (_this.valueNotNull(value)) {
                            var emitData_1 = value;
                            if (!_.isEmpty(eventConfig.fields)) {
                                if (_.isArray(value)) {
                                    emitData_1 = [];
                                    _.each(value, function (v) {
                                        if (!_.isEmpty(v)) {
                                            var item_1 = {};
                                            _.each(eventConfig.fields, function (f) {
                                                _.forOwn(f, function (src, tgt) {
                                                    item_1[tgt] = _.get(v, src);
                                                });
                                            });
                                            emitData_1.push(item_1);
                                        }
                                    });
                                }
                                else {
                                    emitData_1 = {};
                                    if (!_.isEmpty(value)) {
                                        _.each(eventConfig.fields, function (f) {
                                            _.forOwn(f, function (src, tgt) {
                                                emitData_1[tgt] = _.get(value, src);
                                            });
                                        });
                                    }
                                }
                            }
                            console.log("Emitting data:");
                            console.log(emitData_1);
                            _this.emitEvent(eventName, emitData_1, value);
                        }
                    });
                });
            }
            if (!_.isEmpty(subscribeConfig)) {
                _.forOwn(subscribeConfig, function (subConfig, srcName) {
                    _.forOwn(subConfig, function (eventConfArr, eventName) {
                        var eventEmitter = srcName == "this" ? _this[eventName] : _this.fieldMap[srcName].field[eventName];
                        eventEmitter.subscribe(function (value) {
                            var curValue = value;
                            if (_.isArray(value)) {
                                curValue = [];
                                _.each(value, function (v) {
                                    var entryVal = v;
                                    _.each(eventConfArr, function (eventConf) {
                                        var fn = _.get(_this, eventConf.action);
                                        if (fn) {
                                            entryVal = fn(entryVal, eventConf);
                                        }
                                    });
                                    if (!_.isEmpty(entryVal)) {
                                        curValue.push(entryVal);
                                    }
                                });
                            }
                            else {
                                _.each(eventConfArr, function (eventConf) {
                                    var fn = _.get(_this, eventConf.action);
                                    if (fn) {
                                        curValue = fn(curValue, eventConf);
                                    }
                                });
                            }
                            _this.reactEvent(eventName, curValue, value);
                        });
                    });
                });
            }
        }
    };
    FieldBase.prototype.emitEvent = function (eventName, eventData, origData) {
        this[eventName].emit(eventData);
    };
    FieldBase.prototype.reactEvent = function (eventName, eventData, origData) {
        this.formModel.setValue(eventData, { onlySelf: true, emitEvent: false });
    };
    FieldBase.prototype.setFieldMapEntry = function (fieldMap, fieldCompRef) {
        if (!_.isUndefined(this.name) && !_.isEmpty(this.name) && !_.isNull(this.name)) {
            _.set(fieldMap, this.getFullFieldName() + ".instance", fieldCompRef.instance);
        }
    };
    FieldBase.prototype.getFullFieldName = function (name) {
        if (name === void 0) { name = null; }
        var fldName = "" + (name ? name : this.name);
        return fldName;
    };
    FieldBase.prototype.getControl = function (name, fieldMap) {
        if (name === void 0) { name = null; }
        if (fieldMap === void 0) { fieldMap = null; }
        return _.get(fieldMap ? fieldMap : this.fieldMap, this.getFullFieldName(name) + ".control");
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FieldBase.prototype, "onValueUpdate", void 0);
    return FieldBase;
}());
export { FieldBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpZWxkLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBbUJBLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzVELE9BQU8sS0FBSyxDQUFDLE1BQU0sWUFBWSxDQUFDO0FBT2hDO0lBa0NFLG1CQUFZLE9BQVksRUFBRSxRQUFRO1FBQXRCLHdCQUFBLEVBQUEsWUFBWTtRQUZQLGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFHMUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxtQ0FBZSxHQUFmLFVBQWdCLEtBQVM7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCw4QkFBVSxHQUFWLFVBQVcsT0FjTDtRQWROLGlCQTRDQztRQTVDVSx3QkFBQSxFQUFBLFlBY0w7UUFDSixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLENB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