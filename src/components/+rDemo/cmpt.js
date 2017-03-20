export default angular
	.module("rDemo", [])
	.component("resumeDemo", {
		templateUrl : "components/+rDemo/cmpt.html",
		controller  : ResumeDemoCtrl
	})
	.directive("switchWork",[
		"actionEvent",
		function(actionEvent){
			function link($scope,ele,attr) {
				let worksContain = document.body.querySelector(".-work-list");
                let rotate = 0;
                ele[0].addEventListener(actionEvent.start,switchWorkHandler);

                function switchWorkHandler(evt){
                	console.log(evt);
                	if(evt.target.nodeName !== "I"){
                		return;
					}

					rotate += evt.target.className == "-left"?90:-90;

                    worksContain.style.transform ="rotateY("+rotate+"deg)";
				}

			}
			return{
				link:link
			}
		}
	])
	.name;

ResumeDemoCtrl.$inject = ["resumeData","$rootScope"];

function ResumeDemoCtrl(resumeData,$rootScope) {
    let vm = this;

    resumeData.extend(vm, resumeData.data.cn.demo);

    $rootScope.$broadcast("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.data.en.demo:resumeData.data.cn.demo;

        resumeData.extend(vm, extendData);
    });
}