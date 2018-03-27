var LoadableComponent = (function () {
    function LoadableComponent() {
        this.spinnerElem = "<i class=\"fa fa-spinner fa-pulse fa-1x fa-fw\"></i>";
        this.isLoading = true;
        this.synchLoading();
    }
    LoadableComponent.prototype.initTranslator = function (translationService) {
        var _this = this;
        this.translationService = translationService;
        translationService.isReady(function (tService) {
            _this.translatorReady = true;
        });
    };
    LoadableComponent.prototype.translatorLoaded = function () {
        this.translatorReady = true;
        this.checkIfHasLoaded();
    };
    LoadableComponent.prototype.checkIfHasLoaded = function () {
        if (this.hasLoaded()) {
            this.setLoading(false);
        }
    };
    LoadableComponent.prototype.hasLoaded = function () {
        return this.isLoading && (this.translationService ? this.translatorReady : true);
    };
    LoadableComponent.prototype.setLoading = function (loading) {
        if (loading === void 0) { loading = true; }
        this.isLoading = loading;
        this.synchLoading();
    };
    LoadableComponent.prototype.synchLoading = function () {
        if (this.isLoading) {
            jQuery("#loading").show();
        }
        else {
            jQuery("#loading").hide();
        }
    };
    return LoadableComponent;
}());
export { LoadableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9hZGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJCQTtJQU1FO1FBRkEsZ0JBQVcsR0FBVyxzREFBb0QsQ0FBQztRQUd6RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFdEIsQ0FBQztJQUVELDBDQUFjLEdBQWQsVUFBZSxrQkFBc0M7UUFBckQsaUJBS0M7UUFKQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0Msa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBWTtZQUN0QyxLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw0Q0FBZ0IsR0FBaEI7UUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU0sNENBQWdCLEdBQXZCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUM7SUFDSCxDQUFDO0lBRUQscUNBQVMsR0FBVDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxPQUFxQjtRQUFyQix3QkFBQSxFQUFBLGNBQXFCO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsd0NBQVksR0FBWjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsQ0FBQztJQUNILENBQUM7SUFFSCx3QkFBQztBQUFELENBQUMsQUEvQ0QsSUErQ0MifQ==