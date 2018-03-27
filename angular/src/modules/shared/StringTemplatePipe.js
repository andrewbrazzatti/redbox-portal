var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var StringTemplatePipe = (function () {
    function StringTemplatePipe() {
        this.generateTemplateString = (function () {
            var cache = {};
            function generateTemplate(template) {
                var fn = cache[template];
                if (!fn) {
                    var sanitized = template
                        .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function (_, match) {
                        return "${map." + match.trim() + "}";
                    })
                        .replace(/(\$\{(?!map\.)[^}]+\})/g, '');
                    fn = Function('map', "return `" + sanitized + "`");
                }
                return fn;
            }
            ;
            return generateTemplate;
        })();
    }
    StringTemplatePipe.prototype.transform = function (templateString, args) {
        if (args != null) {
            var template = this.generateTemplateString(templateString);
            return template(args);
        }
        return templateString;
    };
    StringTemplatePipe = __decorate([
        Pipe({
            name: 'stringTemplate'
        })
    ], StringTemplatePipe);
    return StringTemplatePipe;
}());
export { StringTemplatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaW5nVGVtcGxhdGVQaXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3RyaW5nVGVtcGxhdGVQaXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFFSCxJQUFJLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFNdkI7SUFIQTtRQWNXLDJCQUFzQixHQUFHLENBQUM7WUFDakMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBRWYsMEJBQTBCLFFBQVE7Z0JBRWxDLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDO29CQUlULElBQUksU0FBUyxHQUFHLFFBQVE7eUJBQ25CLE9BQU8sQ0FBQyw4QkFBOEIsRUFBRSxVQUFTLENBQUMsRUFBRSxLQUFLO3dCQUN0RCxNQUFNLENBQUMsV0FBVyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQUksQ0FBQztvQkFDbkMsQ0FBQyxDQUFDO3lCQUVMLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFFNUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsYUFBWSxTQUFTLE1BQUksQ0FBQyxDQUFDO2dCQUVoRCxDQUFDO2dCQUVELE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDZCxDQUFDO1lBQUEsQ0FBQztZQUVGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUN4QixDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ0wsQ0FBQztJQW5DVSxzQ0FBUyxHQUFoQixVQUFpQixjQUFxQixFQUFFLElBQVc7UUFDakQsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNDLE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQVRRLGtCQUFrQjtRQUg5QixJQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsZ0JBQWdCO1NBQ3pCLENBQUM7T0FDVyxrQkFBa0IsQ0FzQzlCO0lBQUQseUJBQUM7Q0FBQSxBQXRDRCxJQXNDQztTQXRDWSxrQkFBa0IifQ==