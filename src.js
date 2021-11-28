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

/*const calcularDepreciacionNIIFEnDolares = (precioInicial, precioFinal, vidaUtil, numeroPeriodoAconsultar) => {
	if(precioInicial<0){
		throw "error";
	}
    return (calcularDepreciacionNIIF(precioInicial, precioFinal, vidaUtil, numeroPeriodoAconsultar))/3778;
}*/


async function mostrarProductos(){
    let productosConDepreciacion = [];
	let response = await fetch("https://misiontic2022upb.vercel.app/api/logistics/products");
    let productosAPI = await response.json()	

    productosAPI.forEach(e => {
        const precioDepreciado = calcularDepreciacionNIIF(e.precioInicial,e.precioFinal,e.vidaUtil,e.periodo_consultado);
        productosConDepreciacion.push({
            "depreciacion":precioDepreciado,
            "precioInicial":e.precioInicial,
            "precioFinall":e.precioFinal,
            "vidaUtil":e.vidaUtil,
            "periodo_consultado":e.periodo_consultado
        })
    });

    return productosConDepreciacion;
}

async function mostrarProductosPrecioDolares(){
    let productosConDepreciacion = [];
	let response = await fetch('https://misiontic2022upb.vercel.app/api/logistics/products');
	let productosAPI = await response.json()

    productosAPI.forEach(e => {
        let preciod =[];
        const depreciaciond = calcularDepreciacionNIIF(e.precioInicial,e.precioFinal,e.vidaUtil,e.periodo_consultado);
        fetch('https://misiontic2022upb.vercel.app/api/logistics/to-dolar-converter/'+depreciaciond)
        .then(res => res.json())
        .then(data => preciod.push(data))
        console.log(preciod)
        productosConDepreciacion.push({
            "depreciacion":preciod,
            "precioInicial":e.precioInicial,
            "precioFinall":e.precioFinal,
            "vidaUtil":e.vidaUtil,
            "periodo_consultado":e.periodo_consultado
        })
    });
    
    return productosConDepreciacion;
}

module.exports.mostrarProductos = mostrarProductos;
module.exports.mostrarProductosPrecioDolares = mostrarProductosPrecioDolares;
//module.exports.calcularDepreciacionNIIF = calcularDepreciacionNIIF;
//module.exports.calcularDepreciacionNIIFEnDolares = calcularDepreciacionNIIFEnDolares;