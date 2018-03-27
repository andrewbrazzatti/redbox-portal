import * as _ from "lodash-es";
var RbValidator = (function () {
    function RbValidator() {
    }
    RbValidator.isEmpty = function (control) {
        return (control && (_.isEmpty(control.value) || control.value.length == 0));
    };
    RbValidator.noEmptyInGroup = function (field, dependentFieldNames) {
        return function (control) {
            var group = field.formModel;
            if (group) {
                var status_1 = { empty: false, emptyFields: [] };
                _.forEach(dependentFieldNames, function (f) {
                    var isEmpty = RbValidator.isEmpty(group.controls[f]);
                    if (isEmpty) {
                        status_1.emptyFields.push(f);
                    }
                    status_1.empty = status_1.empty || (isEmpty != null);
                });
                var retval = status_1.empty ? status_1 : null;
                return retval;
            }
            console.log("Group doesn't exist yet: " + field.name);
        };
    };
    return RbValidator;
}());
export { RbValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0JBLE9BQU8sS0FBSyxDQUFDLE1BQU0sWUFBWSxDQUFDO0FBUWhDO0lBQUE7SUFnQ0EsQ0FBQztJQTNCUSxtQkFBTyxHQUFkLFVBQWUsT0FBd0I7UUFDckMsTUFBTSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBT00sMEJBQWMsR0FBckIsVUFBc0IsS0FBVSxFQUFFLG1CQUE2QjtRQUM3RCxNQUFNLENBQUMsVUFBQyxPQUF3QjtZQUM5QixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsSUFBTSxRQUFNLEdBQXlDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFDLENBQUM7Z0JBQ3JGLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxDQUFLO29CQUNuQyxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDWixRQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsQ0FBQztvQkFDRCxRQUFNLENBQUMsS0FBSyxHQUFHLFFBQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQU0sTUFBTSxHQUFHLFFBQU0sQ0FBQyxLQUFLLEdBQUcsUUFBTSxHQUFHLElBQUksQ0FBQztnQkFDNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNoQixDQUFDO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBNEIsS0FBSyxDQUFDLElBQU0sQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQztJQUNKLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUFoQ0QsSUFnQ0MifQ==