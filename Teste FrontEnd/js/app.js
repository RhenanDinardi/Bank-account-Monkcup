var app = angular.module('AngularStructure', ['ngAnimate','toastr']);

//config de notificação
app.config(['toastrConfig', function (toastrConfig) {
	
    angular.extend(toastrConfig, {
		
		//angular animate necessario para efeitos!		
		//posiçao da toastr
        positionClass: 'toast-top-full-width',
		
		//exibir barra de progresso do tempo que a toastr fica na tela
        progressBar: true,
		
		//tempo que a toastr fica exibida até sumir
		timeOut: 3000,
		
		//tempo que a toastr fica exibida apos ter sido extendida (hover do mouse)
		extendedtimeOut: 1000,
		
		//permitir duplicar a ultima toastr chamada
		preventDuplicates: false,
		
		//permitir duplicar qualquer toastr ja aberta
		preventOpenDuplicates: true,
		
		//define se , caso multiplas toastrs estejam habilitadas, se sao adicionadas acima (true) ou abaixo (false) das que ja estao na tela
		newestOnTop: true
		
    });

}]);