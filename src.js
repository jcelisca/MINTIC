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
	if(precioInicial<0){
		throw "error";
	}
    return (calcularDepreciacionNIIF(precioInicial, precioFinal, vidaUtil, numeroPeriodoAconsultar))/3778;
}

async function mostrarProductos(){
	let response = await fetch(
		"https://misiontic2022upb.vercel.app/api/logistics/products"
	);
	let prosuctosAPI = await response.json();
}

async function mostrarProductosPrecioDolares(){
	let response = await fetch(
		"https://misiontic2022upb.vercel.app/api/logistics/products"
	);
	let prosuctosAPI = await response.json();
}

module.exports.mostrarProductos = mostrarProductos;
module.exports.mostrarProductosPrecioDolares = mostrarProductosPrecioDolares;
module.exports.calcularDepreciacionNIIF = calcularDepreciacionNIIF;
module.exports.calcularDepreciacionNIIFEnDolares = calcularDepreciacionNIIFEnDolares;