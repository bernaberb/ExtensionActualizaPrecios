var total = 0;
ultimoMes = "2022-02"

//Cargamos los valores del IPC desde enero 2017, fuente INDEC
const ipc = [{ 
  fecha: '2016-12',
  valor: 100
}, {
  fecha: '2017-01',
  valor: 101.5859
}, {
  fecha: '2017-02',
  valor: 103.6859
}, {
  fecha: '2017-03',
  valor: 106.1476
}, {
  fecha: '2017-04',
  valor: 108.9667
}, {
  fecha: '2017-05',
  valor: 110.5301
}, {
  fecha: '2017-06',
  valor: 111.8477
}, {
  fecha: '2017-07',
  valor: 113.7852
}, {
  fecha: '2017-08',
  valor: 115.3819
}, {
  fecha: '2017-09',
  valor: 117.5719
}, {
  fecha: '2017-10',
  valor: 119.3528
}, {
  fecha: '2017-11',
  valor: 120.994
}, {
  fecha: '2017-12',
  valor: 124.7956
}, {
  fecha: '2018-01',
  valor: 126.9887
}, {
  fecha: '2018-02',
  valor: 130.0606
}, {
  fecha: '2018-03',
  valor: 133.1054
}, {
  fecha: '2018-04',
  valor: 136.7512
}, {
  fecha: '2018-05',
  valor: 139.5893
}, {
  fecha: '2018-06',
  valor: 144.8053
}, {
  fecha: '2018-07',
  valor: 149.2966
}, {
  fecha: '2018-08',
  valor: 155.1034
}, {
  fecha: '2018-09',
  valor: 165.2383
}, {
  fecha: '2018-10',
  valor: 174.1473
}, {
  fecha: '2018-11',
  valor: 179.6388
}, {
  fecha: '2018-12',
  valor: 184.2552
}, {
  fecha: '2019-01',
  valor: 189.6101
}, {
  fecha: '2019-02',
  valor: 196.7501
}, {
  fecha: '2019-03',
  valor: 205.9571
}, {
  fecha: '2019-04',
  valor: 212.9596
}, {
  fecha: '2019-05',
  valor: 219.5691
}, {
  fecha: '2019-06',
  valor: 225.537
}, {
  fecha: '2019-07',
  valor: 230.494
}, {
  fecha: '2019-08',
  valor: 239.6077
}, {
  fecha: '2019-09',
  valor: 253.7102
}, {
  fecha: '2019-10',
  valor: 262.0661
}, {
  fecha: '2019-11',
  valor: 273.2158
}, {
  fecha: '2019-12',
  valor: 283.4442
}, {
  fecha: '2020-01',
  valor: 289.8299
}, {
  fecha: '2020-02',
  valor: 295.666
}, {
  fecha: '2020-03',
  valor: 305.5515
}, {
  fecha: '2020-04',
  valor: 310.1243
}, {
  fecha: '2020-05',
  valor: 314.9087
}, {
  fecha: '2020-06',
  valor: 321.9738
}, {
  fecha: '2020-07',
  valor: 328.2014
}, {
  fecha: '2020-08',
  valor: 337.0632
}, {
  fecha: '2020-09',
  valor: 346.6207
}, {
  fecha: '2020-10',
  valor: 359.657
}, {
  fecha: '2020-11',
  valor: 371.0211
}, {
  fecha: '2020-12',
  valor: 385.8826
}, {
  fecha: '2021-01',
  valor: 401.5071
}, {
  fecha: '2021-02',
  valor: 415.8595
}, {
  fecha: '2021-03',
  valor: 435.8657
}, {
  fecha: '2021-04',
  valor: 453.6503
}, {
  fecha: '2021-05',
  valor: 468.725
}, {
  fecha: '2021-06',
  valor: 483.6049
}, {
  fecha: '2021-07',
  valor: 498.0987
}, {
  fecha: '2021-08',
  valor: 510.3942
}, {
  fecha: '2021-09',
  valor: 528.4968
}, {
  fecha: '2021-10',
  valor: 547.0802
}, {
  fecha: '2021-11',
  valor: 560.9184
}, {
  fecha: '2021-12',
  valor: 582.4575
}, {
  fecha: '2022-01',
  valor: 605.0317
}, {
  fecha: '2022-02',
  valor: 633.4341
} ];

//Cuando carga el DOM y hacemos clic comienza
document.addEventListener("DOMContentLoaded", function() {
    var submit_btn = document.getElementById("submitButton");
    submit_btn.addEventListener("click", function() {
      calcular();
    });
});

//Obtenemos valores
function calcular() {
  //Tomamos monto y fecha desde los inputs
  var monto = parseInt(document.getElementById("myform").elements["montoOrig"].value);
  var fecha = document.getElementById("myform").elements["fechaOrig"].value;
  var cont = true;

  //Validamos monto y fecha
  if (!((Number.isInteger(monto)) && (monto > 0))) {
    document.getElementById("output").innerHTML = "Monto incorrecto, sólo números positivos";
    cont = false;
  }

  if ((!validarFecha(fecha)) && cont) {
    document.getElementById("output").innerHTML = "Fecha incorrecta. Formato YYYY-MM, desde 2017-01.";
    cont = false;
  }
  

  //Seguimos si los input son correctos
  if (cont) {
    //Traemos los valores IPC
    var ipcActual = obtenerIPC(ipc,ultimoMes);
    var ipcOriginal = obtenerIPC(ipc,fecha);
  
    //Calculamos el precio actual
    var total = monto * ipcActual / ipcOriginal;
  
    //Lo mostramos
    agregar(total, monto, fecha);
  }
}


function validarFecha(fecha) {
  anio = parseInt(fecha.slice(0,4));
  mes = parseInt(fecha.slice(5,7))
  if ((anio > 2016) && (anio < 2023)) {
    if ((mes > 0) && (mes < 13)) {
      return true
    }
  }
}

//Función para obtener el valor IPC de una fecha determinada
function obtenerIPC(ipc, fecha) {
  for (let index = 0; index <= ipc.length; index++) {
      if (ipc[index].fecha === fecha) {
          return ipc[index].valor;
      }
  }
}

//Output
function agregar(total, monto, fecha) {
  document.getElementById("output").innerHTML = "$" + monto + " de " + fecha + " equivalen a $" + total.toFixed(2) + " de hoy (abril 2022)";
}