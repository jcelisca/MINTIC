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

    for(var i = 0 ; i < productosAPI.length; i++) {
        const depreciaciond = calcularDepreciacionNIIF(productosAPI[i].precioInicial,productosAPI[i].precioFinal,productosAPI[i].vidaUtil,productosAPI[i].periodo_consultado);
        let valorDepreciacion = await fetch('https://misiontic2022upb.vercel.app/api/logistics/to-dolar-converter/'+depreciaciond)
        let precioDolares = await valorDepreciacion.json();

        productosConDepreciacion.push({
            "depreciacion":precioDolares,
            "precioInicial":productosAPI[i].precioInicial,
            "precioFinall":productosAPI[i].precioFinal,
            "vidaUtil":productosAPI[i].vidaUtil,
            "periodo_consultado":productosAPI[i].periodo_consultado
        })
    };
    
    return productosConDepreciacion;
}

mostrarProductos().then(console.log);
mostrarProductosPrecioDolares().then(console.log);
//module.exports.mostrarProductos = mostrarProductos;
//module.exports.mostrarProductosPrecioDolares = mostrarProductosPrecioDolares;
//module.exports.calcularDepreciacionNIIF = calcularDepreciacionNIIF;
//module.exports.calcularDepreciacionNIIFEnDolares = calcularDepreciacionNIIFEnDolares;