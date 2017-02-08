(function () {
  'use strict';

  angular
    .module('AngularStructure')
	
	/**
   * @Filtro para mascara monentária
   * */
	.filter('currency', function() {
	  return function(_input) {
		  
		var input = _input || '';
		var out = '';
		
		if(input != '') {
			
			input = input.toFixed(2);
			out = "R$ " + input;
		}
		
		return out;
	  };
	})
    .controller('TestController', TestController);

  TestController.$inject = ['$scope', '$http', 'toastr'];

  /**
   * @constructor
   * */
  function TestController($scope, $http, toastr) {

	// CONFIGURAÇÕES INICIAS DA TOASTR LOCALIZADAS NO APP.JS	
	/**
	* Variables
	*/
	$scope.transactionType;
	$scope.transactionValue;
	
	$scope.sortTypeDir = "asc";
	$scope.sortValueDir = "asc";
	
	$scope.totalFunds;
	
	$scope.transactionList = [];
  
    /**
     * @description Configurações iniciais
     * */
    function init() {
		
		$scope.transactionType = "Saque";
		$scope.totalFunds = 0;
		
    }
	
	/**
     * @description Adiciona um tipo de transação a lista de movimentacoes
     * */
    $scope.addTransaction = function () {
		
		//verifica se foi digitado algum valor para a transacao
		if(!$scope.transactionValue) {
			
			toastr.warning( "Por favor, digite um valor.");	
		}
		//nao permite transações de valores negativos
		else if ($scope.transactionValue <= 0){
			
			toastr.warning( "Por favor, digite um valor positivo.");	
		}
		else{
			
			//cria o objeto da lista de movimentacoes
			var newTrans = {
				'type': $scope.transactionType,
				'value': $scope.transactionValue
			};
			
			$scope.transactionList.push(newTrans);
			
			toastr.success( "Movimentação realizada com sucesso");	
			
			$scope.transactionValue = "";
			
			$scope.checkTotalfunds();
		}
	}
	
	/**
     * @description Remove a transacao selecionada
     * */
    $scope.removeTransaction = function (index) {
		
		$scope.transactionList.splice(index, 1);
			
		$scope.checkTotalfunds();
	}
	
	
	/**
     * @description Ordena a lista de movimentacoes
     * */
    $scope.orderTransactions = function (key, sortType) {
		
		//ordena a lista de transacoes
		$scope.transactionList.sort(function (a,b){
			
			var x = a[key];
			var y = b[key];
			
			if(x < y) return -1;
			if(x > y) return 1;
			return 0;
			
		});	

		//caso a lista ja esteja em ordem crescente, reverte a lista 
		if(sortType === "asc") {
			
			if(key =="type") {
				
				$scope.sortTypeDir = "desc";
			}
			else {
				
				$scope.sortValueDir = "desc";
			}
			
			$scope.transactionList = $scope.transactionList.reverse();
		}
		else {
			
			if(key =="type") {
				
				$scope.sortTypeDir = "asc";
			}
			else {
				
				$scope.sortValueDir = "asc";
			}
		}
	}
	
	/**
     * @description Calcula o total do saldo na conta após todas as movimentacoes
     * */
    $scope.checkTotalfunds = function () {
		
		$scope.totalFunds = 0;
		
		var len = $scope.transactionList.length;
		var type;
		
		for (var x = 0; x < len; x++) {
			
			type = $scope.transactionList[x].type;
			
			if(type ==="Saque" ) {
				$scope.totalFunds -= $scope.transactionList[x].value;
			}
			else {
				$scope.totalFunds += $scope.transactionList[x].value;
			}
		}
		
	}
			
    init();
  }
})();