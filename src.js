const calcularDepreciacionNIIF = (precioInicial, precioFinal, vidaUtil, numeroPeriodoAconsultar) => {
    if(vidaUtil<=0){
		return 0;
	}else if(numeroPeriodoAconsultar<0){
		return precioInicial;
	}else if(numeroPeriodoAconsultar>vidaUtil){
		return precioFinal;
	}else{
        var precio=(precioFinal-precioInicial)*numeroPeriodoAconsultar/vidaUtil+precioInicial;
	    return precio;
    }
}

const calcularDepreciacionNIIFEnDolares = (precioInicial, precioFinal, vidaUtil, numeroPeriodoAconsultar) => {
    return (calcularDepreciacionNIIF(precioInicial, precioFinal, vidaUtil, numeroPeriodoAconsultar))*3950;
}

module.exports.calcularDepreciacionNIIF = calcularDepreciacionNIIF;
module.exports.calcularDepreciacionNIIFEnDolares = calcularDepreciacionNIIFEnDolares;