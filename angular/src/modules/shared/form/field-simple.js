var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { FieldBase } from './field-base';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import * as _ from "lodash-es";
import moment from 'moment-es6';
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.type = options['type'] || '';
        _this.controlType = 'textbox';
        _this.cssClasses = _.isEmpty(_this.cssClasses) ? 'form-control' : _this.cssClasses;
        return _this;
    }
    TextField.prototype.postInit = function (value) {
        if (_.isEmpty(value)) {
            this.value = this.defaultValue ? this.defaultValue : '';
        }
        else {
            this.value = value;
        }
    };
    return TextField;
}(FieldBase));
export { TextField };
var TextArea = (function (_super) {
    __extends(TextArea, _super);
    function TextArea(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.rows = options['rows'] || 5;
        _this.cols = options['cols'] || null;
        _this.controlType = 'textarea';
        return _this;
    }
    TextArea.prototype.formatValueForDisplay = function () {
        this.lines = this.value ? this.value.split("\n") : [];
    };
    return TextArea;
}(FieldBase));
export { TextArea };
var SelectionField = (function (_super) {
    __extends(SelectionField, _super);
    function SelectionField(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.options = [];
        _this.options = options['options'] || [];
        _this.options = _.map(options['options'] || [], function (option) {
            option.label = _this.getTranslated(option.label, option.label);
            option.value = _this.getTranslated(option.value, option.value);
            return option;
        });
        return _this;
    }
    SelectionField.prototype.createFormModel = function () {
        var _this = this;
        if (this.controlType == 'checkbox') {
            var fgDef_1 = [];
            _.map(this.options, function (opt) {
                var hasValue = _.find(_this.value, function (val) {
                    return val == opt.value;
                });
                if (hasValue) {
                    fgDef_1.push(new FormControl(opt.value));
                }
            });
            return new FormArray(fgDef_1);
        }
        else {
            return _super.prototype.createFormModel.call(this);
        }
    };
    return SelectionField;
}(FieldBase));
export { SelectionField };
var Container = (function (_super) {
    __extends(Container, _super);
    function Container(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.controlType = 'div';
        _this.content = options['content'] || '';
        _this.active = options['active'] || false;
        _this.type = options['type'] || '';
        _this.isGroup = true;
        _this.hasControl = _.isUndefined(_this.groupName);
        return _this;
    }
    Container.prototype.getGroup = function (group, fieldMap) {
        this.fieldMap = fieldMap;
        _.set(fieldMap, this.getFullFieldName() + ".field", this);
        group[this.name] = new FormGroup({});
        _.each(this.fields, function (field) {
            field.getGroup(group, fieldMap);
        });
        return group[this.name];
    };
    Container.prototype.createFormModel = function () {
        var grp = {};
        _.each(this.fields, function (field) {
            grp[field.name] = field.createFormModel();
        });
        this.formModel = new FormGroup(grp);
        return this.formModel;
    };
    return Container;
}(FieldBase));
export { Container };
var TabOrAccordionContainer = (function (_super) {
    __extends(TabOrAccordionContainer, _super);
    function TabOrAccordionContainer(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.onTabChange = new EventEmitter();
        _this.tabNavContainerClass = options['tabNavContainerClass'] || 'col-md-2';
        _this.tabNavClass = options['tabNavClass'] || 'nav nav-pills nav-stacked';
        _this.tabContentContainerClass = options['tabContentContainerClass'] || 'col-md-10';
        _this.tabContentClass = options['tabContentClass'] || 'tab-content';
        _this.accContainerClass = options['accContainerClass'] || 'col-md-12';
        _this.accClass = options['accClass'] || 'panel panel-default';
        return _this;
    }
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TabOrAccordionContainer.prototype, "onTabChange", void 0);
    return TabOrAccordionContainer;
}(Container));
export { TabOrAccordionContainer };
var ButtonBarContainer = (function (_super) {
    __extends(ButtonBarContainer, _super);
    function ButtonBarContainer(options, injector) {
        return _super.call(this, options, injector) || this;
    }
    return ButtonBarContainer;
}(Container));
export { ButtonBarContainer };
var DateTime = (function (_super) {
    __extends(DateTime, _super);
    function DateTime(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.datePickerOpts = options['datePickerOpts'] || false;
        _this.timePickerOpts = options['timePickerOpts'] || false;
        _this.hasClearButton = options['hasClearButton'] || false;
        _this.valueFormat = options['valueFormat'] || 'YYYY-MM-DD';
        _this.displayFormat = options['displayFormat'] || 'YYYY-MM-DD';
        _this.controlType = 'datetime';
        _this.value = _this.value ? _this.parseToDate(_this.value) : _this.value;
        return _this;
    }
    DateTime.prototype.formatValue = function (value) {
        console.log("Formatting value: " + value);
        return value ? moment(value).local().format(this.valueFormat) : value;
    };
    DateTime.prototype.parseToDate = function (value) {
        return moment(value, this.valueFormat).local().toDate();
    };
    DateTime.prototype.formatValueForDisplay = function () {
        var locale = window.navigator.language;
        return this.value ? moment(this.value).locale(locale).format(this.displayFormat) : '';
    };
    DateTime.prototype.reactEvent = function (eventName, eventData, origData) {
        var thisDate = moment(eventData);
        var prevStartDate = moment(this.formModel.value);
        if (!prevStartDate.isValid() || thisDate.isAfter(prevStartDate)) {
            this.formModel.setValue(eventData);
        }
        var newOpts = _.cloneDeep(this.datePickerOpts);
        newOpts.startDate = eventData;
        this.datePickerOpts = newOpts;
    };
    return DateTime;
}(FieldBase));
export { DateTime };
var SaveButton = (function (_super) {
    __extends(SaveButton, _super);
    function SaveButton(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.label = options['label'];
        _this.closeOnSave = options['closeOnSave'] || false;
        _this.redirectLocation = options['redirectLocation'] || false;
        _this.cssClasses = options['cssClasses'] || "btn-primary";
        return _this;
    }
    return SaveButton;
}(FieldBase));
export { SaveButton };
var CancelButton = (function (_super) {
    __extends(CancelButton, _super);
    function CancelButton(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.label = options['label'];
        return _this;
    }
    return CancelButton;
}(FieldBase));
export { CancelButton };
var AnchorOrButton = (function (_super) {
    __extends(AnchorOrButton, _super);
    function AnchorOrButton(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.onClick_RootFn = options['onClick_RootFn'] || null;
        _this.isDisabledFn = options['isDisabledFn'] || null;
        _this.type = options['type'] || 'button';
        _this.controlType = options['controlType'] || 'button';
        _this.hasControl = false;
        _this.showPencil = options['showPencil'] || false;
        return _this;
    }
    return AnchorOrButton;
}(FieldBase));
export { AnchorOrButton };
var HiddenValue = (function (_super) {
    __extends(HiddenValue, _super);
    function HiddenValue(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.controlType = 'hidden';
        return _this;
    }
    return HiddenValue;
}(FieldBase));
export { HiddenValue };
var LinkValue = (function (_super) {
    __extends(LinkValue, _super);
    function LinkValue(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.controlType = 'link';
        _this.target = options.target || '_blank';
        return _this;
    }
    return LinkValue;
}(FieldBase));
export { LinkValue };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2ltcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmllbGQtc2ltcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRSxPQUFPLEtBQUssQ0FBQyxNQUFNLFlBQVksQ0FBQztBQUNoQyxPQUFPLE1BQU0sTUFBTSxZQUFZLENBQUM7QUFPaEM7SUFBK0IsNkJBQWlCO0lBRzlDLG1CQUFZLE9BQVksRUFBRSxRQUFhO1FBQXZDLFlBQ0Usa0JBQU0sT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQUl6QjtRQUhDLEtBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQyxLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGNBQWMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDOztJQUNsRixDQUFDO0lBRUQsNEJBQVEsR0FBUixVQUFTLEtBQVM7UUFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQzFELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFD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