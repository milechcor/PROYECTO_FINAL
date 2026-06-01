// =========================
// PANEL DE RESULTADOS
// =========================

function mostrarResultado(
    estado,
    mensaje,
    riesgo
){

    const card =
    document.getElementById("resultadoGlobal");

    const titulo =
    document.getElementById("estadoTitulo");

    const icono =
    document.getElementById("estadoIcono");

    const texto =
    document.getElementById("resultadoTexto");

    const barra =
    document.getElementById("barraRiesgo");

    card.classList.remove(
        "estado-positivo",
        "estado-alerta",
        "estado-critico"
    );

    if(estado==="positivo"){

        card.classList.add("estado-positivo");

        titulo.textContent =
        "Situación Positiva";

        icono.textContent = "🟢";

        barra.className =
        "progress-bar bg-success";
    }

    else if(estado==="alerta"){

        card.classList.add("estado-alerta");

        titulo.textContent =
        "Situación de Alerta";

        icono.textContent = "🟠";

        barra.className =
        "progress-bar bg-warning";
    }

    else{

        card.classList.add("estado-critico");

        titulo.textContent =
        "Situación Crítica";

        icono.textContent = "🔴";

        barra.className =
        "progress-bar bg-danger";
    }

    texto.innerHTML = mensaje;

    barra.style.width =
    riesgo + "%";

    barra.textContent =
    riesgo + "%";
}

// =========================
// ESCENARIO A
// =========================

function calcularCarburante(){

    const reserva =
    Number(
    document.getElementById(
    "reservaInicial"
    ).value);

    const consumo =
    Number(
    document.getElementById(
    "consumoDiario"
    ).value);

    const reab =
    Number(
    document.getElementById(
    "reabastecimientoDiario"
    ).value);

    const critico =
    Number(
    document.getElementById(
    "nivelCritico"
    ).value);

    if(
        reserva<=0 ||
        consumo<=0 ||
        critico<=0
    ){

        alert(
        "Ingrese valores válidos"
        );

        return;
    }

    const neto =
    consumo - reab;

    const dias =
    Math.floor(
    (reserva-critico)/neto
    );

    let estado;
    let riesgo;

    if(dias>15){

        estado="positivo";
        riesgo=30;
    }
    else if(dias>7){

        estado="alerta";
        riesgo=70;
    }
    else{

        estado="critico";
        riesgo=95;
    }

    mostrarResultado(

        estado,

        `
        La reserva llegará al
        nivel crítico en
        <strong>${dias}</strong>
        días.
        `,

        riesgo
    );
}

// =========================
// ESCENARIO B
// =========================

function calcularAlimentos(){

    const inicial =
    Number(
    document.getElementById(
    "precioInicial"
    ).value);

    const actual =
    Number(
    document.getElementById(
    "precioActual"
    ).value);

    const cantidad =
    Number(
    document.getElementById(
    "cantidadSemanal"
    ).value);

    const semanas =
    Number(
    document.getElementById(
    "numeroSemanas"
    ).value);

    if(
        inicial<=0 ||
        actual<=0
    ){

        alert(
        "Complete todos los datos"
        );

        return;
    }

    const porcentaje =

    (
        (actual-inicial)
        / inicial
    )*100;

    const gastoExtra =

    (actual-inicial)
    * cantidad
    * semanas;

    let estado;
    let riesgo;

    if(porcentaje<15){

        estado="positivo";
        riesgo=25;
    }
    else if(porcentaje<35){

        estado="alerta";
        riesgo=65;
    }
    else{

        estado="critico";
        riesgo=95;
    }

    mostrarResultado(

        estado,

        `
        Incremento:
        <strong>${porcentaje.toFixed(2)}%</strong>
        <br><br>

        Gasto adicional:
        <strong>
        Bs ${gastoExtra.toFixed(2)}
        </strong>
        `,

        riesgo
    );
}

// =========================
// ESCENARIO C
// =========================

function calcularTransporte(){

    const normal =
    Number(
    document.getElementById(
    "distanciaNormal"
    ).value);

    const desvio =
    Number(
    document.getElementById(
    "distanciaDesvio"
    ).value);

    const costo =
    Number(
    document.getElementById(
    "costoKilometro"
    ).value);

    const viajes =
    Number(
    document.getElementById(
    "viajesSemana"
    ).value);

    if(
        normal<=0 ||
        desvio<=0
    ){

        alert(
        "Datos inválidos"
        );

        return;
    }

    const extraKm =
    desvio-normal;

    const costoExtra =

    extraKm
    * costo
    * viajes;

    let estado;
    let riesgo;

    if(extraKm<5){

        estado="positivo";
        riesgo=30;
    }
    else if(extraKm<15){

        estado="alerta";
        riesgo=70;
    }
    else{

        estado="critico";
        riesgo=95;
    }

    mostrarResultado(

        estado,

        `
        Distancia adicional:
        <strong>${extraKm} km</strong>

        <br><br>

        Costo adicional semanal:
        <strong>
        Bs ${costoExtra.toFixed(2)}
        </strong>
        `,

        riesgo
    );
}

// =========================
// ESCENARIO D
// =========================

function calcularCompras(){

    const presupuesto =
    Number(
    document.getElementById(
    "presupuestoFamiliar"
    ).value
    );

    const compra =
    Number(
    document.getElementById(
    "costoCompra"
    ).value
    );

    if(
        presupuesto <= 0 ||
        compra <= 0
    ){

        alert(
        "Ingrese valores válidos"
        );

        return;
    }

    const diferencia =
    presupuesto - compra;

    let estado;
    let riesgo;
    let mensaje;

    if(compra <= presupuesto){

        estado = "positivo";
        riesgo = 20;

        mensaje = `
        La compra está dentro del presupuesto.

        <br><br>

        Saldo restante:
        <strong>
        Bs ${diferencia.toFixed(2)}
        </strong>
        `;
    }

    else if(compra <= presupuesto * 1.15){

        estado = "alerta";
        riesgo = 70;

        mensaje = `
        La compra supera ligeramente el presupuesto.

        <br><br>

        Exceso:
        <strong>
        Bs ${Math.abs(diferencia).toFixed(2)}
        </strong>
        `;
    }

    else{

        estado = "critico";
        riesgo = 95;

        mensaje = `
        La compra excede considerablemente el presupuesto.

        <br><br>

        Déficit:
        <strong>
        Bs ${Math.abs(diferencia).toFixed(2)}
        </strong>
        `;
    }

    mostrarResultado(
        estado,
        mensaje,
        riesgo
    );
}

// =========================
// ESCENARIO E
// =========================

function calcularEscasez(){

    const demanda =
    Number(
    document.getElementById(
    "demandaNormal"
    ).value
    );

    const incremento =
    Number(
    document.getElementById(
    "incrementoDemanda"
    ).value
    );

    const stock =
    Number(
    document.getElementById(
    "stockDisponible"
    ).value
    );

    if(
        demanda <= 0 ||
        stock <= 0
    ){

        alert(
        "Complete todos los datos"
        );

        return;
    }

    const nuevaDemanda =

    demanda +
    (demanda * incremento / 100);

    const diferencia =
    stock - nuevaDemanda;

    let estado;
    let riesgo;

    if(diferencia > 20){

        estado = "positivo";
        riesgo = 25;
    }

    else if(diferencia >= 0){

        estado = "alerta";
        riesgo = 70;
    }

    else{

        estado = "critico";
        riesgo = 100;
    }

    mostrarResultado(

        estado,

        `
        Nueva demanda estimada:
        <strong>
        ${nuevaDemanda.toFixed(0)}
        unidades
        </strong>

        <br><br>

        Disponibilidad restante:
        <strong>
        ${diferencia.toFixed(0)}
        unidades
        </strong>
        `,

        riesgo
    );
}

// =========================
// ESCENARIO F
// =========================

function calcularPoderAdquisitivo(){

    const ingreso =
    Number(
    document.getElementById(
    "ingresoMensual"
    ).value
    );

    const gastoAnterior =
    Number(
    document.getElementById(
    "gastoAnterior"
    ).value
    );

    const gastoActual =
    Number(
    document.getElementById(
    "gastoActual"
    ).value
    );

    if(
        ingreso <= 0 ||
        gastoAnterior <= 0 ||
        gastoActual <= 0
    ){

        alert(
        "Ingrese datos válidos"
        );

        return;
    }

    const disponibleAntes =

    ingreso - gastoAnterior;

    const disponibleAhora =

    ingreso - gastoActual;

    const perdida =

    (
        (disponibleAntes - disponibleAhora)
        / disponibleAntes
    ) * 100;

    let estado;
    let riesgo;

    if(perdida < 15){

        estado = "positivo";
        riesgo = 25;
    }

    else if(perdida < 35){

        estado = "alerta";
        riesgo = 70;
    }

    else{

        estado = "critico";
        riesgo = 95;
    }

    mostrarResultado(

        estado,

        `
        Pérdida del poder adquisitivo:

        <strong>
        ${perdida.toFixed(2)}%
        </strong>

        <br><br>

        Disponible actual:

        <strong>
        Bs ${disponibleAhora.toFixed(2)}
        </strong>
        `,

        riesgo
    );
}

// =========================
// SCROLL A RESULTADOS
// =========================

function irAResultados(){

    document
    .getElementById("resultados")
    .scrollIntoView({

        behavior:"smooth"

    });
}

function limpiarCarburante(){

    document.getElementById("reservaInicial").value = "";
    document.getElementById("consumoDiario").value = "";
    document.getElementById("reabastecimientoDiario").value = "";
    document.getElementById("nivelCritico").value = "";

}

function limpiarAlimentos(){

    document.getElementById("producto").value = "";
    document.getElementById("precioInicial").value = "";
    document.getElementById("precioActual").value = "";
    document.getElementById("cantidadSemanal").value = "";
    document.getElementById("numeroSemanas").value = "";

}

function limpiarTransporte(){

    document.getElementById("distanciaNormal").value = "";
    document.getElementById("distanciaDesvio").value = "";
    document.getElementById("costoKilometro").value = "";
    document.getElementById("viajesSemana").value = "";

}

function limpiarCompras(){

    document.getElementById("presupuestoFamiliar").value = "";
    document.getElementById("costoCompra").value = "";

}

function limpiarEscasez(){

    document.getElementById("demandaNormal").value = "";
    document.getElementById("incrementoDemanda").value = "";
    document.getElementById("stockDisponible").value = "";

}

function limpiarPoder(){

    document.getElementById("ingresoMensual").value = "";
    document.getElementById("gastoAnterior").value = "";
    document.getElementById("gastoActual").value = "";

}

// =========================
// CASO 1
// =========================

function cargarCaso1(){

    document.getElementById("reservaInicial").value = 1000;
    document.getElementById("consumoDiario").value = 120;
    document.getElementById("reabastecimientoDiario").value = 20;
    document.getElementById("nivelCritico").value = 150;

    calcularCarburante();

    irAResultados();
}

function cargarCaso2(){

    document.getElementById("producto").value = "Arroz";
    document.getElementById("precioInicial").value = 12;
    document.getElementById("precioActual").value = 20;
    document.getElementById("cantidadSemanal").value = 10;
    document.getElementById("numeroSemanas").value = 4;

    calcularAlimentos();

    irAResultados();
}

function cargarCaso3(){

    document.getElementById("distanciaNormal").value = 50;
    document.getElementById("distanciaDesvio").value = 75;
    document.getElementById("costoKilometro").value = 2.5;
    document.getElementById("viajesSemana").value = 8;

    calcularTransporte();

    irAResultados();
}

function cargarCaso4(){

    document.getElementById("demandaNormal").value = 100;
    document.getElementById("incrementoDemanda").value = 80;
    document.getElementById("stockDisponible").value = 150;

    calcularEscasez();

    irAResultados();
}

function cargarCaso5(){

    document.getElementById("ingresoMensual").value = 5000;
    document.getElementById("gastoAnterior").value = 2500;
    document.getElementById("gastoActual").value = 3800;

    calcularPoderAdquisitivo();

    irAResultados();
}